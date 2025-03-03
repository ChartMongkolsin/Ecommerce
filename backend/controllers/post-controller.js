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
        res.json({ msg: `Delete post id=${id}`, deletedPost: productData })
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
        const rs = await prisma.product.create({ data: data })

        res.json({ msg: "File uploaded successfully", data: rs })
    } catch (error) {
        next(error)
    }
}


module.exports.editProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, countInStock, rating, numReview, price, removePic } = req.body;

        // Find the existing product
        const productData = await prisma.product.findUnique({ where: { id: +id } });
        if (!productData) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the user has permission to update (if needed)
        // if (req.user.id !== productData.userId) {
        //     createError(400, "Cannot Update" );
        // }

        let uploadResult = {};

        if (req.file) {
            // Upload new image
            uploadResult = await cloudinary.uploader.upload(req.file.path, {
                public_id: path.parse(req.file.path).name,
            });

        }

        // Prepare update data
        const updateData = {
            name,
            desc: description,
            rating: 0,  // Should this be 0? If not, use `rating: +rating`
            numReview: +numReview,
            price: +price,
            countInStock: +countInStock,
            image: uploadResult.secure_url || productData.image,
            userId : req.user.id // Keep existing image if no new one is uploaded
        };

        // Remove image if requested
        if (removePic && productData.image) {
            updateData.image = ""; // Clear the image field
        }

        // Update product
        const updatedProduct = await prisma.product.update({
            where: { id: +id },
            data: {
                name,
                desc: description,
                rating: 0,  // Should this be 0? If not, use `rating: +rating`
                numReview: +numReview,
                price: +price,
                countInStock: +countInStock,
                image: uploadResult.secure_url || productData.image, 
                // Keep existing image if no new one is uploaded
            }
        });

        res.json({ msg: "Update successful", product: updatedProduct });
    } catch (error) {
        next(error);
    }
};