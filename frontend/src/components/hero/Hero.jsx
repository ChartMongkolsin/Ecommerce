import React from 'react'
import Slider from "react-slick";
import Image1 from "../../assets/hero/headphone.png"
import Image2 from "../../assets/category/vr.png"
import Image3 from "../../assets/category/macbook.png"


const HeroData = [
    {
        id: 1,
        img: Image1,
        subtitle: "Beats Solo",
        title: "Wireless",
        title2: "Headphone",
    },
    {
        id: 2,
        img: Image2,
        subtitle: "Beats Solo",
        title: "Wireless",
        title2: "Virtual",
    },
    {
        id: 1,
        img: Image3,
        subtitle: "Beats Solo",
        title: "Branded",
        title2: "Laptops",
    },

]


function Hero() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 4000,
        pauseOnHover: false,
        pauseOnFocus: true,
    };
    return (
        <div className='container mt-12'>
            <div className='overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center '>
                <div className='container pb-0 sm:pb-'>
                    {/* Hero Section */}
                    <Slider {...settings}>
                        {
                            HeroData.map((data) => (
                                <div key={data.id}>
                                    <div className='grid grid-cols-1 sm:grid-cols-2'>
                                        {/* TEXT CONTTENT SECTION */}
                                        <div className='flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 
                                        text-center sm:text-left order-2 sm:order-1 relative z-10 '>
                                            <h1 className='text-2xl sm:text-6xl lg:text-2xl font-bold'>{data.subtitle}</h1>
                                            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
                                            <h1 className='text-5xl uppercase text-white dark:text-white/5 sm:text-[60px]
                                            md:text-[100px] xl:text-[150px] font-bold'>{data.title2}</h1>
                                            <div>
                                            <button className="btn btn-primary outline-none font-bold ">Shop Now</button>
                                            </div>
                                        </div>
                                        {/* TEXT CONTTENT SECTION */}
                                        {/* IMAGE SECTION */}
                                        <div className='order-1 sm:order-2'>
                                            <div>
                                                <img src={data.img} alt=""
                                                    className='w-[300px] h-[300px] sm:h-[450px] 
                                           sm:scale-105 lg:scale-110 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
                {/* Hero Section */}
            </div>
        </div >
    )
}

export default Hero