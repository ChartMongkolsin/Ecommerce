import axios from "axios";
import { create } from "zustand";

/* ต้องตรงกับที่เรียกใช้ state ที่เรียกใช้ */
const useProductStore = create((set, get) => ({
    products: [],
    currentPost: null,
    loading: false,
    createProducts: async (body, token) => {
        const rs = await axios.post('http://localhost:8889/product', body, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(rs.data)
        /* ยิง axios แค่ครั้งเดียว */
        set(state => ({
            products: [{ ...rs.data.result, name: [], desc: [], image: [] }, ...state.products]
        }))
    },
    /* getall post axios ส่งไป backend */
    getAllPosts: async (token) => {
        set({ loading: true })
        const rs = await axios.get('http://localhost:8889/product', {
            headers: { Authorization: `Bearer ${token}` }
        })
        // console.log(rs)
        set({ products: rs.data.product, loading: false })
        console.log(rs.data.product)
        return rs.data.product
    },
}))
export default useProductStore