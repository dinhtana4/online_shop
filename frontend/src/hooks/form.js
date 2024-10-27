import { useState } from 'react'

export const useForm = (initialState) => {
  const [state, setState] = useState(initialState)

  const onChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }

  return {
    state,
    onChange
  }
}