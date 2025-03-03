import React, { useEffect, useState } from 'react'
import p1 from "../assets/product/p-1.jpg"
import p2 from "../assets/product/p-2.jpg"
import p3 from "../assets/product/p-3.jpg"
import useProductStore from '../stores/productStore'
import useUserStore from '../stores/userstore'
import CartModel from './CartModel'
import useCartStore from '../stores/cartStore'





function Shop() {
    const allProducts = useProductStore(state=>state.products)
    const getAllProduct = useProductStore(state => state.getAllPosts)
    const token = useUserStore(state => state.token)
    const createCartItems = useCartStore(state=> state.createCartItems)

    const [products, setProducts] = useState([])
    
        // const addToCart = () => {
        //     const existingProduct = cart.find((item) => item.id === products.id);
        //     if (existingProduct) {
        //         setCart(
        //             cart.map((item) => item.id === products.id ? { ...item, quantity: item.quantity + 1 } : item)
    
        //         );
        //     } else {
        //         setCart([...cart, { ...products, quantity: 1 }]);
        //     }
        // };
    
        // const removeFromCart = (productsId) => {
        //     setCart(cart.filter((item) => item.id !== productsId));
    
        // };
    
        // const updateQuantity = (productsId, delta) => {
        //     setCart(cart.map((item) => item.id === productsId ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item)
        //     );
        // };
        
        // const total = cart.reduce((sum,item)=> sum + item.price * item.quantity, 0);



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
        <div className=' bg-white dark:bg-gray-900 dark:text-white duration-200 container '>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 '>
                {/* Body Section */}
                {/* Card section */}
                {
                    allProducts.length > 0 && allProducts.map((product, index) => (
                        /* Product Image */
                        <div key={index}>
                            <div className="card w-66 shadow-sm   ">
                                    <img
                                        src={product.image} className="w-full h-full rounded-xl"
                                        alt={product.name}
                                    />
                                <div className="card-body gap-2  dark:text-black ">
                                    <h2 className="card-title dark:text-white">{product.name}</h2>
                                    <p className='dark:text-white'>{product.desc}</p>
                                    <p className='dark:text-white'>{product.price}$</p>
                                    <div className="card-actions">
                                        <button className="btn btn-primary bg-green-500 border-none"
                                        onClick={()=>createCartItems(product.id,token)}
                                        >Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


            </div>
        </div >
    )
}

export default Shop