import React from 'react';

import SignupForm from './components/SignupForm';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/register" element= {<SignupForm/>} />
    </Routes>
  )
}
export default App
