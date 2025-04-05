import React, { useEffect } from "react";

import SignupForm from "./components/SignupForm";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/auth/loginForm";

import Products from "./components/products/Products";
import Navbar from "./components/navbar";
import Cart from "./components/products/mycarts";
import { useDispatch } from "react-redux";
import { checkAuth } from "./state-manager/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  });
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
}
export default App;
