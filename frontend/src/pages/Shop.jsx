import React, { useEffect, useState } from 'react'
import p1 from "../assets/product/p-1.jpg"
import p2 from "../assets/product/p-2.jpg"
import p3 from "../assets/product/p-3.jpg"
import useProductStore from '../stores/productStore'
import useUserStore from '../stores/userstore'





function Shop() {
    const getAllProduct = useProductStore(state => state.getAllPosts)
    const token = useUserStore(state => state.token)
    const [products,setProducts] = useState(null)

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
    

    const ProductsData = [
        {
            id: 1,
            img: p1,
            title: "Earphone",
            rating: "5.0",
            color: "white",
            aosDelay: "0",
        },
        {
            id: 2,
            img: p2,
            title: "XXX Watch",
            rating: "4.0",
            color: "Red",
            aosDelay: "200",
        },
        {
            id: 3,
            img: p3,
            title: "Earphone",
            rating: "4.7",
            color: "Brown",
            aosDelay: "200",
        },
        {
            id: 1,
            img: p1,
            title: "Earphone",
            rating: "5.0",
            color: "white",
            aosDelay: "0",
        },
        {
            id: 2,
            img: p2,
            title: "XXX Watch",
            rating: "4.0",
            color: "Red",
            aosDelay: "200",
        },
        {
            id: 3,
            img: p3,
            title: "Earphone",
            rating: "4.7",
            color: "Brown",
            aosDelay: "200",
        },
        {
            id: 1,
            img: p1,
            title: "Earphone",
            rating: "5.0",
            color: "white",
            aosDelay: "0",
        },
        {
            id: 2,
            img: p2,
            title: "XXX Watch",
            rating: "4.0",
            color: "Red",
            aosDelay: "200",
        },
        {
            id: 3,
            img: p3,
            title: "Earphone",
            rating: "4.7",
            color: "Brown",
            aosDelay: "200",
        },
        {
            id: 1,
            img: p1,
            title: "Earphone",
            rating: "5.0",
            color: "white",
            aosDelay: "0",
        },
        {
            id: 2,
            img: p2,
            title: "XXX Watch",
            rating: "4.0",
            color: "Red",
            aosDelay: "200",
        },
        {
            id: 3,
            img: p3,
            title: "Earphone",
            rating: "4.7",
            color: "Brown",
            aosDelay: "200",
        },
        {
            id: 1,
            img: p1,
            title: "Earphone",
            rating: "5.0",
            color: "white",
            aosDelay: "0",
        },
        {
            id: 2,
            img: p2,
            title: "XXX Watch",
            rating: "4.0",
            color: "Red",
            aosDelay: "200",
        },
        {
            id: 3,
            img: p3,
            title: "Earphone",
            rating: "4.7",
            color: "Brown",
            aosDelay: "200",
        },
        {
            id: 1,
            img: p1,
            title: "Earphone",
            rating: "5.0",
            color: "white",
            aosDelay: "0",
        },
        {
            id: 2,
            img: p2,
            title: "XXX Watch",
            rating: "4.0",
            color: "Red",
            aosDelay: "200",
        },




    ]
    return (
        <div className='px-6 bg-white dark:bg-gray-900 dark:text-white duration-200'>
            <div className='grid grid-cols-1 sm:grid-cols-3 
                    md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 '>
                {/* Body Section */}
                {/* Card section */}
                {
                    products && products.map((product,index) => (
                        <div className="card bg-base-100 w-50 shadow-xl ">
                            <figure>
                                <img
                                    src={product.image}
                                    className='w-45 h-45 object-contain'
                                    alt="image" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.name}</h2>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary w-20">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}

            </div>
        </div>
    )
}

export default Shop