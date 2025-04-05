import React from 'react';

import SignupForm from './components/SignupForm';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/auth/loginForm';

function App() {
  return (
    <Routes>
      <Route path="/register" element= {<SignupForm/>} />
      <Route path = "/login" element= {<LoginForm/>} />
    </Routes>
  )
}
export default App
