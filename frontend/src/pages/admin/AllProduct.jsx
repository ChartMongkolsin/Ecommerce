import React, { useEffect } from 'react'
import useProductStore from '../../stores/productStore'
import p1 from '../../assets/product/p-1.jpg'
import { Link } from 'react-router'

function AllProduct() {
  const admin = useProductStore(state => state.getAllposts)
  const product = [
    {
      id: 1,
      image: p1,
      name: "Earphone",
      description: "this is new product ",
      rating: "5.0",
      numReveiw: "4.8",
      price: "41",
      countInStock: "7 pcs",
      createdAt: "27-02-24",
      updateAt: "28-02-24",
    },
  ]


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
              product.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.image}</td>
                    <td>{product.description}</td>
                    <td>{product.rating}</td>
                    <td>{product.numReveiw}</td>
                    <td>{product.price}$</td>
                    <td>{product.countInStock}</td>
                    <td>{product.createdAt}</td>
                    <td>{product.updateAt}</td>
                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                      <a className='btn btn-primary btn-sm me-1'
                        href="">Edit</a>
                      <button type="button" className='btn btn-danger btn-sm'>Delete</button>
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