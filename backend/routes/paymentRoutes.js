const express = require("express");
const PaymentController = require("../controllers/paymentController");
const Authorization = require("../services/Authorization");
const router = express.Router();
router.post(
    '/create-checkout-session',
    Authorization.authorized,
    PaymentController.paymentProcess
)

module.exports = router