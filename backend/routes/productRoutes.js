const express = require('express')
const router = express.Router();
const {productValidations} = require('../validations/productValidations')
const ProductController = require('../controllers/productController')
const Authorization = require("../services/authorization");

router.post(
    "/create",
    [productValidations, Authorization.authorized],
    ProductController.create)

router.put(
    "/update",
    [productValidations, Authorization.authorized],
    ProductController.update
)

router.delete(
    "/delete/:id",
    Authorization.authorized,
    ProductController.delete
)

router.get(
    "/get/:page", 
   // Authorization.authorized, 
   ProductController.get
)

router.get(
    "/fetch/:id",
   // Authorization.authorized,
   ProductController.fetch
)

module.exports = router;