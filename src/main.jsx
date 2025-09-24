import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import { ProductListing } from './pages/ProductListing.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ProductProvider } from './ProductContext.jsx'
import { ProductDetails } from './pages/ProductDetails.jsx'
import { Wishlist } from './pages/Wishlist.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { ToastContainer } from 'react-toastify'
 

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
  },
  {
    path: '/user',
    element: <UserProfile />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ProductProvider>
  </StrictMode>,
)
