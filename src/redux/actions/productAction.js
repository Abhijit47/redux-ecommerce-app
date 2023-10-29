import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const getAllProducts = createAsyncThunk(
  "getAllProdutcs",

  // payload creator
  async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");

      return res.data.products;

    } catch (err) {
      console.error(err);
    }
  }
);

const getProducts = createAsyncThunk("/getProducts", (async ({ cb }) => {
  try {
    const res = await axios.get("https://dummyjson.com/products");
    console.log(res);

    cb?.(res);
    return res.data.products;

  } catch (err) {
    cb?.(err);
    console.error(err.data);
  }
}));

export { getAllProducts, getProducts };