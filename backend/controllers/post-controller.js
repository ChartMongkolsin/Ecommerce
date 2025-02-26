const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError')


//กำหนดใน schemda ความสำพันธ์น่าจะผิด
module.exports.getAllProduct = async (req, res, next) => {
    try {
        const rs = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                        select: {
                            firstName: true, lastName: true
                        }
                },
                include: {
                    cartitem: {
                            user: {
                                select: {
                                    firstName: true, lastName: true
                                }
                            }
                    },
                }
            }

        })
        res.json({ product: rs })

    } catch (error) {
        next(error)
    }

}


module.exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const postData = await prisma.product.findUnique({ where: { id: +id } })
        if (postData.userId !== req.user.id) {
            createError(401, "Cannot Delete")
        }
        const rs = await prisma.post.delete({
            where: { id: +id }
        })
        res.json(rs)
    } catch (error) {
        next(error)
    }
}
module.exports.createProduct = async (req, res, next) => {
    try {
        if (!req.file) {
            createError(400, "Please upload an image")
        }

        const { name, description, rating, numReview, price, countInStock } = req.body;

        if (!name || !description) {
            createError(400, 'Name and description are required')
        }


        res.json({
            msg: "File uploaded successfully", data: {
                name,
                description,
                rating,
                numReview,
                price,
                countInStock,
                imageUrl: `/uploads/${req.file.filename}`
            }
        })
    } catch (error) {
        next(error)
    }
}


module.exports.editProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, description, removePic } = req.body
        console.log(req.body)

        const postData = await prisma.post.findUnique({ where: { id: +id } })
        if (!postData || req.user.id !== postData.userId) {
            createError(401, "Cannot Update")
        }
        const haveFile = !!req.file
        let uploadResult = {}
        if (haveFile) {
            uploadResult = await cloudinary.uploader.upload(req.file.path, {
                public_id: path.parse(req.file.path).name
            })
            fs.unlink(req.file.path)
            if (postData.image) {
                cloudinary.uploader.destroy(getPublicId(postData.image))
            }
        }
        let data = haveFile
            ? { message, image: uploadResult.secure_url, userId: req.user.id }
            : { message, userId: req.user.id, image: removePic ? null : postData.image }

        //remove pic

        const rs = await prisma.post.update({
            where: { id: +id },
            data: data
        })
        res.json({ rs })

    } catch (error) {
        next(error)
    }
}