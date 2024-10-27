import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const productService = createApi({
    reducerPath: 'product',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/product',
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState()
            const token = reducers?.authReducer?.adminToken
            headers.set('authorization', token ? `Bearer ${token}` : '')
        }
    }),
    endpoints: (builder) => {
        return {
            createProduct: builder.mutation({
                query: (data) => {
                    return {
                        url: 'create',
                        method: 'POST',
                        body: data
                    }
                },
                //Used by mutation endpoints. Determines which cached data should be either re-fetched or removed from the cache. 
                //Expects the same shapes as providesTags.
                invalidatesTags: ['product']
            }),
            updateProduct: builder.mutation({
                query: (data) => {
                    return {
                        url: `update`,
                        method: 'PUT',
                        body: data
                    }
                },
                invalidatesTags: ['product']
            }),
            deleteProduct: builder.mutation({
                query: (id) => {
                    return {
                        url: `delete/${id}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: ['product']
            }),
            getProduct: builder.query({
                query: (page) => {
                    return {
                        url: `get/${page}`,
                        method: 'GET'
                    }
                },
                //Used by query endpoints. Determines which 'tag' is attached to the cached data returned by the query.
                providesTags: ['product']
            }),
            fetchProduct: builder.query({
                query: (id) => {
                    return {
                        url: `fetch/${id}`,
                        method: 'GET'
                    }
                },
                providesTags: ['product']
            })
        }
    }
})

export const { useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useGetProductQuery, useFetchProductQuery } = productService

export default productService