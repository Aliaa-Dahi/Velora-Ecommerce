import { createContext, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "../Hooks/useApi";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const baseURL = "https://ecommerce.routemisr.com/api/v1/cart";
const headers = { headers: { token: Cookies.get("token") } };

function getUserCart() {
  return axios.get(baseURL, headers);
}

function addToCartApi(productId) {
  return axios.post(baseURL, { productId }, headers);
}

function removeFromCartApi(productId) {
  return axios.delete(`${baseURL}/${productId}`, headers);
}

function updateCountApi({ productId, count }) {
  return axios.put(`${baseURL}/${productId}`, { count }, headers);
}

function clearCartApi() {
  return axios.delete(baseURL, headers);
}

const CartContextProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const invalidateCart = () => queryClient.invalidateQueries({ queryKey: ["cart"] });

  const { data, isLoading: isCartLoading } = useApi("cart", 1, true);

  const cartItems = data?.data?.products ?? [];
  const totalCartPrice = data?.data?.totalCartPrice ?? 0;
  const numOfCartItems = data?.numOfCartItems ?? 0;

  const { mutate: addToCart, isPending: isAddingToCart } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: invalidateCart,
  });

  const { mutate: removeFromCart, isPending: isRemovingFromCart } = useMutation({
    mutationFn: removeFromCartApi,
    onSuccess: invalidateCart,
  });

  const { mutate: updateCount, isPending: isUpdatingCount } = useMutation({
    mutationFn: updateCountApi,
    onSuccess: invalidateCart,
  });

  const { mutate: clearCart, isPending: isClearingCart } = useMutation({
    mutationFn: clearCartApi,
    onSuccess: invalidateCart,
  });

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCartPrice,
        numOfCartItems,
        isCartLoading,
        getUserCart,
        addToCart,
        isAddingToCart,
        removeFromCart,
        isRemovingFromCart,
        updateCount,
        isUpdatingCount,
        clearCart,
        isClearingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
