import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../state-manager/authSlice";

const Navbar = () => {
    const {user, isLoggedIn}= useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">

        <Link to="/" className="text-2xl font-bold">
          EcomCoderWing
        </Link>


        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          
          <Link to="/cart" className="hover:text-gray-300">
            View Cart
          </Link>
        </div>

        
        <div className="hidden md:flex space-x-4">
          
          {isLoggedIn ?<p
            onClick={()=>{dispatch(logout())
                  navigate('/login')}}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            logout
          </p>: <Link
            to="/register"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>}
        </div>


        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu.classList.toggle("hidden");
            }}
          >
            ☰
          </button>
        </div>
      </div>


      <div id="mobile-menu" className="hidden md:hidden bg-gray-700 p-4">
        <Link to="/" className="block hover:text-gray-300 mb-2">
          Home
        </Link>
        <Link to="/products" className="block hover:text-gray-300 mb-2">
          Products
        </Link>
        <Link to="/cart" className="block hover:text-gray-300 mb-2">
          View Cart
        </Link>
        <Link
          to="/login"
          className="block bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 mb-2"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="block bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;