import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeekSales {
  id: string;
  skuId: string;
  week: number;
  salesUnits: number;
  cost: number;
  price: number;
  storeId : string;
}

interface WeekSalesState {
  weekSales: WeekSales[];
}

const initialState: WeekSalesState = {
  weekSales: [],
};

const weekSalesSlice = createSlice({
  name: "weekSales",
  initialState,
  reducers: {
    updateWeekSales: (state, action: PayloadAction<WeekSales>) => {
      const index = state.weekSales.findIndex(
        (sale) => sale.skuId === action.payload.skuId && sale.week === action.payload.week
      );

      if (index !== -1) {
        state.weekSales[index] = action.payload;
      } else {
        state.weekSales.push(action.payload);
      }
    },
  },
});

export const { updateWeekSales } = weekSalesSlice.actions;
export default weekSalesSlice.reducer;
