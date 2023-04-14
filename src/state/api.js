import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "OverallStats",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => {
        return `general/user/${id}`;
      },
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: (id) => {
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
    getGeography: build.query({
      query: () => {
        return `client/geography`;
      },
      providesTags: ["Geography"],
    }),
    getTransactions: build.query({
      query: (page, pageSize, sort, search) => ({
        url: `client/transactions`,
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getSales : build.query({
      query: () => {
        return `sales/sales`;
      },
      providesTags: ["OverallStats"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery ,
} = api;
