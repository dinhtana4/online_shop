import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSearchBar } from '../../store/reducers/globalReducer'
import { FiSearch } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Search = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const searchRef = useRef(null)
    const [state, setState] = useState('')
    const { searchBar } = useSelector((state) => state.globalReducer)
    useEffect(() => {
        if(searchBar) {
            searchRef.current.focus()
        }
    }, [searchBar])
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            clickSearchProducts(e)
        }
    }
    const clickCloseSearch = (e) => {
        const id = e.target.getAttribute('id')
        id === 'search' && dispatch(toggleSearchBar())
    }
    const clickSearchProducts = (e) => {
        if (!state) {
            return
        }
        dispatch(toggleSearchBar())
        navigate(`/search-products/${state}/1`)
    }
    return (
        searchBar && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 w-full h-full bg-black/50 z-[300]"
                id="search"
                onClick={clickCloseSearch}
            >
                <div className="flex -mx-8 justify-center">
                    <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 px-8 mt-10 relative">
                        <input
                            ref={searchRef}
                            type="text"
                            name=""
                            id=""
                            className="w-full bg-white h-[50px] rounded outline-none pl-5 pr-14"
                            placeholder="Search products...."
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <FiSearch
                            className="absolute top-[13px] right-12 text-2xl text-gray-500 cursor-pointer"
                            onClick={clickSearchProducts}
                        />
                    </div>
                </div>
            </motion.div>
        )
    )
}

export default Search
