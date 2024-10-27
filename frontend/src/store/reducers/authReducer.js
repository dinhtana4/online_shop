import { createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from 'jwt-decode'
function verifyToken(keyName) {
    const storage = localStorage.getItem(keyName)
    if (storage) {
        const decodeToken = jwtDecode(storage)
        const expiresIn = new Date(decodeToken.exp * 1000)
        if (expiresIn < new Date()) {
            localStorage.removeItem(keyName)
            return null
        }
        return storage
    }
    else {
        return null
    }
}

const authReducer = createSlice({
    name: 'authReducer',
    initialState: {
        adminToken: verifyToken('admin-token'),
        userToken: verifyToken('user-token'),
        user: verifyToken('user-token') ? jwtDecode(verifyToken('user-token')) : null
    },
    reducers: {
        setAdminToken: (state, action) => {
            state.adminToken = action.payload
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload
            state.user = jwtDecode(action.payload)
        },
        logout: (state, action) => {
            localStorage.removeItem(action.payload)
            if (action.payload === 'admin-token') {
                state.adminToken = null
            }
            else {
                state.userToken = null
                state.user = null
            }
        }
    }
})

export const { setAdminToken, setUserToken, logout } = authReducer.actions
export default authReducer.reducer