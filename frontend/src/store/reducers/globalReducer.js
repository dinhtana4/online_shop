import { createSlice } from '@reduxjs/toolkit'

//data will be keep across components, until refresh (F5) page
const globalReducer = createSlice({
    name: 'global',
    initialState: {
        success: '',
        searchBar: false
    },
    reducers: {
        setSuccess: (state, action) => {
            console.log('Set message')
            state.success = action.payload
        },
        clearMessage: (state) => {
            console.log('Clear messsage')
            state.success = ''
        },
        toggleSearchBar: (state) => {
            state.searchBar = !state.searchBar
        }
    }
})

export const { setSuccess, clearMessage, toggleSearchBar } = globalReducer.actions
export default globalReducer.reducer