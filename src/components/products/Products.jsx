import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProducts } from "../../state-manager/productSlice";
import { checkAuth, removeCarts } from "../../state-manager/authSlice";

const Products = () => {
  const dispatch = useDispatch();

  const { products, isLoading, cartLoading } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.auth);
  console.log("this is products :", products);
  console.log("this is loading : ", isLoading);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const handleRemoveFromCart = (productId) => {
    dispatch(removeCarts(productId)); // Dispatch action to remove item from cart
    dispatch(checkAuth());
  };
  const handleAddToCart = (productId) => {
    if (!productId) {
      return;
    }
    dispatch(addToCart(productId));
    dispatch(checkAuth());
  };
  const isAlreadyAddedToCart = (productId) => {
    if (user && user.carts && user.carts.length > 0) {
      return user.carts.some((cartItem) => cartItem._id === productId);
    }
    return false;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <img
            src={product.productUrl}
            alt={product.productName}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
          <p className="text-gray-600 mb-4">${product.price}</p>
          {isAlreadyAddedToCart(product._id) ? (
            <button
              onClick={() => handleRemoveFromCart(product._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(product._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
Add To Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
