import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": process.env.REACT_APP_NEWS_API_HOST,
  "x-rapidapi-key": process.env.REACT_APP_NEWS_API_KEY,
};

const baseUrl = process.env.REACT_APP_NEWS_API_BASE_URL;

const createRequest = (url: any) => ({
  url,
  headers: newsApiHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});
export const { useGetCryptoNewsQuery } = cryptoNewsApi;
