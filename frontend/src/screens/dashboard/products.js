import React, { useEffect } from 'react'
import Wrapper from './wrapper'
import ScreenHeader from '../../components/screenHeader'
import { Link, useParams } from 'react-router-dom'
import { useDeleteProductMutation, useGetProductQuery } from '../../store/services/productService'
import Spinner from '../../components/spinner'
import Pagination from '../../components/pagination'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, setSuccess } from '../../store/reducers/globalReducer'

const Products = () => {
  let { page } = useParams()
  if (!page) {
    page = 1
  }

  const dispatch = useDispatch()

  const { success } = useSelector(state => state.globalReducer)

  const { data = [], isFetching } = useGetProductQuery(page)

  const [deleteProduct, response] = useDeleteProductMutation()

  const clickDeleteProduct = (id) => {
    if (window.confirm('Are you really want to delete the product?')) {
      deleteProduct(id)
    }
  }

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response.data.msg))
    }
  }, [response.isSuccess])

  useEffect(() => {
    //dispatch(clearMessage()) runs when the component unmounts (cleanup).
    return () => {
      if (!isFetching) {
        dispatch(clearMessage())
      }
    }
  }, [])
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to='/dashboard/product/create' className='btn-dark'>create product <i className='bi bi-plus'></i></Link>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
      {!isFetching ? data?.products?.length > 0 && <><div>
        <table className="w-full bg-gray-900 rounded-md">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
              <th className="p-3 uppercase text-sm font-medium text-gray-500">price</th>
              <th className="p-3 uppercase text-sm font-medium text-gray-500">stock</th>
              <th className="p-3 uppercase text-sm font-medium text-gray-500">image</th>
              <th className="p-3 uppercase text-sm font-medium text-gray-500">edit</th>
              <th className="p-3 uppercase text-sm font-medium text-gray-500">delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map(product => (
              <tr key={product._id} className="odd:bg-gray-800">
                <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.title}</td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400">${product.price}.00</td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.stock}</td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400">
                  <img src={`/images/${product.image1}`} alt="image name" className="w-20 h-20 rounded-md object-cover" />
                </td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={`/dashboard/product/edit/${product._id}`} className="btn btn-warning">edit</Link></td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400"><span className="btn btn-danger cursor-pointer" onClick={() => clickDeleteProduct(product._id)}>delete</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <Pagination page={parseInt(page)} perPage={data.perPage} count={data.count} path="dashboard/categories" /></> : <Spinner />}
    </Wrapper>
  )
}

export default Products
