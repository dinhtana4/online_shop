const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../models/User")

class PaymentController {
    async paymentProcess(req, res, next) {
        try {
            const { cart, id } = req.body
            const user = await User.findOne({ _id: id })
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }
            const orderData = cart.map((item) => {
                return {
                    _id: item._id,
                    size: item.size,
                    color: item.color,
                    quantity: item.quantity,
                    userId: user._id
                }
            })
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: {
                  cart: JSON.stringify(orderData),
                },
              })
            const session = await stripe.checkout.sessions.create
                ({
                    shipping_address_collection: {
                        allowed_countries: ['VN'],
                    },
                    shipping_options: [
                        {
                            shipping_rate_data: {
                                type: "fixed_amount",
                                fixed_amount: {
                                    amount: 0,
                                    currency: "VND",
                                },
                                display_name: "Free shipping",
                                // Delivers between 5-7 business days
                                delivery_estimate: {
                                    minimum: {
                                        unit: "business_day",
                                        value: 5,
                                    },
                                    maximum: {
                                        unit: "business_day",
                                        value: 7,
                                    },
                                },
                            },
                        },
                    ],
                    payment_method_types: ['card'],
                    line_items: cart.map((item) => {
                        const percentage = item.discount / 100;
                        let actualPrice = item.price - item.price * percentage;
                        actualPrice = parseFloat(actualPrice);
                        return {
                            price_data: {
                                currency: "VND",
                                product_data: {
                                    name: item.title,
                                },
                                unit_amount_decimal: actualPrice,
                            },
                            quantity: item.quantity,
                        };
                    }),
                    mode: 'payment',
                    customer: customer.id,
                    success_url: `${process.env.CLIENT}`,
                    cancel_url: `${process.env.CLIENT}/cart`,
                });
            res.status(200).json({ url: session.url })
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ msg: 'Server internal error!' }] });
        }
    }

    async checkOutSession(request, response) {
        let event = request.rawBody
        const signature = request.headers['stripe-signature']
        try {
            event = stripe.webhooks.constructEvent(
                request.rawBody,
                signature,
                process.env.ENDPOINT_STRIPE_SECRET
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return response.sendStatus(400);
        }
        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
                break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a response to acknowledge receipt of the event
        response.json({ received: true });
        // const sig = request.headers["stripe-signature"];
        // let event;
        // try {
        //   event = stripe.webhooks.constructEvent(
        //     request.rawBody,
        //     sig,
        //     process.env.ENDPOINT_STRIPE_SECRET
        //   );
        //   console.log("Payment success", event);
        // } catch (err) {
        //   console.log(err.message);
        //   response.status(400).send(`Webhook Error: ${err.message}`);
        //   return;
        // }
    }
}

module.exports = new PaymentController()