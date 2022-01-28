import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_CRYPTO_API_HOST,
  "x-rapidapi-key": process.env.REACT_APP_API_KEY,
};
const baseUrl = process.env.REACT_APP_CRYPTO_API_BASE_URL;
const createRequest = (url: any) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (arg) => createRequest(`/coins?limit=${arg}`),
    }),
    getCryptoDetails: builder.query({
      query: (arg) => createRequest(`/coin/${arg}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ timeperiod, id }) =>
        createRequest(`/coin/${id}/history?timePeriod=${timeperiod}`),
    }),
    getCryptoExchanges: builder.query({
      query: (uuid) => createRequest(`/coin/${uuid}/exchanges?limit=20`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoExchangesQuery,
} = cryptoApi;
