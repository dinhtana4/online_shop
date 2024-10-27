import React, { useEffect } from 'react'
import Wrapper from './wrapper'
import ScreenHeader from '../../components/screenHeader'
import { Link, useParams } from 'react-router-dom'
import { useDeleteCategoryMutation, useGetCategoryQuery } from '../../store/services/categoryService'
import Spinner from '../../components/spinner'
import Pagination from '../../components/pagination'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, setSuccess } from '../../store/reducers/globalReducer'

const Categories = () => {
  let { page } = useParams()
  if (!page) {
    page = 1
  }

  const dispatch = useDispatch()

  const { success } = useSelector(state => state.globalReducer)

  const { data = [], isFetching } = useGetCategoryQuery(page)

  const [deleteCategory, response] = useDeleteCategoryMutation()

  const clickDeleteCategory = (id) => {
    if (window.confirm('Are you really want to delete the category?')) {
      deleteCategory(id)
    }
  }

  useEffect(() => {
    if(response.isSuccess) {
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
        <Link to='/dashboard/category/create' className='btn-dark'>add category <i className='bi bi-plus'></i></Link>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
      {!isFetching ? data?.categories?.length > 0 && <><div>
        <table className="w-full bg-gray-900 rounded-md">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
              <th className="p-3 uppercase text-sm font-medium text-gray-500">edit</th>
              <th className="p-3 uppercase text-sm font-medium text-gray-500">delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.categories?.map(category => (
              <tr key={category._id} className="odd:bg-gray-800">
                <td className="p-3 capitalize text-sm font-normal text-gray-400">{category.name}</td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={`/dashboard/category/edit/${category._id}`} className="btn btn-warning">edit</Link></td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400"><button className="btn btn-danger" onClick={() => clickDeleteCategory(category._id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <Pagination page={parseInt(page)} perPage={data.perPage} count={data.count} path="dashboard/categories" /></> : <Spinner />}
    </Wrapper>
  )
}

export default Categories
