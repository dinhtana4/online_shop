import { useGetProductByCategoryQuery } from '../../store/services/productService'
import ProductCard from './productCard';
import ProductSkeleton from './productSkeleton'
import { Link } from "react-router-dom";

const HomeProduct = ({ category }) => {
    const { data, isFetching } = useGetProductByCategoryQuery({
        name: category.name,
        page: ""
    })

    console.log(data)
    return isFetching ? (
        <ProductSkeleton />
    ) : (
        data?.products?.length > 0 && (
            <>
                <div className="flex justify-between">
                    <span className="text-lg font-medium capitalize">
                        {category.name}
                    </span>
                    <span className="capitalize">
                        <Link to={`/cat-products/${category.name}`}>see all</Link>
                    </span>
                </div>
                <div className='flex flex-wrap -mx-5'>
                    {data?.products.map((product) => (
                        <ProductCard product={product} />
                    ))}
                </div>
            </>
        )
    )
}

export default HomeProduct
