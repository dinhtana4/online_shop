const stripe = require("stripe")(process.env.STRIPE_KEY);

class PaymentController {
    async paymentProcess(req, res, next) {
        console.log('Payment Process', req)
        try {
            const session = await stripe.checkout.sessions.create
                ({
                    line_items
                        : [
                            {
                                price_data
                                    : {
                                    currency
                                        : 'usd',
                                    product_data
                                        : {
                                        name
                                            : 'T-shirt',
                                    },
                                    unit_amount
                                        : 2000,
                                },
                                quantity
                                    : 1,
                            },
                        ],
                    mode: 'payment',
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
}

module.exports = new PaymentController()