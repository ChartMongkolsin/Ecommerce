const prisma = require('../config/prisma');
const createError = require('../utils/createError')
const stripe = require('stripe')('sk_test_51R80FrRplpVJaCw84buDa0mo4kCWBIVOc6cmIgZ4yt6OmSWAAsdYJZ2oV3kMc7anOnG6avwasBonWn74JKKNBXne00rKpSQ4Mn');



// module.exports.checkout = async (req, res, next) => {
//   try {

//     const { id } = req.body;

//     // Step 1: Find order
//     const order = await prisma.order.findFirst({
//       where: {
//         id: id,
//       }
//     });

//     if (!order) {
//       return next(createError(404, "Order is not found"));
//     }
//     console.log('✅ order:', order);


//     // Step 2: Stripe checkout session
//     // เก้บค่าตัวที่จะใช้ ใน order
//     const { priceTotal, orderStatus, paymentStatus } = order;
//     const session = await stripe.checkout.sessions.create({
//       ui_mode: 'embedded',
//       payment_method_types: ['card'],
//       metadata: {
//         orderId: order.id.toString(),
//       },
//       line_items: [
//         {
//           quantity: 1,
//           price_data: {
//             currency: 'thb',
//             product_data: {
//               name: 'item',
//               description: 'Thank You for Purchase!',
//             },
//             unit_amount: +order.priceTotal * 100,
//           },
//         },
//       ],
//       mode: 'payment',
//       return_url: `http://localhost:5173/payment/checkout/{CHECKOUT_SESSION_ID}`,
//     });


//     res.send({ clientSecret: session.client_secret });




//     console.log("Order found:", priceTotal, orderStatus, paymentStatus);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // res.json({ success: true, order });
//   } catch (error) {
//     next(error);
//   }
// };
// module.exports.checkout = async (req, res, next) => {
//   try {
//     const { id } = req.body;

//     let order;

//     if (id) {
//       // ถ้า client ส่ง id มา → ค้นหา order ตาม id
//       order = await prisma.order.findFirst({ where: { id: id } });
//     } else {
//       // ถ้า client ไม่ส่ง id → ดึง order ล่าสุด
//       order = await prisma.order.findFirst({
//         orderBy: { createdAt: 'desc' }, // เรียงจาก order ล่าสุด
//         take: 1,
//       });
//     }

//     if (!order) {
//       return next(createError(404, "Order not found"));
//     }
//     console.log("✅ Latest order:", order);

//     // ใช้ priceTotal จาก order
//     const { priceTotal, orderStatus, paymentStatus } = order;
//     const {image} = product
//     const session = await stripe.checkout.sessions.create({
//       ui_mode: "embedded",
//       payment_method_types: ["card"],
//       metadata: { orderId: order.id.toString() },
//       line_items: [
//         {
//           quantity: 1,
//           price_data: {
//             currency: "thb",
//             product_data: { name: "item", description: "Thank You for Purchase!", image: [order.product.image], },
//             unit_amount: +order.priceTotal * 100,
//           },
//         },
//       ],
//       mode: "payment",
//       return_url: `http://localhost:5173/complete/{CHECKOUT_SESSION_ID}`,
//     });

//     res.json({ clientSecret: session.client_secret });
//   } catch (error) {
//     next(error);
//   }
// };
module.exports.checkout = async (req, res, next) => {
  try {
    const { id } = req.body;

    let order;

    if (id) {
      order = await prisma.order.findFirst({
        where: { id: id },
        include: {
          orderitem: {
            include: {
              product: true, // ดึงข้อมูล product ที่อยู่ใน orderitem
            },
          },
        },
      });
    } else {
      order = await prisma.order.findFirst({
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          orderitem: {
            include: {
              product: true, // ดึงข้อมูล product ที่อยู่ใน orderitem
            },
          },
        },
      });
    }

    if (!order) {
      return next(createError(404, "Order not found"));
    }

    console.log("✅ Latest order:", order);

    // ใช้ priceTotal จาก order
    const { priceTotal } = order;

    // ดึงข้อมูลสินค้าทั้งหมดจาก orderItem
    const line_items = order.orderitem.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "thb",
        product_data: {
          name: item.product.name,
          description: item.product.desc,
          images: [item.product.image], // ใช้ images เป็น array
        },
        unit_amount: +item.price * 100,
      },
    }));

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      metadata: { orderId: order.id.toString() },
      line_items,
      mode: "payment",
      return_url: `http://localhost:5173/complete/{CHECKOUT_SESSION_ID}`,
    });

    res.json({ clientSecret: session.client_secret });
  } catch (error) {
    next(error);
  }
};

module.exports.checkoutStatus = async (req, res, next) => {
  try {
    const { session_id } = req.params;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    console.log('session_id', session_id);
    console.log('session', session);

    // ✅ แปลง orderId เป็น Number
    const orderId = Number(session.metadata.orderId);
    if (!orderId) {
      return next(createError(400, "Order ID is missing in metadata"));
    }

    // ✅ ค้นหา order จาก ID
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });

    if (!order) {
      return next(createError(404, "Order not found"));
    }

    console.log('✅ Order Retrieved:', order);

    // ✅ เช็คว่า Payment สำเร็จหรือยัง
    if (session.payment_status !== "paid") {
      return next(createError(400, "Payment is not completed yet"));
    }

    // ✅ อัปเดตสถานะ paymentStatus เป็น "paid"
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: "paid" },
    });

    res.json({ message: "Payment Complete", status: session.payment_status });
  } catch (error) {
    next(error);
  }
};
