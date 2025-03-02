import axios from "axios";
import { create } from "zustand";

/* ต้องตรงกับที่เรียกใช้ state ที่เรียกใช้ */
const useCartStore = create((set, get) => ({
    carts: [],
    currentPost: null,
    loading: false,
    createCartItems: async (body, token) => {
        set({  loading: true })
        console.log("body",body)
        const rs = await axios.post('http://localhost:8889/cart', {productId:body}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(rs.data)
        /* ยิง axios แค่ครั้งเดียว */
        set({ carts: rs.data.result, loading: false })
    },
    /* getall post axios ส่งไป backend */
    getAllCart: async (token) => {
        set({ loading: true })
        const rs = await axios.get('http://localhost:8889/cart', {
            headers: { Authorization: `Bearer ${token}` }
        })
        // console.log(rs)
        set({ carts: rs.data.result, loading: false })
        console.log(rs.data.result)
        return rs.data.result
    }
}))
export default useCartStore