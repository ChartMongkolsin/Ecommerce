import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

/* ต้องตรงกับที่เรียกใช้ state ที่เรียกใช้ */
const useCartStore = create((set, get) => ({
    carts: [],
    orders: [],
    loading: false,


    createCartItems: async (productId, token) => {
        set({ loading: true })
        const rs = await axios.post('http://localhost:8889/cart', { productId }, {
            headers: { Authorization: `Bearer ${token}` }
        })

        // Set the cart to the updated list of products with quantity 1
        set({ carts: rs.data.result.map(item => ({ ...item, quantity: 1 })), loading: false })
    },

   

    getAllCart: async (token) => {
        set({ loading: true })
        const rs = await axios.get('http://localhost:8889/cart', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return rs.data.result
    },


    IncreaseCart: (item) => {
        set(state => {
            const existingProduct = state.carts.find(product => product.id === item.id);

            if (existingProduct) {
                // ถ้าสินค้าอยู่แล้ว, เพิ่ม quantity
                return {
                    carts: state.carts.map(product =>
                        product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
                    )
                };
            } else {
                // ถ้ายังไม่มีสินค้า, เพิ่มเข้าไปและตั้ง quantity = 1
                return {
                    carts: [...state.carts, { ...item, quantity: 1 }]
                };
            }
        });
    },
    removeFromCart: (id) => {
        set(state => {
            const existingProduct = state.carts.find(product => product.id === id);

            if (existingProduct && existingProduct.quantity > 1) {
                // ถ้าสินค้ามีอยู่ใน cart และ quantity > 1, ให้ลดจำนวนลง 1
                return {
                    carts: state.carts.map(product =>
                        product.id === id ? { ...product, quantity: product.quantity - 1 } : product
                    )
                };
            } else {
                // ถ้า quantity = 1 ให้ลบออกจาก cart
                return {
                    carts: state.carts.filter(product => product.id !== id)
                };
            }
        });
    },
    createOrder: async (token) => {
        const { carts } = get();

        if (carts?.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        const orderData = {
            items: carts?.map(item => ({
                productId: item.product.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            total: carts?.reduce((total, item) => total + item.product.price * item.quantity, 0),
            status: "Pending",
        };

        try {
            const response = await axios.post("http://localhost:8889/orders", orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Order Created:", response.data);
            set({ carts: [] }); // ✅ ล้างตะกร้าหลังจากสร้างออเดอร์สำเร็จ
            toast.success("Order created successfully!");
        } catch (error) {
            toast.error("Failed to create order.");
            console.error("Error creating order:", error);
        }
    },
    clearCart: () => set({ carts: [] }), // Added clearCart method



}))
export default useCartStore