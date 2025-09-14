import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import App from './App.jsx'
import { ProductListing } from './pages/ProductListing.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ProductProvider } from './ProductContext.jsx'
import { ProductDetails } from './pages/ProductDetails.jsx'
import { Wishlist } from './pages/Wishlist.jsx'
import { CartPage } from './pages/CartPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/products/:productId',
    element: <ProductListing />
  },
  {
    path: '/items/:itemId',
    element: <ProductDetails />
  },
  {
    path: '/wishlist',
    element: <Wishlist />
  },
  {
    path: '/cartpage',
    element: <CartPage />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </StrictMode>,
)
