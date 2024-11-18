import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { motion } from 'framer-motion'
import { BsTrash } from 'react-icons/bs'
import Nav from '../../components/home/nav'
import { discount } from "../../utils/discount"
import Quantity from "../../components/home/quantity"
import { increaseQuantity, decreaseQuantity, removeItem } from "../../store/reducers/cartReducer"
import { useSendPaymentMutation } from "../../store/services/paymentService"

const Cart = () => {
    const { cart, total } = useSelector(state => state.cartReducer)
    console.log(cart)
    const { userToken, user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const increase = (id) => {
        dispatch(increaseQuantity(id))
    }
    const decrease = (id) => {
        dispatch(decreaseQuantity(id))
    }
    const remove = (id) => {
        // verify user that you are really want to delete the project or item
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(removeItem(id));
        }
    }
    const [sendPayment, response] = useSendPaymentMutation()
    const pay = () => {
        if (userToken) {
            sendPayment({ cart, id: user.id })
        }
        else {
            navigate('/login')
        }
    }
    useEffect(() => {
        if (response.isSuccess) {
            console.log(response)
            window.location.href = response.data.url
        }
    }, [response])
    return (
        <>
            <Nav />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="my-container mt-28"
            >
                {cart.length > 0 ? (
                    <>
                        <div className="table-container">
                            <table className="w-full">
                                <thead>
                                    <tr className="thead-tr">
                                        <th className="th">image</th>
                                        <th className="th">name</th>
                                        <th className="th">color</th>
                                        <th className="th">size</th>
                                        <th className="th">price</th>
                                        <th className="th">quantities</th>
                                        <th className="th">total</th>
                                        <th className="th">delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((item, index) => {
                                            const total = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                discount(item.price, item.discount) * item.quantity
                                            )
                                            return (
                                                <tr className="even:bg-gray-50" key={index}>
                                                    <td className="td">
                                                        <img
                                                            src={`/images/${item.image1}`}
                                                            alt={item.title}
                                                            className="w-12 h-12 object-cover rounded-full"
                                                        />
                                                    </td>
                                                    <td className=" td font-medium">{item.title}</td>
                                                    <td className="td">
                                                        <span
                                                            className="block w-[15px] h-[15px] rounded-full"
                                                            style={{ backgroundColor: item.color }}
                                                        ></span>
                                                    </td>
                                                    <td className="td">
                                                        <span className="font-semibold">{item.size}</span>
                                                    </td>
                                                    <td className="td font-bold text-gray-900">
                                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                            discount(item.price, item.discount)
                                                        )}
                                                    </td>
                                                    <td className="td">
                                                        <Quantity
                                                            quantity={item.quantity}
                                                            increase={() => increase(item._id)}
                                                            decrease={() => decrease(item._id)}
                                                            theme="indigo"
                                                        />
                                                    </td>
                                                    <td className="td font-bold ">{total}</td>
                                                    <td className="td">
                                                        <span
                                                            className="cursor-pointer"
                                                            onClick={() => remove(item._id)}
                                                        >
                                                            <BsTrash className="text-rose-600" size={20} />
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="bg-indigo-50 p-4 flex justify-end mt-5 rounded-md">
                                <div>
                                    <span className="text-lg font-semibold text-indigo-800 mr-10">
                                        {
                                            new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total)
                                        }
                                    </span>
                                    <button
                                        className="btn bg-indigo-600 text-sm font-medium py-2.5"
                                        onClick={pay}
                                    >
                                        {"checkout"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>

                ) : (
                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-md text-sm font-medium text-indigo-800">
                        Cart is empty!
                    </div>
                )}
            </motion.div>
        </>
    )
}

export default Cart
