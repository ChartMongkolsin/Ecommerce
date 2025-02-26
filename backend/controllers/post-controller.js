const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError')

module.exports.getProduct = async (req, res, next) => {
    try {
        const res = await product.findAll()
        res.json(res)

        res.json({ msg: 'Register successful', res })
    } catch (error) {
        next(error)
    }

}


module.exports.getProductById = async (req, res, next) => {
    try {
        const res = await product.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json(res)

        res.json({ msg: 'Register successful', res })
    } catch (error) {
        next(error)
    }

}

module.exports.upload = async (req, res, next) => {
    try {
        if (!req.file) {
            createError(400, "Please upload an image")
        }

        const { name, description } = req.body;

        if (!name || !description) {
            createError(400, 'Name and description are required' )
        }


        res.json({ msg: "File uploaded successfully", data: {
            name,
            description,
            imageUrl: `/uploads/${req.file.filename}`}   
        })
    } catch (error) {
        next(error)
    }
}


module.exports.getMe = async (req, res, next) => {
    try {
        res.json({ user: req.user })

    } catch (error) {
        next(error)
    }
}