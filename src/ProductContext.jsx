import { createContext, useEffect, useState } from "react";
import useFetch from './useFetch'

const ProductContext = createContext();
export default ProductContext;

export const ProductProvider = ({ children }) => {
  const { data: category = [], loading, error } = useFetch("https://be-mp-1.vercel.app/category");

  // Safely extract all products
  const globalProducts = Array.isArray(category)
    ? category.flatMap(cat => cat.products || [])
    : [];

    // console.log(globalProducts)

    const [wishlist, setWishlist] = useState(globalProducts)
    const addToWishlist = (productId) => {
        const updatedWishItems = wishlist.map(item => {
            if(item._id == productId){
                return {...item, isAdded2: !item.isAdded2}
            } 
            else {
                return item
            }
        })
        setWishlist(updatedWishItems)
    }

    const [cartBtn, setCartBtn] = useState(globalProducts)
    const addToCart = (productId) => {
        const updatedCartItems = cartBtn.map(item => {
            if(item._id == productId){
                return {...item, isAdded: !item.isAdded}
            }
            else {
                return item
            }
        })
        setCartBtn(updatedCartItems)
    }

  return (
    <ProductContext.Provider value={{ category, wishlist, setWishlist, addToWishlist, cartBtn, setCartBtn, addToCart, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
