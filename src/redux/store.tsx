import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";
import skuReducer from "./skuSlice";
import weekReducer from "./weekSalesSlice";

const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
    weekSales: weekReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
