import axios from "axios"
import {create} from "zustand"
import {createJSONStorage, persist} from "zustand/middleware"

const useUserStore = create(persist((set,get)=>({
    email: null,
    token: '',
    login: async (input)=>{
        const rs = await axios.post('http://localhost:8889/auth/login',input)
        set({token:rs.data.token , user:rs.data.email})
        return rs.data
    },
    logout : ()=>{
        set({token : '', email : null})

    }
}),{
    name: 'state',
    storage: createJSONStorage(()=>localStorage)
}))

export default useUserStore