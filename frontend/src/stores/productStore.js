import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
/* ต้องตรงกับที่เรียกใช้ state ที่เรียกใช้ */
const useProductStore = create(persist((set, get) => ({
    products: [],
    product:null,
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
    deleteProducts: async (productId, token) => {
        const rs = await axios.delete(`http://localhost:8889/product/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        set(state => ({
            products: state.products.filter(product => product.id !== productId)
        }))
    },
    updateProducts: async (productId,token, body) => {
        console.log("product ID Here", productId)
        const rs = await axios.patch(`http://localhost:8889/product/${productId}`, body, {
            headers: { Authorization: `Bearer ${token}` }
        })
            set({product: rs.data.product})
    },
    getProduct:(item)=>{
        console.log(item)
        set({product : item})
    },
}),{name : "storage"}))
export default useProductStore