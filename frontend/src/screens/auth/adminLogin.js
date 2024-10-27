import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthLoginMutation } from '../../store/services/authService'
import { useDispatch } from 'react-redux'
import { setAdminToken } from '../../store/reducers/authReducer'

const AdminLogin = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleInputs = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const submitLogin = e => {
    e.preventDefault()
    login(state)
  }

  const [login, response] = useAuthLoginMutation()

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem('admin-token', response.data.token)
      dispatch(setAdminToken(response.data.token))
      navigate('/dashboard/products')
    }
  }, [response.isSuccess])
  const errors = response?.error?.data?.errors ? response.error.data.errors : []
  return (
    <div className="bg-black1 h-screen flex justify-center items-center">
      <form className="bg-black2 p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded" onSubmit={submitLogin}>
        <h3 className="mb-4 text-white capitalize font-semibold text-lg">dashboard login</h3>
        {
          errors.length > 0 && errors.map((error, key) => (
            <div key={key}>
              <p className='alert-danger'>{error.message}</p>
            </div>
          ))
        }
        <div className="mb-4 mt-4">
          <input type="email" name="email" className="w-full bg-black1 p-4 rounded outline-none text-white" onChange={handleInputs} value={state.email} placeholder="Enter email..." />
        </div>
        <div className="mb-4">
          <input type="password" name="password" className="w-full bg-black1 p-4 rounded outline-none text-white" onChange={handleInputs} value={state.password} placeholder="Enter password..." />
        </div>
        <div className="mb-4">
          <input type="submit" value={response.isLoading ? 'loading...' : 'sign in'} className="bg-indigo-600 w-full p-4 rounded text-white uppercase font-semibold cursor-pointer" />
        </div>
      </form>
    </div>
  )
}

export default AdminLogin