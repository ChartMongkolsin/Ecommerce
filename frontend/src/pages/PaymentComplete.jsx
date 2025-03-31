import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import useUserStore from '../stores/userstore'
import { checkoutStatus } from '../api/checkout'
import { toast } from 'react-toastify'

function PaymentComplete() {
  const navigate = useNavigate()
  const token = useUserStore(state=>state.token)
  const {session} = useParams()
  const [status, setStatus]= useState(null)


  console.log("session",session)

  useEffect(()=>{
    fecthPayment()
  },[])

  const fecthPayment = async()=>{
    try {
      const res = await checkoutStatus(token,session)
      setStatus('res', res.data.status)
      toast.success("Sucessfully",res.data.message)
      navigate('order')
    } catch (error) {
      
    }
  }
  if(status === "open"){
    return <Navigate to="/"/>
  }
  return (
    <div>Loading....</div>
  )
}

export default PaymentComplete