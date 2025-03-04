import axios from "axios";
import { create } from "zustand";

/* ต้องตรงกับที่เรียกใช้ state ที่เรียกใช้ */
const useOrderStore = create((set, get) => ({
    order: [],
    currentPost: null,
    loading: false,
    createOrderItems: async (body, token) => {
        set({  loading: true })
        console.log("body",body)
        const rs = await axios.post('http://localhost:8889/order', {productId:body}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(rs.data)
        /* ยิง axios แค่ครั้งเดียว */
        set({ order: rs.data.result, loading: false })
    },
    /* getall post axios ส่งไป backend */
    getAllOrder: async (token) => {
        set({ loading: true })
        const rs = await axios.get('http://localhost:8889/order', {
            headers: { Authorization: `Bearer ${token}` }
        })
        // console.log(rs)
        set({ order: rs.data.result, loading: false })
        console.log(rs.data.result)
        return rs.data.result
    }
}))
export default useOrderStore