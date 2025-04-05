import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    
    const [formData , setFormData] = useState({
        username :"",
        email:"",
        password:""
    });


    const handleSubmit = (e)=>{
        e.preventDefault();

    }
  return (
    <div>
      
    </div>
  )
}

export default Login
