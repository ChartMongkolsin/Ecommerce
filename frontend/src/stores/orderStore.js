import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

/* ต้องตรงกับที่เรียกใช้ state ที่เรียกใช้ */
const useOrderStore = create((set, get) => ({
    products:[],
    orders: [],
    carts:[],
    loading: false,
    createOrder: async (token) => {
        const { carts } = get();

        if (carts?.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        const orderData = {
            items: carts?.map(item => ({
                productId: item.id,
                name: item.name,
                price: item.product.price,
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
    }
}))

export default useOrderStore
