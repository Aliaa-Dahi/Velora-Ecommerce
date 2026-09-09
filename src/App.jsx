import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Product from './components/Product/Product'
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';


function App() {
let routes = createBrowserRouter([
  {path: '', 
    Component: Layout, 
    children: [
      {index: true, Component: Product}, 
      {path: 'product', Component: Product}, 
      {path: 'cart', Component: Cart},
      {path: 'login', Component: Login}, 
      {path: 'register', Component: Signup}, 
    ]
  }
])
  return (
   <>
   <RouterProvider router={routes}></RouterProvider>
   </>
  )
}

export default App
