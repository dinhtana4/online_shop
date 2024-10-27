import { useEffect, useState } from 'react'
import Wrapper from './wrapper'
import ScreenHeader from '../../components/screenHeader'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useFetchCategoryQuery, useUpdateCategoryMutation } from '../../store/services/categoryService'
import { useDispatch } from 'react-redux'
import { setSuccess } from '../../store/reducers/globalReducer'

const EditCategory = () => {
  const [state, setState] = useState('')
  const { id } = useParams()
  const { data, isFetching } = useFetchCategoryQuery(id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    data?.category && setState(data.category.name)
  }, [data?.category])

  const [updateCategory, response] = useUpdateCategoryMutation()

  console.log(response)
  const errors = response?.error?.data?.errors ? response.error.data.errors : []
  const submitEditCategory = (e) => {
    e.preventDefault()
    updateCategory({ id, name: state })
  }

  useEffect(() => {
    if(response.isSuccess) {
      dispatch(setSuccess(response.data.msg))
      navigate("/dashboard/categories")
    }
  }, [response.isSuccess])

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className="btn-dark"><i className="bi bi-arrow-left-short"></i> categories list</Link>
      </ScreenHeader>
      {!isFetching && <form className="w-full md:w-8/12" onSubmit={submitEditCategory}>
        <h3 className="text-lg capitalize mb-3">Edit category</h3>
        {errors.length > 0 && errors.map((error, key) => (
          <p className="alert-danger" key={key}>{error.msg}</p>
        ))}
        <div className="mb-3">
          <input type="text" name="" className="form-control" placeholder="Category Name..." value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="submit" value={response.isLoading ? 'loading...' : 'Save'} className="btn btn-indigo" />
        </div>
      </form>}
    </Wrapper>
  )
}

export default EditCategory
