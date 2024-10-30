import React from 'react';
import "swiper/css";
import "swiper/css/pagination";
import Spinner from '../spinner'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom'
import { useGetRandomCategoryQuery } from '../../store/services/categoryService'

const Slider = () => {
    const { data, isFetching } = useGetRandomCategoryQuery()
    console.log(data)
    return isFetching ? (
        <div className="my-container h-[70vh] flex items-center justify-center">
            <Spinner />
        </div>
    ) : (
        <Swiper pagination={{ dynamicBullets: true }} modules={[Pagination]} className="mySwiper">
            {data?.categories.length > 0 && data?.categories.map((cat, index) => (
                <SwiperSlide className='slide' key={cat._id}>
                    <div className='slide-img'>
                        <img src={`./images/slider/${index + 1}.jpg`} className='w-full h-full object-cover' alt='' />
                    </div>
                    <div className="absolute inset-0 w-full h-full bg-black/50">
                        <div className="my-container h-[70vh] flex flex-col items-center justify-center">
                            <h1 className="text-white text-xl font-medium capitalize">
                                {cat.name}
                            </h1>
                            <div className='mt-10'>
                                <Link to={`/cat-products/${cat.name}`} className='btn btn-indigo text-sm'>
                                    browse collections
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Slider
