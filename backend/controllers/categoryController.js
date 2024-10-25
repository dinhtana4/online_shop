const { validationResult } = require('express-validator')
const CategoryModel = require('../models/Category')
const env = require('../config/envConfig')

class CategoryController {
    async create(req, res) {
        const errors = validationResult(req)
        const { name } = req.body
        if (errors.isEmpty()) {
            const category = await CategoryModel.findOne({ name })
            if (!category) {
                await CategoryModel.create({ name })
                return res.status(201).json({ msg: 'You category has created successfully!' })
            }
            else {
                return res.status(400).json({ errors: [{ msg: `${name} category is already exist` }] })
            }
        }
        else {
            return res.status(400).json({ errors: errors.array() })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { name } = req.body
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const category = await CategoryModel.findOne({ name })
            console.log(category)
            if (!category) {
                const repsone = await CategoryModel.updateOne(
                    { _id: id },
                    { $set: { name } }
                )
                return res.status(200).json({ msg: 'Your category has updated successfully!' })
            }
            else {
                return res.status(400).json({ errors: [{ msg: `${name} category is already exist` }] })
            }
        }
        else {
            return res.status(400).json({ errors: errors.array() })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            await CategoryModel.deleteOne({ _id: id })
            return res.status(200).json({ msg: 'Category has deleted successfully!' })
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ errors: [{ msg: 'Server internal error!' }] });
        }
    }

    async get(req, res) {
        const page = req.params.page
        const perPage = env.PAGE_SIZE
        const skip = (page - 1) * perPage
        try {
            const count = await CategoryModel.find({}).countDocuments()
            const categories = await CategoryModel.find({})
                .skip(skip)
                .limit(perPage)
                .sort({ updatedAt: -1 })
            return res.status(200).json({ categories: categories, perPage, count })
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ errors: [{ msg: 'Server internal error!' }] });
        }
    }

    async getAll(req, res) {
        try {
            const categories = await CategoryModel.find({})
            return res.status(200).json({ categories })
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ errors: [{ msg: 'Server internal error!' }] });
        }
    }

    async getRandom(req, res) {
        try {
            const categories = await CategoryModel.aggregate([{
                $sample: { size: 3 }
            }])
            return res.status(200).json({ categories })
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ errors: [{ msg: 'Server internal error!' }] });
        }
    }

    async fetch(req, res) {
        const { id } = req.params
        try {
            const category = await CategoryModel.findOne({ _id: id })
            return res.status(200).json({ category: category })
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ errors: [{ msg: 'Server internal error!' }] });
        }
    }
}

module.exports = new CategoryController();