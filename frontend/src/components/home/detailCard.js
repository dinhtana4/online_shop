import { motion } from "framer-motion"
import toast, { Toaster } from 'react-hot-toast'
import DetailImage from "./detailImage"
import { discount } from '../../utils/discount'
import { useState } from "react"
import { BsCheck2 } from "react-icons/bs"
import Quantity from "./quantity"
import htmlParser from 'html-react-parser'
import h2p from 'html2plaintext'
import { useDispatch } from "react-redux"
import { addCart } from "../../store/reducers/cartReducer"

const DetailCard = ({ product }) => {
    console.log('Detail card')
    const dispatch = useDispatch()
    const [size, setSize] = useState(product?.sizes.length > 0 && product.sizes[0].name)
    const [color, setColor] = useState(product?.colors.length > 0 && product.colors[0].color)
    const [quantity, setQuantity] = useState(1)
    const increase = () => {
        setQuantity(quantity + 1)
    }
    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    let description = h2p(product.description)
    description = htmlParser(description)
    const clickAddToCart = () => {
        const {
            ['colors']: colors,
            ['sizes']: sizes,
            'createdAt': createdAt,
            'updatedAt': updatedAt,
            ...newProduct
        } = product
        newProduct['size'] = size
        newProduct['color'] = color
        newProduct['quantity'] = quantity
        dispatch(addCart(newProduct))
        toast.success(`${newProduct.title} has been added to cart successful`)
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap -mx-5"
        >
            <Toaster />
            <div className="w-full order-2 md:order-1 md:w-6/12 p-5">
                <div className="flex flex-wrap -mx-1">
                    <DetailImage image={product.image1} />
                    <DetailImage image={product.image2} />
                    <DetailImage image={product.image3} />
                </div>
            </div>
            <div className="w-full order-1 md:order-2 md:w-6/12 p-5">
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                    {product.title}
                </h1>
                <div className="flex justify-between my-5">
                    <span className="text-2xl font-bold text-gray-900">
                        {" "}
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                            discount(product.price, product.discount)
                        )}
                    </span>
                    <span className="text-xl line-through text-gray-500">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                            product.price,
                        )}
                    </span>
                </div>
                {product.sizes.length > 0 && (
                    <>
                        <h3 className="text-base font-medium capitalize text-gray-600 mb-3">
                            sizes
                        </h3>
                        <div className="flex flex-wrap -mx-1">
                            {product.sizes.map((sz) => (
                                <div className={`p-2 m-1 border border-gray-300 rounded cursor-pointer ${size === sz.name && "bg-indigo-600"}`}
                                    key={sz.name}
                                    onClick={() => setSize(sz.name)}>
                                    <span className={`text-sm font-semibold uppercase  ${size === size.name ? "text-white" : "text-gray-900"}`}>
                                        {sz.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {product.colors.length > 0 && (
                    <>
                        <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">
                            colors
                        </h3>
                        <div className="flex flex-wrap -mx-1">
                            {product.colors.map(cl => (
                                <div key={cl.color}
                                    onClick={() => setColor(cl.color)}
                                    className="border border-gray-300 rounded m-1 p-1 cursor-pointer">
                                    <span className="min-w-[40px] min-h-[40px] rounded flex items-center justify-center"
                                        style={{ backgroundColor: cl.color }}>
                                        {color === cl.color && (
                                            <BsCheck2 className="text-white" size={20} />
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <div className="flex -mx-3 items-center">
                    <div className="w-full sm:w-6/12 p-3">
                        <Quantity quantity={quantity} increase={increase} decrease={decrease} />
                    </div>
                    <div className="w-full sm:w-6/12 p-3">
                        <button className="btn btn-indigo" onClick={clickAddToCart}>
                            add to cart
                        </button>
                    </div>
                </div>
                <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">
                    description
                </h3>
                <div className="mt-4 leading-[27px] description">{description}</div>
            </div>
        </motion.div>
    )
}

export default DetailCard
