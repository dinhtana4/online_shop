import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Nav from '../../components/home/nav'
import Header from '../../components/home/header'
import { Toaster } from 'react-hot-toast'
import AccountList from "../../components/home/accountList"
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const { user } = useSelector((state) => state.authReducer)
    return (
        <>
            <Nav />
            <Toaster position='top-right' reverseOrder={false} />
            <div className="mt-[70px]">
                <Header>My account</Header>
                <div className="my-container mt-[40px]">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full md:w-4/12 p-6">
                            <AccountList />
                        </div>
                        <div className="w-full md:w-8/12 p-6">
                            <h1 className="heading">name</h1>
                            <span className="block mt-3 capitalize font-medium text-sm">
                                {user?.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
