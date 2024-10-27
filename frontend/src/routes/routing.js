import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import AdminLogin from '../screens/auth/adminLogin'
import Products from '../screens/dashboard/products'
import Public from './public'
import Private from './private'
import Categories from '../screens/dashboard/categories'
import Orders from '../screens/dashboard/orders'
import CreateCategory from '../screens/dashboard/createCategory'
import EditCategory from '../screens/dashboard/editCategory'
import CreateProduct from '../screens/dashboard/createProduct'
import EditProduct from '../screens/dashboard/editProduct'
import Home from '../screens/home/home'
import Login from '../screens/home/login'
import Register from '../screens/home/register'
import Dashboard from '../screens/users/dashboard'
import UserAuthRoute from './userAuthRoute'
import UserRoute from './userRoute'

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<UserAuthRoute />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>
                <Route element={<UserRoute />}>
                    <Route path='/user' element={<Dashboard />} />
                </Route>
                <Route path='auth'>
                    <Route path='admin-login' element={
                        <Public>
                            <AdminLogin />
                        </Public>} />
                </Route>
                <Route path='dashboard'>
                    <Route path='products/:page?' element={
                        <Private>
                            <Products />
                        </Private>
                    } />
                    <Route path='product'>
                        <Route path='create' element={
                            <Private>
                                <CreateProduct />
                            </Private>
                        } />
                        <Route path='edit/:id' element={
                            <Private>
                                <EditProduct />
                            </Private>
                        } />
                    </Route>
                    <Route path='categories/:page?' element={
                        <Private>
                            <Categories />
                        </Private>
                    } />
                    <Route path='category'>
                        <Route path='create' element={
                            <Private>
                                <CreateCategory />
                            </Private>
                        } />
                        <Route path='edit/:id' element={
                            <Private>
                                <EditCategory />
                            </Private>
                        } />
                    </Route>
                    <Route path='orders' element={
                        <Private>
                            <Orders />
                        </Private>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing
