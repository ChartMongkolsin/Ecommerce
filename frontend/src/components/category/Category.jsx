import React from 'react'
import p1 from "../../assets/product/p-1.jpg"
import p2 from "../../assets/product/p-2.jpg"
import p3 from "../../assets/product/p-3.jpg"
import p4 from "../../assets/product/p-4.jpg"
import p5 from "../../assets/product/p-5.jpg"
import { FaStar } from "react-icons/fa6"


function Category() {
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
            id: 4,
            img: p4,
            title: "Earphone",
            rating: "4.3",
            color: "Yellow",
            aosDelay: "600",
        },
        {
            id: 5,
            img: p5,
            title: "Earphone",
            rating: "4.3",
            color: "Yellow",
            aosDelay: "600",
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
            id: 4,
            img: p4,
            title: "Earphone",
            rating: "4.3",
            color: "Yellow",
            aosDelay: "600",
        },
        {
            id: 5,
            img: p5,
            title: "Earphone",
            rating: "4.3",
            color: "Yellow",
            aosDelay: "600",
        },


    ]
    return (
        <div className='mt-14 mb-12 '>
            <div className='container rounded-3xl'>
                {/* Header Section */}
                <div className='text-center mb-6 max-w-[600px] mx-auto '>
                    <h1 className='text-3xl font-bold'>Products</h1>
                    <p className='text-sm text-primary p-2'>Top Selling Products</p>
                    <p className='text-xs text-gray-400 p-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi molestiae deserunt
                        amet impedit nulla numquam tempora dolorum eveniet enim minima?</p>
                </div>
                {/* Header Section*/}
                {/* Body Section */}
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 
                    md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 '>
                        {/* Body Section */}
                        {/* Card section */}
                        {
                            ProductsData.map((data) => (
                                <div key={data.id}
                                    className='space-y-3 py-2 '>
                                    <img src={data.img} alt=""
                                        className='h-[220px] w-[160px]  object-cover rounded-md hover:scale-110'
                                    />
                                    <div >
                                        <h3 className='font-semibold'>{data.title}</h3>
                                        <p className='text-sm text-gray-600'>{data.color}</p>
                                        <div className='flex items-center gap-1'>
                                            <FaStar className="text-yellow-400" />
                                            <span>{data.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {/* Card section */}
                        {/* Product section */}
                        {/* Product section */}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Category