import { configureStore } from "@reduxjs/toolkit"
import authReducer from './reducers/authReducer'
import globalReducer from './reducers/globalReducer'
import authService from "./services/authService"
import categoryService from "./services/categoryService";
import productService from "./services/productService";
import cartReducer from "./reducers/cartReducer";

const Store = configureStore({ 
    reducer: {
        [authService.reducerPath]: authService.reducer,
        [categoryService.reducerPath]: categoryService.reducer,
        [productService.reducerPath]: productService.reducer,
        authReducer: authReducer,
        globalReducer: globalReducer,
        cartReducer: cartReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([
            authService.middleware,
            categoryService.middleware,
            productService.middleware
        ])
})

export default Store;