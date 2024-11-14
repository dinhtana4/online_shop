import { useParams } from "react-router-dom"
import Header from '../../components/home/header'
import Nav from '../../components/home/nav'
import { useGetProductByCategoryQuery } from '../../store/services/productService'
import ProductCard from '../../components/home/productCard'
import Pagination from '../../components/pagination'
import ProductSkeleton from '../../components/home/productSkeleton'

const CatProducts = () => {
    const { name, page = 1 } = useParams()
    const { data, isFetching } = useGetProductByCategoryQuery({
        name,
        page
    })
    return (
        <>
            <Nav />
            <div className="mt-[70px]">
                <Header>#{name}</Header>
            </div>
            <div className="my-container my-10">
                {isFetching ? (
                    <ProductSkeleton />
                ) : data.count > 0 ? (
                    <>
                        <p className="text-base font-medium text-gray-700">
                            {data.count} products found for #{name} category
                        </p>
                        <div className="flex flex-wrap -mx-5">
                            {data.products.map(product => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                        </div>
                        <Pagination page={parseInt(page)}
                            perPage={data.perPage}
                            count={data.count}
                            path={`cat-products/${name}`}
                            theme='light'
                        />
                    </>
                ) : (
                    <p className="alert-danger">
                        No products found for #{name} category
                    </p>
                )}
            </div>
        </>
    )
}

export default CatProducts
