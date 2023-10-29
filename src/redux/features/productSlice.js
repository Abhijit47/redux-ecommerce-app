import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../actions/productAction";

let initialState = {
  isLoading: false,
  isError: false,
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });

    builder.addCase(getAllProducts.rejected, (state) => {
      state.isError = true;
    });
  }
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
