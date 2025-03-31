import React, { useEffect, useState } from 'react'
import { IoMdSearch } from "react-icons/io"
import { FaCaretDown, FaCartShopping } from "react-icons/fa6"
import Darkmode from '../navbar/Darkmode';
import { Link, useNavigate } from 'react-router-dom';
import { Profile } from '../../icons';
import useUserStore from '../../stores/userstore';
import EditUser from '../../pages/EditUser';
import CartModel from '../../pages/CartModel';
import useCartStore from '../../stores/cartStore';
import useProductStore from '../../stores/productStore';


function Navbar() {
    const allProducts = useProductStore(state => state.products)
    const user = useUserStore(state => state.user)
    const logout = useUserStore(state => state.logout)
    const token = useUserStore(state => state.token)
    const carts = useCartStore(state => state.carts)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const inCreaseCart = useCartStore(state => state.IncreaseCart)
    const createOrder = useCartStore(state => state.createOrder)

    const clearCart = useCartStore(state => state.clearCart); // Get clearCart method

    const navigate = useNavigate()

    // console.log('token', token)
    // console.log("first", allProducts)

    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState(null)
    const [isCartOpen, setIsCartOpen] = useState(false)

    // console.log(carts)
    // console.log(user)

   useEffect(() => {
        if (token) {
            clearCart();
        }
    }, []);


    // const handleAddToCart = () => {
    //     setCart(cart + 1);
    // };
    const handleCheckout = async () => {
        try {
            await createOrder(token); // รอให้ createOrder ทำงานเสร็จก่อน
            navigate("/payment"); // เสร็จแล้วไปหน้าชำระเงิน
        } catch (error) {
            console.error("Checkout error:", error);
        }
    };

    const totalPrice = carts.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);



    const MenuLinks = [
        {
            id: 1,
            name: "Home",
            link: "/#",
        },
        {
            id: 2,
            name: "Shop",
            link: "shop",
        },
        {
            id: 3,
            name: "Order",
            link: "order",
        },
        {
            id: 4,
            name: "Payment",
            link: "payment",
        },
        {
            id: 5,
            name: "Contact",
            link: "contact",
        },
    ]
    return (
        <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 '>
            <div className='py-4'>
                <div className='container flex justify-between'>
                    {/* LOGO  AND LINKS SECTION*/}
                    <div className='flex items-center gap-4'>
                        <a href="#" className=' text-primary font-semibold tracking-widest text-2xl uppercase
                        sm:text-3xl'
                        > ESHOP
                        </a>
                        {/* MENU ITEM */}
                        <div className='hidden lg:block'>
                            <ul className='flex items-center gap-4'>
                                {
                                    MenuLinks.map((data, index) => (
                                        <li key={index}>
                                            <a href={data.link}
                                                className='inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200 '
                                            >{data.name}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    {/* MENU ITEM */}
                    {/* NAVBAR RIGHT SECTION */}
                    <div className='flex justify-between items-center gap-4'>
                        {/* Search Bar Section */}
                        <div className='relative group hidden sm:block'>
                            <input type="text"
                                placeholder='Search'
                                className='search-bar' />
                            <IoMdSearch
                                className='text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200'
                            />
                            {/* Search Bar Section */}
                        </div>
                        {/* Order-button Section */}
                        <div className='flex  text-white items-center justify-center text-xs'>

                            {/* SideBar*/}
                            <button
                                className='relative p-3 z-200'
                                onClick={() => setIsOpen(true)}
                            >
                                <FaCartShopping className='text-xl text-gray-600 dark:text-gray-400 '
                                />
                                <span
                                    className='absolute -top-0 -right-0 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center'>
                                    {
                                        carts.length
                                    }
                                </span>
                            </button>
                            {/* Sidebar */}
                        </div>
                        {/* <button className='relative p-3 cursor-pointer group'>
                            <div className="dropdown dropdown-bottom">
                                <div tabIndex={0} role="button" className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"> */}

                        {/* {user?.role === "USER" && (
                                        <div className='flex gap-2'>
                                            <Profile className="w-7 dark:text-gray-400" />
                                            <h1>{user.firstName}</h1>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                <li>
                                                    <Link to="/myprofile" className='dark:text-black'><h1>My Profile</h1></Link>
                                                </li>
                                                <li>
                                                    <Link to="/edituser" className='dark:text-black'><h1>Edit Profile</h1></Link>
                                                </li>
                                                {user?.role === "ADMIN" && (
                                                    <div className='flex gap-2'>
                                                        <Profile className="w-7 dark:text-gray-400" />
                                                        <h1>{user.firstName}</h1>
                                                        <li>
                                                            <Link to="/allproduct" className='dark:text-black'><h1>All Product List</h1></Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/createproduct" className='dark:text-black'><h1>Create Product</h1></Link>
                                                        </li>

                                                    </div>
                                                )}
                                                <li className="cursor-pointer" onClick={logout}><a>Logout</a></li>
                                            </ul>
                                        </div>
                                    )}
                                    {user  && (
                                        // แสดง UI สำหรับ guest (ยังไม่ได้ login)
                                        <div className='flex gap-2'>
                                            <Link to="/login">
                                                <h1>LOGIN</h1>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button> */}
                        <button className='relative p-3 cursor-pointer group'>
                            <div className="dropdown dropdown-bottom">
                                <div tabIndex={0} role="button" className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200">
                                    {user ? (
                                        <div className='flex gap-2'>
                                            <Profile className="w-7 dark:text-gray-400" />
                                            <h1>{user.firstName}</h1>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                <li>
                                                    <Link to="/myprofile" className='dark:text-black'><h1>My Profile</h1></Link>
                                                </li>
                                                <li>
                                                    <Link to="/edituser" className='dark:text-black'><h1>Edit Profile</h1></Link>
                                                </li>
                                                {user.role === "ADMIN" && (
                                                    <>
                                                        <li>
                                                            <Link to="/allproduct" className='dark:text-black'><h1>All Product List</h1></Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/createproduct" className='dark:text-black'><h1>Create Product</h1></Link>
                                                        </li>
                                                    </>
                                                )}
                                                <li className="cursor-pointer" onClick={logout}><a>Logout</a></li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className='flex gap-2'>
                                            <Link to="/login">
                                                <h1>LOGIN</h1>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                        {/* Dark Mode Section */}
                        <div>
                            <Darkmode />
                        </div>
                    </div>

                </div>

            </div>
            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-lg duration-300 z-50 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full '
                    } overflow-auto`}
            >
                <div className="p-4 flex justify-between items-center border-b ">
                    <h2 className="text-lg font-bold ">Your Cart</h2>
                    <button onClick={() => setIsOpen(false)} className="text-red-600">✖</button>
                </div>


                <div className="p-4 space-y-2 ">
                    {carts.length === 0 ? (
                        <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
                    ) : (
                        carts.map((item, index) => (
                            <div key={item.id} className="flex border-b p-2 flex-col">
                                <img src={item.product?.image} alt=""
                                    className='w-20 h-20 object-cover dark:text-white'
                                />
                                <span className='dark:text-white font-bold'>Name : {item.product?.name}</span>
                                <span className="font-bold dark:text-white">Price : {item.product?.price}฿</span>
                                <span className="font-bold dark:text-white">Quatity : {item.quantity}</span>
                                <div className='felx gap-5'>
                                    <button onClick={() => inCreaseCart(item)}
                                        className='bg-green-500 rounded-md w-8 h-8 items-center'>+</button>
                                    <button onClick={() => removeFromCart(item.id)} className='bg-red-500 rounded-md w-8 h-8 items-center'>-</button>
                                    <div className='felx gap-5 inline-flex   '>
                                    </div>
                                </div>
                            </div>
                        ))

                    )}
                </div>
                <div className='cart-bottom'>
                            <div className='total'>
                                <h3>total price : {totalPrice}</h3>
                                <button onClick={handleCheckout}
                                    className='btn btn-primary w-full'>CheckOut
                                </button>
                            </div>

                        </div>
                {/* <form action="/create-checkout-session" method="POST">
                    <button type="submit">
                        Checkout
                    </button>
                </form> */}
            </div>
            {/* Sidebar */}
            {
                isOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-40 "
                        onClick={() => setIsOpen(false)}
                    >
                    </div>
                )
            }

        </div >
    );
}

export default Navbar