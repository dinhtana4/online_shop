import { useEffect, useState } from 'react'
import Wrapper from './wrapper'
import ScreenHeader from '../../components/screenHeader'
import { Link, useNavigate } from 'react-router-dom'
import { useCreateCategoryMutation } from '../../store/services/categoryService'
import { setSuccess } from '../../store/reducers/globalReducer'
import { useDispatch } from 'react-redux'

const CreateCategory = () => {
  const [state, setState] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [createCategory, response] = useCreateCategoryMutation()

  const submitCreateCategory = (e) => {
    e.preventDefault()
    createCategory({ name: state })
  }

  const errors = response?.error?.data?.errors ? response.error.data.errors : []

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response.data.msg))
      navigate('/dashboard/categories')
    }
  }, [response.isSuccess])

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className="btn-dark"><i className="bi bi-arrow-left-short"></i> categories list</Link>
      </ScreenHeader>
      <form className="w-full md:w-8/12" onSubmit={submitCreateCategory}>
        <h3 className="text-lg capitalize mb-3">create category</h3>
        {errors.length > 0 && errors.map((error, key) => (
          <p className="alert-danger" key={key}>{error.msg}</p>
        ))}
        <div className="mb-3">
          <input type="text" name="" className="form-control" placeholder="Category Name..." value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="submit" value={response.isLoading ? 'loading...' : 'create'} className="btn-indigo" />
        </div>
      </form>
    </Wrapper>
  )
}

export default CreateCategory
