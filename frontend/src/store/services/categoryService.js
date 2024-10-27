import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const categoryService = createApi({
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/category',
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState()
            const token = reducers?.authReducer?.adminToken
            headers.set('authorization', token ? `Bearer ${token}` : '')
        }
    }),
    endpoints: (builder) => {
        return {
            createCategory: builder.mutation({
                query: (data) => {
                    return {
                        url: 'create',
                        method: 'POST',
                        body: data
                    }
                },
                //Used by mutation endpoints. Determines which cached data should be either re-fetched or removed from the cache. 
                //Expects the same shapes as providesTags.
                invalidatesTags: ['category']
            }),
            updateCategory: builder.mutation({
                query: (data) => {
                    return {
                        url: `update/${data.id}`,
                        method: 'PUT',
                        body: { name: data.name }
                    }
                },
                invalidatesTags: ['category']
            }),
            deleteCategory: builder.mutation({
                query: (id) => {
                    return {
                        url: `delete/${id}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: ['category']
            }),
            getCategory: builder.query({
                query: (page) => {
                    return {
                        url: `get/${page}`,
                        method: 'GET'
                    }
                },
                //Used by query endpoints. Determines which 'tag' is attached to the cached data returned by the query.
                providesTags: ['category']
            }),
            getAllCategory: builder.query({
                query: () => {
                    return {
                        url: 'get-all',
                        method: 'GET'
                    }
                }
            }),
            getRandomCategory: builder.query({
                query: () => {
                    return {
                        url: 'get-random',
                        method: 'GET'
                    }
                }
            }),
            fetchCategory: builder.query({
                query: (id) => {
                    return {
                        url: `fetch/${id}`,
                        method: 'GET'
                    }
                },
                providesTags: ['category']
            })
        }
    }
})

export const { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useGetCategoryQuery, useGetRandomCategoryQuery, useGetAllCategoryQuery, useFetchCategoryQuery } = categoryService

export default categoryService