import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const baseURL = "https://ecommerce.routemisr.com/api/v1/cart";
const headerOption = { headers: { token: Cookies.get("token") } };

function getUserCart() {
  return axios.get(baseURL, headerOption);
}

function addToCartApi(productId) {
  return axios.post(baseURL, { productId }, headerOption);
}

function clearUserCart(productId) {
  return axios.delete(`${baseURL}/${productId}`, headerOption);
}

function updateCountApi({ productId, count }) {
  return axios.put(`${baseURL}/${productId}`, { count }, headerOption);
}

const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserCart()
      .then((req) => {
        setCartData(req.data.data);
        setNumOfCartItems(req.data.numOfCartItems);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  async function addToCart(productId) {
    setIsAddingToCart(true);
    await addToCartApi(productId)
      .then((res) => {
        setCartData(res.data.data);
        setNumOfCartItems(res.data.numOfCartItems);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsAddingToCart(false));
  }

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        numOfCartItems,
        setNumOfCartItems,
        isLoading,
        setIsLoading,
        isAddingToCart,
        getUserCart,
        addToCart,
        clearUserCart,
        updateCountApi,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
