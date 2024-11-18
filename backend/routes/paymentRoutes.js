const express = require("express");
const PaymentController = require("../controllers/paymentController");
const Authorization = require("../services/Authorization");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY)
const bodyParser = require('body-parser')

router.post(
    '/create-checkout-session',
    Authorization.authorized,
    PaymentController.paymentProcess
)
router.post(
    '/webhook',
    express.raw({type: 'application/json'}),
    //express.json({ type: 'application/json' }),
    PaymentController.checkOutSession
)

module.exports = router