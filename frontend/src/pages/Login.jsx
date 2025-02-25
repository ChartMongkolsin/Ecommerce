import {useState} from 'react'
import axios from 'axios'
import useUserStore from '../stores/userstore'
import {toast} from 'react-toastify'


function Login() {
    const login = useUserStore(state=>state.login)
    const token = useUserStore(state=>state.token)

    const [input,setInput] = useState({
        email : '',
        password : '',
    })
    const hdlChange = e => {
        setInput(prv=>({...prv, [e.target.name]: e.target.value}))
    }

    const hdlLogin = async (e)=>{
        try {
            e.preventDefault()
            //validation
            if(!(input.email.trim() && input.password.trim())){
                return toast.info('Please fill all input')
            }
            // คืออะไร
            let data = await login(input)

        } catch (error) {
            const errMsg = err.response?.data?.error || err.message
            console.log(errMsg)
            toast.error(errMsg, {position : 'top-center'})
        }
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form 
                        onSubmit={hdlLogin}
                        className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered"  
                                onChange={hdlChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" 
                                onChange={hdlChange}
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login