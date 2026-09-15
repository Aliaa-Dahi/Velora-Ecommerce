import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const baseURL = "https://ecommerce.routemisr.com/api/v1/cart";
const getHeaders = () => ({ headers: { token: Cookies.get("token") } });

const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Stable setter — pulls the cart fields out of any API response
  const syncCart = useCallback((res) => {
    setCartData(res.data.data ?? null);
    setNumOfCartItems(res.data.numOfCartItems ?? 0);
  }, []);

  // ── Initial cart fetch ──────────────────────────────────────────────────────
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(baseURL, getHeaders())
      .then(syncCart)
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [syncCart]);

  // ── Mutations ───────────────────────────────────────────────────────────────
  const addMutation = useMutation({
    mutationFn: (productId) =>
      axios.post(baseURL, { productId }, getHeaders()),
  });

  const removeMutation = useMutation({
    mutationFn: (productId) =>
      axios.delete(`${baseURL}/${productId}`, getHeaders()),
  });

  const updateMutation = useMutation({
    mutationFn: ({ productId, count }) =>
      axios.put(`${baseURL}/${productId}`, { count }, getHeaders()),
  });

  // ── Public actions — mutateAsync so we can await and sync immediately ───────
  async function addToCart(productId) {
    try {
      const res = await addMutation.mutateAsync(productId);
      syncCart(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeFromCart(productId) {
    try {
      const res = await removeMutation.mutateAsync(productId);
      syncCart(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateCount(productId, count) {
    try {
      const res = await updateMutation.mutateAsync({ productId, count });
      syncCart(res);
    } catch (err) {
      console.log(err);
    }
  }

  // ── State helpers ────────────────────────────────────────────────────────────

  function isInCart(productId) {
    return (
      cartData?.products?.some((item) => item.product?.id === productId) ??
      false
    );
  }

  function isAddingToCart(productId) {
    return addMutation.isPending && addMutation.variables === productId;
  }

  function isRemoving(productId) {
    return removeMutation.isPending && removeMutation.variables === productId;
  }

  function isUpdating(productId) {
    return (
      updateMutation.isPending &&
      updateMutation.variables?.productId === productId
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartData,
        numOfCartItems,
        isLoading,
        isInCart,
        isAddingToCart,
        isRemoving,
        isUpdating,
        addToCart,
        removeFromCart,
        updateCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
