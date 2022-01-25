import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// var options = {
//   method: "GET",
//   url: "https://bing-news-search1.p.rapidapi.com/news",
//   params: { safeSearch: "Off", textFormat: "Raw" },
//   headers: {
//     "x-bingapis-sdk": "true",
//     "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
//     "x-rapidapi-key": "463aefa669msh7155316e362b2a6p115927jsn4f647fe58aa3",
//   },
// };

const newsApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "463aefa669msh7155316e362b2a6p115927jsn4f647fe58aa3",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

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
