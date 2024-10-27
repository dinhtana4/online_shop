const { validationResult } = require('express-validator')
const UserModel = require('../models/User')
const { hashedPassword, comparePassword, createToken } = require('../services/authServices')

// @route POST /api/register
// @access Public
// @desc Create user
module.exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { name, email, password } = req.body
        try {
            const emailExits = await UserModel.findOne({ email })
            if (!emailExits) {
                const hashedPass = await hashedPassword(password)
                const user = await UserModel.create({
                    name,
                    email,
                    password: hashedPass
                })
                const token = createToken({id: user._id, name: user.name})
                return res.status(201).json({ msg: 'Your account has been created!', token })
            }
            else {
                // email already taken
                return res.status(401).json({ errors: [{ msg: `${email} has already taken`, param: 'email' }] })
            }
        }
        catch (error) {
            console.log(error.message)
            return res.status(500).json("Server internal error!")
        }
    }
    else {
        //validation failed
        return res.status(400).json({ errors: errors.array() })
    }
}

// @route POST /api/login
// @access Public
// @desc User Login
module.exports.login = async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const user = await UserModel.findOne({ email })
        if (user) {
            if (await comparePassword(password, user.password)) {
                const token = createToken({ id: user._id, name: user.name })
                return res.status(201).json({ token, admin: user.admin })
            }
            else {
                return res.status(401).json({ errors: [{ msg: 'Password is not matched', param: 'password' }] })
            }
        }
        else {
            return res.status(401).json({ errors: [{ msg: `${email} is not found`, param: 'email' }] })
        }
    }
    else {
        //validation failed
        return res.status(400).json({ errors: errors.array() })
    }
}