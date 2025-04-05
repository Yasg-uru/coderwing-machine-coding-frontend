import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/axiosInstance";
const initialState= {
    
}
const productSlice = createSlice({
    name:"product",
    initialState
    ,
    reducers:{},
    extraReducers:(builder)=>{

    }

})
;
export const {} = productSlice.actions;
export default productSlice.reducer;
