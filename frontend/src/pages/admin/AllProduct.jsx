import React, { useEffect, useState } from 'react'
import useProductStore from '../../stores/productStore'
import p1 from '../../assets/product/p-1.jpg'
import { Link } from 'react-router'
import axios from 'axios'
import useUserStore from '../../stores/userstore'
import { toast } from 'react-toastify'



function AllProduct() {
  const getAllProduct = useProductStore(state => state.getAllPosts)
  const token = useUserStore(state => state.token)
  const deleteProducts = useProductStore(state => state.deleteProducts)
  const getProduct = useProductStore(state=>state.getProduct)


  const [products, setProducts] = useState(null)


const hdlDelete = async (id)=>{
  try {
    await deleteProducts(id,token)
    toast.success('Deleted Done')
    fetchProducts(token)
  } catch (err) {
    const errMsg = err.response?.data?.err || err.message
    toast.error(errMsg)
    console.log(errMsg)
  }
}




    const fetchProducts = async () => {
      try {


        const fetchproductdata = await getAllProduct(token)
        setProducts(fetchproductdata)
        console.log(products)
      } catch (err) {
        const errMsg = err.response?.data?.err || err.message
        toast.error(errMsg)
        console.log(errMsg)
      }
    }
    console.log('products', products)


    useEffect(() => {
      fetchProducts()
    }, [])



    return (
      <div className='container my-4'>
        <h2 className='text-center mb-4 font-bold text-3xl'>Products</h2>

        <div className='row mb-3'>
          <div className='col'>
            <Link to="/Createproduct"
              className='btn btn-primary me-1'
              role="button"
            >Create Product</Link>
            <button type="button"
              className='btn btn-outline-primary'>
              Refresh</button>
          </div>
          <div className='col'>

          </div>
          <table className='table'>
            <thead>
              <tr className=''>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>rating</th>
                <th>numReview</th>
                <th>Price</th>
                <th>CountInStock</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                products && products.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td><img src={`${product.image}`}
                        className='object-cover w-20 h-20' alt="image" /></td>
                      <td>{product.description}</td>
                      <td>{product.rating}</td>
                      <td>{product.numReveiw}</td>
                      <td>{product.price}$</td>
                      <td>{product.countInStock}</td>
                      <td>{product.createdAt}</td>
                      <td>{product.updateAt}</td>
                      <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                        <Link className='btn btn-primary btn-sm me-1'
                          onClick={()=>getProduct(product)}
                          to="/editproduct">Edit</Link>
                        <button onClick={()=>hdlDelete(product.id)}
                          type="button" className='btn btn-danger btn-sm'>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  export default AllProduct

