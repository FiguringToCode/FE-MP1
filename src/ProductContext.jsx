import { createContext } from "react";
import useFetch from './useFetch'

const ProductContext = createContext()
export default ProductContext



export const ProductProvider = ({children}) => {
    const {data: category, loading, error} = useFetch("https://be-mp-1.vercel.app/category")
    // console.log(category)
    

    return (
        <ProductContext.Provider value={{category, loading, error}}>
            {children}
        </ProductContext.Provider>
    )
}