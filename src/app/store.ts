import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/criptoApi";
import { cryptoNewsApi } from "../services/newsApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      cryptoApi.middleware,
      cryptoNewsApi.middleware,
    ]),
});
