import { Link, useParams } from "react-router-dom"
import { FiChevronRight } from "react-icons/fi"
import { useFetchProductQuery } from "../../store/services/productService"
import Nav from "../../components/home/nav"
import ProductLoader from '../../components/home/productLoader'
import ProductCard from "../../components/home/productCard"
import DetailCard from "../../components/home/detailCard"

const Product = () => {
    const { id } = useParams()
    const { data, isFetching } = useFetchProductQuery(id)
    return (
        <>
            <Nav />
            <div className="my-container mt-24">
                {isFetching ? (
                    <ProductLoader />
                ) : (
                    <>
                        <ul className="flex items-center">
                            <li className="capitalize text-gray-600">
                                <Link to="/">home</Link>
                            </li>
                            <FiChevronRight className="block mx-2" />
                            <li className="capitalize text-gray-600">
                                <Link to={`/cat-products/${data.category}`}>
                                    {data.category}
                                </Link>
                            </li>
                            <FiChevronRight className="block mx-2" />
                            <li className="capitalize text-gray-600">
                                <Link to={`/product/${data._id}`}>{data.title}</Link>
                            </li>
                        </ul>
                        <DetailCard product={data} />
                    </>
                )}
            </div>
        </>
    )
}

export default Product
