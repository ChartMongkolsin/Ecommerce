import React, { useState } from 'react'
import useUserStore from '../stores/userstore'
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';


export default function EditUser() {
    const user = useUserStore(state => state.user)
    const login = useUserStore(state => state.login)
    const update = useUserStore(state => state.update)
    const token = useUserStore(state => state.token)

    const navigate = useNavigate()

    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    console.log('user', user)

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }
    const hdlClearInput = () => {

        setInput({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            password: '',
            confirmPassword: '',
        })

    }

    const hdlUpdate = async e => {
        try {
            e.preventDefault()
            //validation
            await update(user, token, input)

            if (!(input.email.trim() && input.password.trim() && input.firstName.trim() && input.lastName.trim())) {
                return toast.info('Please fill all input')
            }
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.email)) {
                return toast.info("Please check type Email !!")
            }
  

            setInput({
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                password: '',
                confirmPassword: '',
            })
            // e.target.closest('dialog')
            navigate("/")
            toast.success('Update ok')
        } catch (err) {
            const errMsg = err.response?.data?.error || err.message
            console.log(errMsg)
            toast.error(errMsg)
        }

    }

    return (
        <div className=''>
            <div className="hero bg-base-200 min-h-screen  dark:bg-gray-900 dark:text-white duration-200 ">
                <form c
                    onSubmit={hdlUpdate} className='flex flex-col gap-3 p-4 pt-10'>
                    <h1 className='text-red-700 text-3xl uppercase text-center '>Upadte Your Profile</h1>

                    <div className="flex gap-2">
                        <input type="text" placeholder='First name' className='input input-bordered w-full dark:text-black'
                            name='firstName'
                            value={input.firstName}
                            onChange={hdlChange}
                        />
                        <input type="text" placeholder='lastName' className='input input-bordered w-full dark:text-black'
                            name='lastName'
                            value={input.lastName}
                            onChange={hdlChange}
                        />
                    </div>
                    <input type="text" placeholder='Email' className='input input-bordered w-full  dark:text-black '
                        name='email'
                        value={input.email}
                        onChange={hdlChange}
                    />
                    <input type="password" placeholder='New password' className='input input-bordered w-full dark:text-black'
                        name='password'
                        value={input.password}
                        onChange={hdlChange}
                    />
                    <input type="password" placeholder='Confirm password' className='input input-bordered w-full  dark:text-black'
                        name='confirmPassword'
                        value={input.confirmPassword}
                        onChange={hdlChange}
                    />
                    <button className='btn btn-secondary text-xl text-white'>Update</button>
                    <button className='btn btn-warning text-xl text-white'
                        type='button'
                        onClick={hdlClearInput}
                    >Reset</button>
                </form>
            </div>
        </div>
    )
}