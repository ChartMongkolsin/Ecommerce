const prisma = require('../config/prisma');
const { connect } = require('../routes/auth-route');
const createError = require('../utils/createError')





// module.exports.createCartItems = async (req, res, next) => {
//     try {
//         const { productId } = req.body
//         console.log(req.body)
//         const userId = req.user.id;
//         console.log(productId)
//         let findUser = await prisma.cart.findUnique({
//             where: { userId },

//         });
//         const findProduct = await prisma.product.findUnique({ where: { id: productId } })
//         let cart;
//         if (!findUser) {
//             cart = await prisma.cart.create({
//                 data: {
//                     user: {
//                         connect: {
//                             id: req.user.id
//                         }
//                     }
//                 }
//             })
//         }

//         if (!findProduct) {
//             createError(400, "Not have product")
//         }

//         let result = {}

//         const cartItem = await prisma.cartItem.findUnique({ where: { productId: productId } })
//         console.log("cartitem", cartItem)

//         if (cartItem) {
//             result = await prisma.cartItem.update({
//                 where: { id: cartItem.id, productId },
//                 data: {
//                     quantity: cartItem.quantity + 1,
//                 }
//             })
//         } else {
//             result = await prisma.cartItem.create({
//                 data: {
//                     quantity: 1,
//                     productId,
//                     cartId: findUser.id || cart.id
//                 }
//             })
//         }


//         await prisma.product.update({
//             where: { id: productId },
//             data: {
//                 quantity: findProduct.quantity - 1
//             }
//         })
//         const resultFindCartItems = await prisma.cart.findFirst({
//             where: { userId: req.user.id },
//             include: {
//                 cartItems: {
//                     include: {
//                         product: true
//                     }
//                 }
//             }

//         })


//         res.json({ msg: "Create succesfully", result: resultFindCartItems.cartItems })
//     } catch (error) {
//         next(error)
//     }
// }
module.exports.createCartItems = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        let findUser = await prisma.cart.findUnique({
            where: { userId }
        });

        if (!findUser) {
            console.log("Creating new cart for user...");
            findUser = await prisma.cart.create({
                data: {
                    userId: req.user.id
                }
            });
        }

        const findProduct = await prisma.product.findUnique({ where: { id: productId } });

        if (!findProduct) {
            return next(createError(400, "Product not found"));
        }

        // ✅ Find if cartItem already exists
        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: findUser.id,
                productId: productId
            }
        });

        let result;
        if (existingCartItem) {
            // ✅ If exists, update quantity
            result = await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + 1 }
            });
        } else {
            // ✅ If not, create new cart item
            result = await prisma.cartItem.create({
                data: {
                    quantity: 1,
                    productId,
                    cartId: findUser.id
                }
            });
        }

        // ✅ Reduce product stock
        await prisma.product.update({
            where: { id: productId },
            data: {
                quantity: findProduct.quantity - 1
            }
        });

        // ✅ Retrieve updated cart
        const resultFindCartItems = await prisma.cart.findFirst({
            where: { userId: req.user.id },
            include: {
                cartItems: {
                    include: {
                        product: true
                    }
                }
            }
        });

        res.json({ msg: "Create successfully", result: resultFindCartItems.cartItems });
    } catch (error) {
        next(error);
    }
};


module.exports.getAllCartItems = async (req, res, next) => {
    try {

        const result = await prisma.cart.findFirst({
            where: { userId: req.user.id },
            include: {
                cartItems: {
                    include: {
                        product: true
                    }
                }
            }

        })
        console.log("result", result)

        res.json({ msg: "getallItems", result: result.cartItems })
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

