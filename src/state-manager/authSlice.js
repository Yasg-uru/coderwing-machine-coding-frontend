import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../helper/axiosInstance";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};
export const checkAuth = createAsyncThunk("/auth/check", async ()=>{
  try {
    const response = await axios.get("http://localhost:4000/user/check-auth", {
      withCredentials:true 
    });
    toast.success("auth checked successfully ")
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
export const RegisterUser = createAsyncThunk(
  "/auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        userData,
        {
          withCredentials: true,
        }
      );
      toast.success("User registered successfully");
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
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/user/login",
        userData,
        {
          withCredentials: true,
        }
      );
      toast.success("Login successful");
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
      })
      .addCase(RegisterUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      }).addCase(checkAuth.fulfilled, (state, action)=>{
        state.user= action.payload.user;
        state.isLoggedIn= true ;
        state.isLoading= false;
        
      }).addCase(checkAuth.pending,(state)=>{
        state.isLoading= true;
        

      }).addCase(checkAuth.rejected, (state)=>{
        state.isLoading= false;
        state.isLoggedIn = false ;
        state.user= null;

      })
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
