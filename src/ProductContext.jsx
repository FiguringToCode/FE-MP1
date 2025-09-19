import { createContext } from "react";
import useFetch from "./useFetch";
import { useState } from "react";

const ProductContext = createContext();
export default ProductContext;

export const ProductProvider = ({ children }) => {
  const { data: category = [], loading, error } = useFetch(
    "https://be-mp-1.vercel.app/category"
  );

  const globalProducts = Array.isArray(category)
    ? category.flatMap((cat) => cat.products || [])
    : [];


  const [wishlist, setWishlist] = useState([]);
  const [cartBtn, setCartBtn] = useState([]);

  const addToWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId) // remove if already added
        : [...prev, productId] // add if not present
    );
  };

  const addToCart = (productId) => {
    setCartBtn((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter(id => id !== productId));
  };

  const removeFromCart = (productId) => {
    setCartBtn((prev) => prev.filter(id => id !== productId) )
  }

  const [quantity, setQuantity] = useState({})


  return (
    <ProductContext.Provider
      value={{
        category,
        globalProducts,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        cartBtn,
        addToCart,
        removeFromCart,
        quantity, 
        setQuantity,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
