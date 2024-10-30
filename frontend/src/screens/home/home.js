import React from 'react'
import Nav from '../../components/home/nav'
import Slider from '../../components/home/slider'
import Categories from '../../components/home/categories'
import { useGetRandomCategoryQuery } from '../../store/services/categoryService'
import ProductSkeleton from '../../components/home/productSkeleton'
import HomeProduct from '../../components/home/homeProduct'

const Home = () => {
    const { data, isFetching } = useGetRandomCategoryQuery()

    return (
        <>
            <Nav />
            <div className="mt-[70px]">
                <Slider />
            </div>
            <div className='my-container mt-10'>
                <Categories />
                {!isFetching && data?.categories?.length > 0 &&
                    data.categories.map((cat) => (
                        <HomeProduct category={cat} key={cat._id} />
                    ))
                }
            </div>
        </>
    )
}

export default Home
