const path = require('path')
const fs = require('fs/promises')

const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError')
const cloudinary = require('../config/cloudinary')


//กำหนดใน schemda ความสำพันธ์น่าจะผิด
module.exports.getAllProduct = async (req, res, next) => {
    try {
        const rs = await prisma.product.findMany({

            
            // เรียงลำดับ
            // orderBy: { createdAt: 'desc' },
            
            // include: {
            //     user: {
            //             select: {
            //                 firstName: true, lastName: true
            //             }
            //     },
            //     include: {
            //         cartitem: {
            //                 user: {
            //                     select: {
            //                         firstName: true, lastName: true
            //                     }
            //                 }
            //         },
            //     }
            // }

        })
        res.json({ product: rs })

    } catch (error) {
        next(error)
    }

}


module.exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id) {
            createError(400, "require id parameter")
        }
        const productData = await prisma.product.findUnique({ where: { id: +id } })
        console.log(productData)

        // if (req.user?.id !== productData.userId) {
        //     createError(400, "Cannot Delete")
        // }
        
        const rs = await prisma.product.delete({
            where: { id: +id }
        })
        res.json({msg : `Delete post id=${id}`, deletedPost : productData})
    } catch (error) {
        next(error)
    }
}
module.exports.createProduct = async (req, res, next) => {
    try {
        const { name, desc, rating, numReview, price, countInStock } = req.body;
        const haveFile = !!req.file
        let uploadResult = {}


        console.log(req.body)
        console.log(req.file)

        if (haveFile) {
            uploadResult = await cloudinary.uploader.upload(req.file.path, {
                overwrite: true,
                public_id: path.parse(req.file.path).name

            })
            fs.unlink(req.file.path)
        }

        if (!name || !desc) {
            createError(400, 'Name and description are required')
        }

        const data = {
            name,
            desc,
            rating: 0,
            numReview: +numReview,
            price: +price,
            countInStock: +countInStock,
            image: uploadResult.secure_url || ''
        }
            const rs = await prisma.product.create({data:data})

        res.json({msg: "File uploaded successfully", data: rs  })
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