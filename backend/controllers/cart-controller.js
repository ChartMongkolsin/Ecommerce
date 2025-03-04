const prisma = require('../config/prisma');
const { connect } = require('../routes/auth-route');
const createError = require('../utils/createError')





module.exports.createCartItems = async (req, res, next) => {
    try {
        const { productId } = req.body
        console.log(req.body)
        const userId = req.user.id;
        console.log(productId)
        let findUser = await prisma.cart.findUnique({
            where: { userId },

        });
        const findProduct = await prisma.product.findUnique({ where: { id: productId } })
        if (!findUser) {
             cart = await prisma.cart.create({ data: {user:{
                connect:{
                    id: req.user.id
                }
            }
             } } )
        }

        if (!findProduct) {
            createError(400, "Not have product")
        }

        let result = {}

        const cartItem = await prisma.cartItem.findUnique({ where: { productId: productId } })
        console.log("cartitem",cartItem)
        if (cartItem) {
            result = await prisma.cartItem.update({
                where: { id: cartItem.id, productId },
                data: {
                    qty: cartItem.qty + 1,
                }
            })


        } else {
            result = await prisma.cartItem.create({
                data: {
                    qty: 1,
                    productId,
                    cartId : findUser.id || cart.id
                }
            })
        }


        await prisma.product.update({
            where: { id: productId },
            data: {
                countInStock: findProduct.countInStock - 1
            }
        })
        const resultFindCartItems = await prisma.cart.findFirst({
            where:{userId : req.user.id},
            include:{
                cartItems : {
                    include: {
                        product: true
                    }
                }
            }

        })


        res.json({ msg: "Create succesfully", result: resultFindCartItems.cartItems })
    } catch (error) {
        next(error)
    }
}

module.exports.getAllCartItems = async (req, res, next) => {
    try {

        const result = await prisma.cart.findFirst({
            where:{userId : req.user.id},
            include:{
                cartItems : {
                    include: {
                        product: true
                    }
                }
            }

        })
        console.log("result",result)

        res.json({ msg: "getallItems", result : result.cartItems })
    } catch (error) {
        next(error)
    }
}

module.exports.removeCartItems = async (req, res, next) => {
    try {
        res.json({ msg: "remove" })
    } catch (error) {
        next(error)
    }
}

module.exports.editCartItems = async (req, res, next) => {
    try {
        res.json({ msg: "remove" })
    } catch (error) {
        next(error)
    }
}