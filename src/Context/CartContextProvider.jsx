import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const baseURL = "https://ecommerce.routemisr.com/api/v1/cart";
const getHeaders = () => ({ headers: { token: Cookies.get("token") } });

function getUserCart() {
  return axios.get(baseURL, getHeaders());
}

const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Sync cart state from any mutation response
  function syncCart(res) {
    setCartData(res.data.data);
    setNumOfCartItems(res.data.numOfCartItems);
  }

  // ── Initial cart fetch ──────────────────────────────────────────────────────
  useEffect(() => {
    setIsLoading(true);
    getUserCart()
      .then(syncCart)
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  // ── Add to cart ─────────────────────────────────────────────────────────────
  const addMutation = useMutation({
    mutationFn: (productId) =>
      axios.post(baseURL, { productId }, getHeaders()),
    onSuccess: syncCart,
    onError: (err) => console.log(err),
  });

  // ── Remove item ─────────────────────────────────────────────────────────────
  const removeMutation = useMutation({
    mutationFn: (productId) =>
      axios.delete(`${baseURL}/${productId}`, getHeaders()),
    onSuccess: syncCart,
    onError: (err) => console.log(err),
  });

  // ── Update quantity ──────────────────────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: ({ productId, count }) =>
      axios.put(`${baseURL}/${productId}`, { count }, getHeaders()),
    onSuccess: syncCart,
    onError: (err) => console.log(err),
  });

  // ── Helpers exposed to consumers ────────────────────────────────────────────

  // Returns true if the product is currently in the cart
  function isInCart(productId) {
    return (
      cartData?.products?.some((item) => item.product?.id === productId) ??
      false
    );
  }

  // Returns true if this specific product is being added right now
  function isAddingToCart(productId) {
    return addMutation.isPending && addMutation.variables === productId;
  }

  function addToCart(productId) {
    addMutation.mutate(productId);
  }

  function removeFromCart(productId) {
    removeMutation.mutate(productId);
  }

  function updateCount(productId, count) {
    updateMutation.mutate({ productId, count });
  }

  // Track which item is currently being removed or updated (by productId)
  function isRemoving(productId) {
    return (
      removeMutation.isPending && removeMutation.variables === productId
    );
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
        // cart state helpers
        isInCart,
        isAddingToCart,
        isRemoving,
        isUpdating,
        // actions
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
