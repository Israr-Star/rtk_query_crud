import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface bookType {
  id: number
  title: string
  author: string
  isSold: boolean
}

export const bookApi = createApi({
  reducerPath: 'book',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:6006',
  }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBook: builder.query({
      query: () => '/posts',
      transformResponse: (res: any) =>
        res.sort((a: any, b: any) => b.id - a.id),
      providesTags: ['Book'],
    }),
    addBook: builder.mutation({
      query: (payload) => ({
        url: '/posts',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation({
      query: (payload) => ({
        url: `/posts/${payload.id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Book'],
    }),
    deteteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Book'],
    }),
  }),
})

export const {
  useGetBookQuery,
  useDeteteBookMutation,
  useUpdateBookMutation,
  useAddBookMutation,
} = bookApi
