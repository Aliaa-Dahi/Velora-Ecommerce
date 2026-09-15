import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Notfound from "./components/Notfound/Notfound";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./Context/CartContextProvider";
import ShippingDetails from "./components/ShippingDetails/ShippingDetails";

const client = new QueryClient();

function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      Component: Layout,
      children: [
        // guest routes — accessible without a token
        { path: "login", Component: Login },
        { path: "register", Component: Signup },
        { path: "forgetPassword", Component: ForgetPassword },
        { path: "updatePassword", Component: UpdatePassword },

        // protected routes — require a token
        {
          Component: ProtectedRoutes,
          children: [
            { index: true, Component: Home },
            { path: "product", Component: Product },
            { path: "cart", Component: Cart },
            { path: "updatePassword", Component: UpdatePassword },
            { path: "forgetPassword", Component: ForgetPassword },
            { path: "productDetails/:id", Component: ProductDetails },
            { path: "shippingDetails/:id", Component: ShippingDetails },
          ],
        },

        { path: "*", Component: Notfound },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={client}>
      <CartContextProvider>
        <RouterProvider router={routes} />
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;
