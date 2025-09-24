import { createContext } from "react";
import useFetch from "./useFetch";
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { toast } from "react-toastify";

const ProductContext = createContext();
export default ProductContext;


export const ProductProvider = ({ children }) => {
  const { data: category = [], loading, error } = useFetch(
    "https://be-mp-1.vercel.app/category"
  );

  const globalProducts = Array.isArray(category)
    ? category.flatMap((cat) => cat.products || [])
    : [];


  const [wishlist, setWishlist] = useLocalStorage("", []);
  const [cartBtn, setCartBtn] = useLocalStorage("", []);

  const addToWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? (toast.success("Removed from Wishlist"), prev.filter((id) => id !== productId)) // remove if already added
        : (toast.success("Added to Wishlist"), [...prev, productId]) // add if not present
    );
    toast.success("Added to Wishlist")
  };

  const addToCart = (productId) => {
    setCartBtn((prev) =>
      prev.includes(productId) 
        ? (toast.success("Removed from Cart"), prev.filter((id) => id !== productId))
        : (toast.success("Added to Cart"), [...prev, productId])
    );
  };
  

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter(id => id !== productId));
    toast.success("Removed from Wishlist")
  };

  const removeFromCart = (productId) => {
    setCartBtn((prev) => prev.filter(id => id !== productId) )
    toast.success("Removed from Cart")
  }

  const [quantity, setQuantity] = useLocalStorage("", {})

  const [address, setAddress] = useLocalStorage("addressForm", [])


  return (
    <ProductContext.Provider
      value={{
        category,
        globalProducts,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        cartBtn,
        setCartBtn,
        addToCart,
        removeFromCart,
        quantity, 
        setQuantity,
        address,
        setAddress,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
