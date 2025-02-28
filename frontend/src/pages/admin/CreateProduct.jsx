import React, { useState } from 'react'
import useProductStore from '../../stores/productStore'
import useUserStore from '../../stores/userstore'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

function CreateProduct() {

    const createProducts = useProductStore(state => state.createProducts)
    const user = useUserStore(state => state.user)
    const token = useUserStore(state => state.token)

    const [file,setFile]= useState(null)
    const [input, setInput] = useState({})
    const [loading,setLoading] =useState(false)


    const navigate = useNavigate()
const hdlChange = (e) =>{
    setInput(prv=> ({...prv, [e.target.name]: e.target.value}))
}


    const hdlCreateProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(input)
        try {
            const { name, desc, price, numReview, countInStock } = input

            const body = new FormData();
            body.append('name', name);
            body.append('desc', desc);
            body.append('price', price);
            body.append('countInStock', countInStock);
            body.append('numReview', numReview);

            if(file) {
                body.append('image', file)
              }


            await createProducts(body, token)
            toast('Created Product Done')
            navigate("/allproduct")

        } catch (error) {
            const errMsg = error.response?.data?.error || error.message
            console.log(error)
            toast.error(errMsg)

        }finally{
            setLoading(false)
        }
    }

    return (
        <div className=' container my-4'>
            <div className='row'>
                <div className='col-md-8 mx-auto rounded border pt-4'>
                    <h2 className='text-center mb-5 text-4xl font-bold'>Create Product</h2>

                    <form onSubmit={hdlCreateProduct}
                     className='flex flex-col gap-3 p-4 pt-2'>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Name</label>
                            <div className='col-sm-8'>
                                <input name="name" className='input input-bordered w-full bg-red-300'
                                    value={input.name}
                                    onChange={hdlChange} />
                                <span className='text-danger'></span>
                            </div>
                        </div> 
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Description</label>
                            <div className='col-sm-8'>
                                <textarea type="text" name="desc" rows="4" className=' w-full bg-red-300'
                                value={input.desc}
                                onChange={hdlChange}
                                />
                                <span className='text-danger'></span>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Price</label>
                            <div className='col-sm-8'>
                                <input type="number" name="price" className='bg-red-300 form-control w-full' step="0.01" min="1"
                                value={input.price}
                                onChange={hdlChange}
                                />
                                <span className='text-danger'></span>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>NumReview</label>
                            <div className='col-sm-8'>
                                <input type="number" 
                                name="numReview" className='bg-red-300 form-control w-full' step="0.01" min="1" 
                                value={input.numReview}
                                onChange={hdlChange}
                                />
                                <span className='text-danger'></span>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>CountInStock</label>
                            <div className='col-sm-8'>
                                <input type="number" 
                                name="countInStock" 
                                className='bg-red-300 form-control w-full' step="0.01" min="1"
                                value={input.countInStock}
                                onChange={hdlChange}
                                />
                                <span className='text-danger'></span>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Image</label>
                            <div className='col-sm-8'>
                                <input type="file" 
                                name="image" 
                                className='bg-red-300 form-control w-full'
                                value={input.image}
                                onChange={e => setFile(e.target.files[0])}
                                />
                                <span className='text-danger'></span>
                            </div>
                        </div>
                        <div className='flex gap-11 '>
                            <div className=' '>
                                <button type="submit" className='btn btn-primary'
                                >Submit</button>
                                <a className='btn btn-primary mt-4' href='' role="button" >Cancel</a>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct