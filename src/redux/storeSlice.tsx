import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types";

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },

    updateStore: (state, action: PayloadAction<Store>) => {
      state.stores = state.stores.map((store) =>
        store.id === action.payload.id ? action.payload : store
      );
    },

    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter(
        (store) => store.id !== action.payload
      );
    },

    reorderStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    },
  },
});

export const { addStore, updateStore, deleteStore, reorderStores } =
  storeSlice.actions;
export default storeSlice.reducer;
