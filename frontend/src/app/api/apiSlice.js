import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://educationcrm-api.onrender.com',
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: [],
    endpoints: builder => ({})
})