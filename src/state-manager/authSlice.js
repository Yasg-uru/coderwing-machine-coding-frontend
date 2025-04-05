import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/axiosInstance";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};
export const RegisterUser = createAsyncThunk(
  "/auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const err = error.response.data;
      if (err && err.message) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("something went wrong please try again later");
    }
  }
);
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", userData, {
        withCredentials: true,
      });
    } catch (error) {}
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      }).addCase(RegisterUser.rejected,(state)=>{
        state.isLoading= false;
        state.user= null;
        state.isLoggedIn= false;
        
      });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
