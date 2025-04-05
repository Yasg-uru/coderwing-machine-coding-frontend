import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCarts } from "../../state-manager/authSlice";

const Cart = () => {
    const dispatch = useDispatch();
    
  const { user, isLoading } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (user && user.carts && user.carts.length>0) {
      setCartItems(user.carts);
    }
  }, [user]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeCarts(productId)); // Dispatch action to remove item from cart
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={item.productUrl}
                alt={item.productName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{item.productName}</h3>
              <p className="text-gray-600 mb-4">${item.price}</p>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
