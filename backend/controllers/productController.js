const { formidable } = require("formidable")
const { v4: uuidv4 } = require("uuid")
const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
const ProductModel = require("../models/Product")
const env = require('../config/envConfig')
const { response } = require("express")

class ProductController {
    async create(req, res) {
        const form = formidable({})
        form.parse(req, async (err, fields, files) => {
            if (!err) {
                const parsedData = JSON.parse(fields.data);
                const images = {};
                for (let i = 0; i < Object.keys(files).length; i++) {
                    const file = files[`image${i + 1}`][0]
                    const mimeType = file.mimetype;
                    const extension = mimeType.split("/")[1].toLowerCase()
                    if (
                        extension === "jpeg" ||
                        extension === "jpg" ||
                        extension === "png"
                    ) {
                        const imageName = uuidv4() + `.${extension}`
                        const __dirname = path.resolve()
                        const newPath = __dirname + `/../frontend/public/images/${imageName}`
                        images[`image${i + 1}`] = imageName
                        fs.copyFile(file.filepath, newPath, (err) => {
                            if (err) {
                                console.log(err)
                            }
                        });
                    }
                    else {
                        images[`image${i + 1}`] = ''
                    }
                }

                const product = {
                    title: parsedData.title.trim(),
                    price: parseInt(parsedData.price),
                    stock: parseInt(parsedData.stock),
                    discount: parseInt(parsedData.discount),
                    description: JSON.parse(fields.description),
                    colors: parsedData.colors,
                    category: parsedData.category,
                    sizes: JSON.parse(fields.sizes),
                    image1: images['image1'],
                    image2: images['image2'],
                    image3: images['image3']
                }

                console.log("Product: ")
                console.log(product)

                const errors = validationResult(product)
                if (errors.isEmpty()) {
                    console.log("Check validation result:")
                    console.log(errors)
                    try {
                        const response = await ProductModel.create(product)
                        return res.status(201).json({ msg: 'You product has created successfully!', response })
                    }
                    catch (error) {
                        console.log(error);
                        return res.status(500).json({ errors: errors.array() });
                    }
                }
                else {
                    console.log(errors.array())
                    return res.status(400).json({ errors: errors.array() })
                }
            }
        })
    }

    async update(req, res) {
        const { _id, title, price, discount, stock, colors, sizes, description, category } = req.body
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const repsone = await ProductModel.updateOne(
                { _id: _id },
                { $set: { title, price, discount, stock, colors, sizes, description, category } }
            )
            return res.status(200).json({ msg: 'Your product has updated successfully!', response })
        }
        else {
            return res.status(400).json({ errors: errors.array() })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            await ProductModel.deleteOne({ _id: id })
            return res.status(200).json({ msg: 'Product has deleted successfully!' })
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
            const count = await ProductModel.find({}).countDocuments()
            const products = await ProductModel.find({})
                .skip(skip)
                .limit(perPage)
                .sort({ updatedAt: -1 })
            return res.status(200).json({ products: products, perPage, count })
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ errors: [{ msg: 'Server internal error!' }] });
        }
    }

    async fetch(req, res) {
        const { id } = req.params
        try {
            const product = await ProductModel.findOne({ _id: id })
            return res.status(200).json({ product: product })
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ errors: [{ msg: 'Server internal error!' }] });
        }
    }

    async search(req, res) {
        const { name, page, keyword } = req.params
        const perPage = 12
        const skip = (page - 1) * perPage
        const options = name
            ? { category: name }
            : keyword && { title: { $regex: `${keyword}`, $options: "i" } }

        if (page) {
            try {
                const count = await ProductModel.find({ ...options })
                    .countDocuments()
                const products = await ProductModelfind({ ...options })
                    .skip(skip)
                    .limit(perPage)
                    .sort({ updatedAt: -1 })
                return res.status(200).json({ products: products, perPage, count })
            } catch (error) {
                console.log(error.message);
            }
        }
        else {
            const products = await ProductModel.find({ ...options })
                .sort({ updatedAt: -1 })
            return res.status(200).json({ products: products })
        }
    }
}

module.exports = new ProductController()