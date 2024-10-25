const express = require('express')
const router = express.Router();
const {categoryValidations} = require('../validations/categoryValidations')
const CategoryController = require('../controllers/categoryController')
const Authorization = require("../services/authorization");

router.post(
    "/create",
    [categoryValidations, Authorization.authorized],
    CategoryController.create)

router.put(
    "/update/:id",
    [categoryValidations, Authorization.authorized],
    CategoryController.update
)

router.delete(
    "/delete/:id",
    Authorization.authorized,
    CategoryController.delete
)

router.get(
    "/get/:page", 
   // Authorization.authorized, 
    CategoryController.get
)

router.get(
    "/fetch/:id",
   // Authorization.authorized,
    CategoryController.fetch
)

router.get(
    "/get-all", 
    CategoryController.getAll
)

router.get(
    "/get-random", 
    CategoryController.getRandom
)

module.exports = router;