import React from 'react'
import { IoMdSearch } from "react-icons/io"
import { FaCaretDown, FaCartShopping } from "react-icons/fa6"
import { LuLogIn } from "react-icons/lu";
import Darkmode from './Darkmode';
import { Link } from 'react-router-dom';
import Login from '../../pages/Login';

function Navbar() {

    const MenuLinks = [
        {
            id: 1,
            name: "Home",
            link: "/#",
        },
        {
            id: 2,
            name: "Shop",
            link: "/#shop",
        },
        {
            id: 3,
            name: "About",
            link: "/#about",
        },
        {
            id: 4,
            name: "Blogs",
            link: "/#blogs",
        },
    ]
    return (
        <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40'>
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
                        <button className='relative p-3'>
                            <FaCartShopping className='text-xl text-gray-600 dark:text-gray-400' />
                            <div className='w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 
                                flex items-center justify-center text-xs'>0
                            </div>
                        </button>
                        <button className='relative p-3 cursor-pointer group'>
                            <div className="dropdown dropdown-bottom">
                                <div tabIndex={0} role="button" className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200">
                                    <Link to="/login">Login | Resgister</Link>
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

        </div>
    );
}

export default Navbar