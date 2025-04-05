import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getProducts } from "../../state-manager/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  
  const { products, isLoading } = useSelector((state) => state.product);
console.log("this is products :", products);
    console.log("this is loading : ", isLoading);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    // Dispatch an action to add the product to the cart (if cart functionality exists)
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
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;