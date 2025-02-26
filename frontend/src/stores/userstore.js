import axios from "axios"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const useUserStore = create(persist((set, get) => ({
    user: null,
    // email: null,
    token: '',
    login: async (input) => {
        console.log(input)
        const rs = await axios.post('http://localhost:8889/auth/login', input)
        set({ token: rs.data.token, user: rs.data.email })
        console.log(rs.data)
        return rs.data
    },
    logout: () => {
        set({ token: '', user: null })
    },
    update: async (user, token, body) => {
        console.log("User ID Here", user.id)
        const rs = await axios.put('http://localhost:8889/auth/update', body, {
            headers: { Authorization: `Bearer ${token}` }
        })
            set({user: rs.data.user})
    },

}), {
    name: 'state',
    storage: createJSONStorage(() => localStorage)
}))

export default useUserStore