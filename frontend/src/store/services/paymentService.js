import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const paymentService = createApi({
    reducerPath: 'payment',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/payment',
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState()
            const token = reducers?.authReducer?.userToken
            headers.set('authorization', token ? `Bearer ${token}` : '')
        }
    }),
    endpoints: (builder) => {
        return {
            sendPayment: builder.mutation({
                query: (data) => {
                    return {
                        url: 'create-checkout-session',
                        method: 'POST',
                        body: data
                    }
                }
            }),
            verifyPayment: builder.query({
                query: (id) => {
                    return {
                        url: `verify=payment/${id}`,
                        method: 'GET'
                    }
                }
            })
        }
    }
})

export const { useSendPaymentMutation, useVerifyPaymentQuery } = paymentService

export default paymentService