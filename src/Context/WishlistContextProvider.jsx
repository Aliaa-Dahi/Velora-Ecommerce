import { createContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  let { token } = useSelector((state) => state.auth);
  let  addMutation = useMutation({
    mutationFn: (productId) =>
      axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers: { token: token } }
      ),
  })
  
  async function addToWishlist(productId) {
    try {
      const res = await addMutation.mutateAsync(productId);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <WishlistContext.Provider value={{ addToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
