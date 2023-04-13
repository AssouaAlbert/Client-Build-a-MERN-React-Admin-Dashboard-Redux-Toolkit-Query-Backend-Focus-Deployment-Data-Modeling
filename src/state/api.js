import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ["User", "Products", "Customers"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => {
        return `general/user/${id}`;
      },
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => {
        return `client/products`;
      },
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => {
        return `client/customers`;
      },
      providesTags: ["Customers"],
    }),
  }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery } = api;
