import axios from "axios";
import { create } from "zustand";

/* ต้องตรงกับที่เรียกใช้ state ที่เรียกใช้ */
const usePostStore = create((set, get) => ({
    posts: [],
    currentPost: null,
    loading: false,
    createPost: async (body, token, user) => {
        const rs = await axios.post('http://localhost:8889/post', body, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(rs.data)
        /* ยิง axios แค่ครั้งเดียว */
        set(state => ({
            posts: [{ ...rs.data.result, user, name: [], description: [] }, ...state.posts]
        }))
    },
    /* getall post axios ส่งไป backend */
    getAllPosts: async (token) => {
        set({ loading: true })
        const rs = await axios.get('http://localhost:8889/post', {
            headers: { Authorization: `Bearer ${token}` }
        })
        // console.log(rs)
        set({ posts: rs.data.posts, loading: false })
    },
}))
export default usePostStore