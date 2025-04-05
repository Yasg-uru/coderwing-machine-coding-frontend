import React from 'react';

import SignupForm from './components/SignupForm';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/auth/loginForm';

import Products from './components/products/Products';

function App() {
  return (
    <Routes>
      <Route path="/products" element={<Products/>} />
      <Route path="/register" element= {<SignupForm/>} />
      <Route path = "/login" element= {<LoginForm/>} />
    </Routes>
  )
}
export default App
