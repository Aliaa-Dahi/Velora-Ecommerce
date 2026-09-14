import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContextProvider";

const Cart = () => {
  const {
    cartData,
    numOfCartItems,
    isLoading,
    clearUserCart,
    updateCountApi,
    setCartData,
    setNumOfCartItems,
    getUserCart,
  } = useCart();

  const products = cartData?.products ?? [];
  const totalCartPrice = cartData?.totalCartPrice ?? 0;

  async function handleRemove(productId) {
    await clearUserCart(productId);
    const req = await getUserCart();
    setCartData(req.data.data);
    setNumOfCartItems(req.data.numOfCartItems);
  }

  async function handleUpdateCount(productId, count) {
    await updateCountApi({ productId, count });
    const req = await getUserCart();
    setCartData(req.data.data);
    setNumOfCartItems(req.data.numOfCartItems);
  }


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loader"></span>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="w-11/12 mx-auto py-8">
        <SectionTitle title="Shop Cart" />
        <div className="flex flex-col items-center justify-center py-20 text-text-muted gap-4">
          <FontAwesomeIcon icon={faShoppingBag} className="text-5xl text-neutral-border" />
          <p className="text-lg font-medium">Your cart is empty</p>
          <Link to="/" className="text-primary text-sm hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-8">
      <SectionTitle title="Shop Cart" />

      {/* Summary bar */}
      <div className="flex items-center justify-between mb-6 bg-neutral-bg-soft border border-neutral-border rounded-base px-5 py-3">
        <p className="text-text-muted text-sm">
          <span className="font-semibold text-text-heading">{numOfCartItems}</span>{" "}
          item{numOfCartItems !== 1 ? "s" : ""} in cart
        </p>
        <p className="text-primary font-bold text-base">
          Total: {totalCartPrice.toLocaleString()} EGP
        </p>
      </div>

      {/* Cart items */}
      <div className="flex flex-col gap-3">
        {products.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 bg-neutral-white border border-neutral-border rounded-base px-4 py-3 shadow-card"
          >
            <Link to={`/productDetails/${item.product.id}`} className="shrink-0">
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded-base border border-neutral-border hover:opacity-90 transition-opacity"
              />
            </Link>

            <div className="flex-1 min-w-0">
              <p className="text-primary text-xs font-medium uppercase tracking-wide mb-0.5">
                {item.product.category?.name}
              </p>
              <Link to={`/productDetails/${item.product.id}`}>
                <h3 className="text-text-heading text-sm font-semibold leading-snug mb-1 truncate hover:text-primary transition-colors">
                  {item.product.title}
                </h3>
              </Link>
              <p className="text-text-muted text-sm font-medium">
                {item.price.toLocaleString()} EGP
                <span className="font-normal"> × {item.count}</span>
                <span className="ml-2 font-bold text-text-heading">
                  = {(item.price * item.count).toLocaleString()} EGP
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="flex items-center border border-neutral-border rounded-base overflow-hidden">
                <button
                  onClick={() => handleUpdateCount(item.product.id, item.count - 1)}
                  disabled={item.count <= 1}
                  className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors text-sm font-bold border-r border-neutral-border disabled:opacity-40"
                >
                  -
                </button>
                <span className="text-text-heading font-semibold text-sm w-8 text-center">
                  {item.count}
                </span>
                <button
                  onClick={() => handleUpdateCount(item.product.id, item.count + 1)}
                  className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors text-sm font-bold border-l border-neutral-border"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.product.id)}
                className="flex items-center gap-1.5 text-danger-strong text-xs hover:underline whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faTrashCan} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-border pt-6">
        <div>
          <p className="text-text-muted text-sm">Order total</p>
          <p className="text-text-heading text-2xl font-bold">
            {totalCartPrice.toLocaleString()} EGP
          </p>
        </div>
        <button className="w-full sm:w-auto bg-primary hover:bg-primary-strong text-white font-medium text-sm px-10 py-3 rounded-base transition-colors shadow-xs">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
