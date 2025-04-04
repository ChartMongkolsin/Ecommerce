const createError = require('../utils/createError')
const prisma = require('../config/prisma');

module.exports.getOrder = async (req, res, next) => {
    try {
        let orders;

        if (req.user.role === "ADMIN") {
            // ✅ ADMIN เห็นออเดอร์ทั้งหมด พร้อมสินค้าภายในออเดอร์
            orders = await prisma.order.findMany({
                include: {
                    user: true, // ดึงข้อมูลผู้ใช้ที่ทำการสั่งซื้อ
                    orderitem: {
                        include: {
                            product: true, // ✅ ดึงข้อมูลสินค้าที่อยู่ในคำสั่งซื้อ
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            });
        } else {
            // ✅ USER เห็นเฉพาะออเดอร์ของตัวเอง
            orders = await prisma.order.findMany({
                where: { userId: req.user.id },
                include: {
                    orderitem: {
                        include: {
                            product: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            });
        }

        res.json(orders);
    } catch (error) {
        next(error)
    }
},

    // module.exports.createOrder = async (req, res, next) => {
    //     try {

    //         const { items, total } = req.body;
    //         console.log('items', items)
    //         console.log('total', total)
    //         const userId = req.user.id;

    //         if (!items || items.length === 0) {
    //             return res.status(400).json({ error: "Your cart is empty." });
    //         }

    //         // ✅ 1. สร้างคำสั่งซื้อ
    //         const order = await prisma.order.create({
    //             data: {
    //                 priceTotal: +total.toFixed(2),
    //                 orderStatus: "Pending",
    //                 paymentStatus: "Unpaid",
    //                 userId: userId,
    //             }
    //         });

    //         // ✅ 2. เพิ่มสินค้าเข้าไปใน Order_Product
    //         const orderItems = await Promise.all(
    //             items.map(async (item) => {
    //                 console.log("Processing item:", item);

    //                 // Fetch product price from the database
    //                 const product = await prisma.product.findUnique({
    //                     where: { id: item.productId },
    //                     select: { price: true }
    //                 });

    //                 if (!product) {
    //                     throw new Error(`Product not found: ${JSON.stringify(item)}`);
    //                 }

    //                 const price = product.price;
    //                 const quantity = Number(item.quantity);

    //                 console.log("Fetched price:", price, "Converted quantity:", quantity);

    //                 if (isNaN(price) || isNaN(quantity)) {
    //                     throw new Error(`Invalid price or quantity: ${JSON.stringify(item)}`);
    //                 }

    //                 return {
    //                     orderId: order.id,
    //                     productId: item.productId,
    //                     quantity,
    //                     price,
    //                 };
    //             })
    //         );

    //         // Run the database insertions inside a transaction
    //         await prisma.$transaction(
    //             orderItems.map((orderItem) =>
    //                 prisma.orderItem.create({
    //                     data: orderItem,
    //                 })
    //             )
    //         );

    //         res.status(201).json({ message: "Order created successfully!", order });

    //     } catch (error) {
    //         next(error)
    //     }
    // }
    module.exports.createOrder = async (req, res, next) => {
        try {
            const { items, total } = req.body;
            console.log('Items:', items);  // Log incoming items for debugging
            console.log('Total:', total);  // Log total for debugging
            const userId = req.user.id;
    
            if (!items || items.length === 0) {
                return res.status(400).json({ error: "Your cart is empty." });
            }
    
            // Create an order
            const order = await prisma.order.create({
                data: {
                    priceTotal: +total.toFixed(2),
                    orderStatus: "Pending",
                    paymentStatus: "Unpaid",
                    userId: userId,
                }
            });
    
            // Process each item in the cart
            const orderItems = await Promise.all(
                items.map(async (item) => {
                    console.log("Processing item:", item);
    
                    // Fetch product price from the database
                    const product = await prisma.product.findUnique({
                        where: { id: item.productId },
                        select: { price: true }
                    });
    
                    if (!product) {
                        console.error(`Product not found with ID: ${item.productId}`);
                        throw new Error(`Product not found with ID: ${item.productId}`);
                    }
    
                    const price = product.price;
                    const quantity = Number(item.quantity);
    
                    console.log("Fetched price:", price, "Converted quantity:", quantity);
    
                    if (isNaN(price) || isNaN(quantity)) {
                        throw new Error(`Invalid price or quantity for productId: ${item.productId}`);
                    }
    
                    return {
                        orderId: order.id,
                        productId: item.productId,
                        quantity,
                        price,
                    };
                })
            );
    
            // Insert order items into the database inside a transaction
            await prisma.$transaction(
                orderItems.map((orderItem) =>
                    prisma.orderItem.create({
                        data: orderItem,
                    })
                )
            );
    
            res.status(201).json({ message: "Order created successfully!", order });
    
        } catch (error) {
            console.error("Error creating order:", error);  // Log the error for debugging
            next(error);
        }
    };
    
    
// module.exports.updateOrder = async (req, res, next) => {
//     try {
//         const { orderId } = req.params;
//         console.log("Order ID:", orderId);
//         const { orderStatus, paymentStatus } = req.body;

//         const updatedOrder = await prisma.order.update({
//             where: {
//                 id: parseInt(orderId, 10), // Ensure orderId is an integer
//               },
//               data: {
//                 orderStatus: orderStatus || "Completed",
//                 paymentStatus: paymentStatus || undefined,
//                 updatedAt: new Date(),
//               },
//             });

//         res.json({ order: updatedOrder });
//     } catch (error) {
//         next(error);
//     }
// };
module.exports.updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("Order ID:", id, typeof id); // ตรวจสอบค่าที่รับมา
        const { orderStatus, paymentStatus } = req.body;

        // ตรวจสอบว่า id ถูกส่งมาหรือไม่
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Invalid orderId" });
        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: parseInt(id, 10), // แปลงเป็น Integer
            },
            data: {
                orderStatus: orderStatus || "Completed",
                paymentStatus: paymentStatus || undefined,
                updatedAt: new Date(),
            },
        });

        res.json({ order: updatedOrder });
    } catch (error) {
        console.error("Update Order Error:", error);
        next(error);
    }
};

module.exports.deletedOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const deletedOrder = await prisma.order.delete({
            where: { id: Number(orderId) },
        });

        res.json({ message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
        next(error);
    }
};
