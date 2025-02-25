import React, { useState } from 'react'
import useUserStore from '../stores/userstore'
import axios from "axios";
import { toast } from "react-toastify";


export default function Register() {

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlRegister = e => {
    try {
      e.preventDefault()
      //validation
      const rs = axios.post('http://localhost:8889/auth/register', input)
      console.log(rs.data)
      setInput({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      e.target.closest('dialog').close()
      toast.success('Register ok')
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message
      console.log(errMsg)
      toast.error(errMsg)
    }
  }

  return (
    <form onSubmit={hdlRegister} className='flex flex-col gap-3 p-4 pt-10'>
      <div className="flex gap-2">
        <input type="text" placeholder='First name' className='input input-bordered w-full'
          name='firstName'
          value={input.firstName}
          onChange={hdlChange}
        />
        <input type="text" placeholder='Surname' className='input input-bordered w-full'
          name='lastName'
          value={input.lastName}
          onChange={hdlChange}
        />
      </div>
      <input type="text" placeholder='Email' className='input input-bordered w-full'
        name='email'
        value={input.email}
        onChange={hdlChange}
      />
      <input type="password" placeholder='New password' className='input input-bordered w-full'
        name='password'
        value={input.password}
        onChange={hdlChange}
      />
      <input type="password" placeholder='Confirm password' className='input input-bordered w-full'
        name='confirmPassword'
        value={input.confirmPassword}
        onChange={hdlChange}
      />
      <button className='btn btn-secondary text-xl text-white'>Sign up</button>
    </form>
  )
}