import { useParams } from "react-router-dom"
import Header from '../../components/home/header'
import Nav from '../../components/home/nav'
import { useSearchProductQuery } from '../../store/services/productService'
import ProductCard from '../../components/home/productCard'
import Pagination from '../../components/pagination'
import ProductSkeleton from '../../components/home/productSkeleton'

const SearchProducts = () => {
    const { keyword, page = 1 } = useParams()
    const { data, isFetching } = useSearchProductQuery({
        keyword,
        page
    })
    return (
        <>
            <Nav />
            <div className="mt-[70px]">
                <Header>#{keyword}</Header>
            </div>
            <div className="my-container my-10">
                {isFetching ? (
                    <ProductSkeleton />
                ) : data.count > 0 ? (
                    <>
                        <p className="text-base font-medium text-gray-700">
                            {data.count} products found for #{keyword} keyword
                        </p>
                        <div className="flex flex-wrap -mx-5">
                            {data.products.map(product => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                        </div>
                        <Pagination page={parseInt(page)}
                            perPage={data.perPage}
                            count={data.count}
                            path={`search-products/${keyword}`}
                            theme='light'
                        />
                    </>
                ) : (
                    <p className="alert-danger">
                        No products found for #{keyword} keyword
                    </p>
                )}
            </div>
        </>
    )
}

export default SearchProducts
