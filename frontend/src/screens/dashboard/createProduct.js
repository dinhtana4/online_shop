import React, { useEffect, useState } from 'react'
import { useGetAllCategoryQuery } from '../../store/services/categoryService'
import { v4 as uuidv4 } from 'uuid'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import { TwitterPicker } from "react-color"
import { useDispatch } from "react-redux"
import { Link, useParams, useNavigate } from 'react-router-dom'
import Wrapper from './wrapper';
import ScreenHeader from '../../components/screenHeader'
import Spinner from "../../components/spinner"
import Colors from "../../components/colors"
import SizesList from "../../components/sizesList"
import ImagePreview from "../../components/imagePreview";
import { setSuccess } from "../../store/reducers/globalReducer";
import { useCreateProductMutation } from '../../store/services/productService';
import StatisData from '../../data/data'

const CreateProduct = ({ initialColor }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data = [], isFetching } = useGetAllCategoryQuery()
  const [state, setState] = useState({
    title: '',
    price: 0,
    discount: 0,
    stock: 0,
    category: '',
    colors: [],
    description: '',
    image1: '',
    image2: '',
    image3: ''
  })

  const [description, setDescription] = useState('')

  const [sizeList, setSizeList] = useState([])

  const [previewImages, setPreviewImages] = useState({
    image1: '',
    image2: '',
    image3: ''
  })

  const handleInput = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const chooseColor = color => {
    const filtered = state.colors.filter(clr => clr.color !== color.hex)
    setState({ ...state, colors: [...filtered, { color: color.hex, id: uuidv4() }] })
  }

  const deleteColor = color => {
    const filtered = state.colors.filter(clr => clr.color !== color.color)
    setState({ ...state, colors: filtered })
  }

  const chooseSize = size => {
    const filtered = sizeList.filter(sz => sz.name !== size.name)
    setSizeList([...filtered, size])
  }

  const deleteSize = name => {
    const filtered = sizeList.filter(sz => sz.name !== name)
    setSizeList(filtered)
  }

  const handleImage = e => {
    if (e.target.files.length > 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImages({ ...previewImages, [e.target.name]: reader.result })
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const [createProduct, response] = useCreateProductMutation()

  const submitCreateProduct = e => {
    e.preventDefault()
    const formData = new FormData()
    setState({ ...state, description: description })
    formData.append('data', JSON.stringify(state))
    formData.append('sizes', JSON.stringify(sizeList))
    formData.append('description', JSON.stringify(description))
    formData.append('image1', state.image1)
    formData.append('image2', state.image2)
    formData.append('image3', state.image3)
    createProduct(formData)
  }

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response.data.msg))
      navigate('/dashboard/products')
    }
  }, [response.isSuccess])

  useEffect(() => {
    if (!response.isSuccess) {
      response.error?.data?.errors.map(err => {
        toast.error(err.msg)
      })
    }
  }, [response.error?.data?.errors])

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className="btn-dark"><i className="bi bi-arrow-left-short"></i> proudcts list</Link>
      </ScreenHeader>
      <Toaster position="top-right" reverseOrder={true} />
      <form className="w-full xl:w-8/12 p-3" onSubmit={submitCreateProduct}>
        <div className="flex flex-wrap">
          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="title" className="label">title</label>
            <input type="text" name="title" className="form-control" id="title" placeholder="title..." onChange={handleInput} value={state.title} />
          </div>
          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="price" className="label">price</label>
            <input type="number" name="price" className="form-control" id="price" placeholder="price..." onChange={handleInput} value={state.price} />
          </div>
          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="discount" className="label">discount</label>
            <input type="number" name="discount" className="form-control" id="discount" placeholder="discount..." onChange={handleInput} value={state.discount} />
          </div>
          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="stock" className="label">stock</label>
            <input type="number" name="stock" className="form-control" id="stock" placeholder="stock..." onChange={handleInput} value={state.stock} />
          </div>
          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="categories" className="label">categories</label>
            {!isFetching ? data?.categories?.length > 0 && <select name="category" id="categories" className="form-control" onChange={handleInput} value={state.category}>
              <option value="">Choose category</option>
              {data?.categories?.map(category => (
                <option value={category.name} key={category._id}>{category.name}</option>
              ))}
            </select> : <Spinner />}
          </div>
          <div className="w-full md:w-6/12 p-3">
            <label htmlFor="colors" className="label">choose colors</label>
            <TwitterPicker onChangeComplete={chooseColor} />
          </div>

          <div className="w-full p-3">
            <label htmlFor="sizes" className="label">choose sizes</label>
            {StatisData.Sizes.length > 0 && <div className="flex flex-wrap -mx-3">
              {StatisData.Sizes.map(size => (
                <div key={size.name} className='size' onClick={() => chooseSize(size)}>{size.name}</div>
              ))}
            </div>}
          </div>
          <div className="w-full p-3">
            <label htmlFor="image1" className="label">
              Image 1
            </label>
            <input type='file' name='image1' id='image1' className='input-file' onChange={handleImage} />
          </div>
          <div className="w-full p-3">
            <label htmlFor="image2" className="label">
              Image 2
            </label>
            <input type='file' name='image2' id='image2' className='input-file' onChange={handleImage} />
          </div>
          <div className="w-full p-3">
            <label htmlFor="image3" className="label">
              Image 3
            </label>
            <input type='file' name='image3' id='image3' className='input-file' onChange={handleImage} />
          </div>
          <div className="w-full p-3">
            <label htmlFor="description" className="label">
              Description
            </label>
            <ReactQuill theme='snow' id='description' value={description} onChange={setDescription} placeholder='Description...' />
          </div>
          <div className="w-full p-3">
            <input type="submit" value={response.isLoading ? 'loading...' : 'Save'} disabled={response.isLoading ? true : false} className="btn btn-indigo" />
          </div>
        </div>
      </form>
      <div className="w-full xl:w-4/12 p-3">
        <Colors colors={state.colors} deleteColor={deleteColor} />
        <SizesList list={sizeList} deleteSize={deleteSize} />
        <ImagePreview url={previewImages.image1} heading='image 1' />
        <ImagePreview url={previewImages.image2} heading='image 2' />
        <ImagePreview url={previewImages.image3} heading='image 3' />
      </div>
    </Wrapper>
  )
}

export default CreateProduct
