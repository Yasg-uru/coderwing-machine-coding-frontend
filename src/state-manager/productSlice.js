import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
  cartLoading:false,

};
export const getProducts = createAsyncThunk(
  "/products/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/product/all", {
        withCredentials: true,
      });
      toast.success("produccts fetched successfully");
      
      return response.data;
    } catch (error) {
      const err = error.response.data;
      console.log("this is error :", error);
      if (err && err.message) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("something went wrong please try again later");
    }
  }
);
export const addToCart = createAsyncThunk("/products/addToCart", async (productId, {rejectWithValue})=>{
  try {
    const response = await axios.post("http://localhost:4000/product/cart",{id:productId}, {
      withCredentials: true,
    });
    toast.success("product added to your cart successfully");
    
    return response.data;
  } catch (error) {
    const err = error.response.data;
    console.log("this is error :", error);
    if (err && err.message) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
    return rejectWithValue("something went wrong please try again later");
  }
})
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state)=>{
        state.isLoading= true ;

    }).addCase(getProducts.fulfilled, (state, action)=>{
      console.log('this is products  inside slice:', action.payload)
        state.products= action.payload.products;

        state.isLoading= false;
        
    }).addCase(getProducts.rejected, (state)=>{
        state.isLoading= false;
        
    }).addCase(addToCart.fulfilled,(state, action)=>{
      state.cartLoading= false;
      
    }).addCase(addToCart.rejected,(state)=>{
      state.cartLoading= false;

    }).addCase(addToCart.pending,(state)=>{
      state.cartLoading = true ;
      
    })
  },
});
export const {} = productSlice.actions;
export default productSlice.reducer;
