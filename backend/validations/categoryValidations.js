const {body} = require("express-validator");
module.exports.categoryValidations = [body('name').not().isEmpty().trim().escape().withMessage('category is required')];