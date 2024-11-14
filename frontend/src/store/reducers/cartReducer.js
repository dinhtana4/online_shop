import { createSlice } from "@reduxjs/toolkit"
import { discount } from "../../utils/discount"
import { LocalStorageKey, ReducerApp } from "../../data/data"
const cartData = localStorage.getItem(LocalStorageKey.CART)
const cartArray = cartData ? JSON.parse(cartData) : []
function allItems(data) {
    // let items = 0
    // for (let i = 0; i < data.length; i++) {
    //     items += data[i].quantity
    // }
    // return items
    return data.reduce((accumulator, product) => accumulator + product.quantity, 0)
}
function calculateTotal(data) {
    return data.reduce((accumulator, product) => accumulator + discount(product.price, product.discount) * product.quantity, 0)
}

const cartReducer = createSlice({
    name: ReducerApp.CART,
    initialState: {
        cart: cartArray.length > 0 ? cartArray : [],
        items: cartArray.length > 0 ? allItems(cartArray) : 0,
        total: cartArray.length > 0 ? calculateTotal(cartArray) : 0
    },
    reducers: {
        addCart: (state, { payload }) => {
            state.cart.push(payload)
            state.items += payload.quantity
            state.total += discount(payload.price, payload.discount) * payload.quantity
            localStorage.setItem(LocalStorageKey.CART, JSON.stringify(state.cart))
        },
        increaseQuantity: (state, action) => {
            const findItem = state.cart.find(item => item._id === action.payload)
            if (findItem) {
                findItem.quantity += 1
                //breakpoin her to check findItem & check state.cart[index]
                state.items += 1
                state.total += discount(findItem.price, findItem.discount)
                //const index = state.cart.indexOf(findItem)
                //state.cart[index] = findItem;
                localStorage.setItem(LocalStorageKey.CART, JSON.stringify(state.cart))
            }
        },
        decreaseQuantity: (state, action) => {
            const findItem = state.cart.find(item => item._id === action.payload)
            if (findItem && findItem.quantity > 1) {
                findItem.quantity -= 1
                //breakpoin her to check findItem & check state.cart[index]
                state.items -= 1
                state.total -= discount(findItem.price, findItem.discount)
                //const index = state.cart.indexOf(findItem)
                //state.cart[index] = findItem;
                localStorage.setItem(LocalStorageKey.CART, JSON.stringify(state.cart))
            }
        },
        removeItem: (state, action) => {
            const findItem = state.cart.find(item => item._id === action.payload)
            if (findItem) {
                const index = state.cart.indexOf(findItem)
                state.items -= findItem.quantity
                state.total -= discount(findItem.price, findItem.discount) * findItem.quantity
                state.cart.splice(index, 1)
                localStorage.setItem(LocalStorageKey.CART, JSON.stringify(state.cart))
            }
        },
        emptyCart: (state) => {
            state.cart = []
            state.items = 0
            state.total = 0
            localStorage.setItem(LocalStorageKey.CART, null)
        }
    }
})

export const { addCart, increaseQuantity, decreaseQuantity, removeItem, emptyCart } = cartReducer.actions
export default cartReducer.reducer
