import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SKU } from "../types";
import { AnyIfEmpty } from "react-redux";

interface SKUState {
  skus: SKU[];
}

const initialState: SKUState = {
  skus: [],
};

const skuSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.skus.push(action.payload);
    },
    
    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.skus.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = {
          ...state.skus[index],
          ...action.payload,
          
   
        };
      }
    },

    updateSalesUnits: (
      state,
      action: PayloadAction<{ skuId: string; weekIndex: number; salesUnits: number }>
    ) => {
      const { skuId, weekIndex, salesUnits } = action.payload;
      const sku : any = state.skus.find((sku) => sku.id === skuId);
      
      if (sku && sku.week?.[weekIndex]) {
        sku.week[weekIndex] = {
          ...sku.week[weekIndex],
          salesUnits,
        };
      }
    },

    removeSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
  },
});

export const { addSKU, updateSKU, updateSalesUnits, removeSKU } = skuSlice.actions;
export default skuSlice.reducer;
