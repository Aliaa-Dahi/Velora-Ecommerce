import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SectionTitle from "../SectionTitle/SectionTitle";

const cartItems = [
  { id: 1, title: "Woman Bordeaux Long Sleeve Blouse BORDEAUX", price: 499, qty: 3, img: "https://ecommerce.routemisr.com/Route-Academy-products/1680401893316-cover.jpeg" },
  { id: 2, title: "Adicolor Classics Beckenbauer Primeblue Track Top", price: 2379, qty: 2, img: "https://ecommerce.routemisr.com/Route-Academy-products/1680399913757-cover.jpeg" },
  { id: 3, title: "Woman Shawl", price: 349, qty: 2, img: "https://ecommerce.routemisr.com/Route-Academy-products/1680401893316-cover.jpeg" },
  { id: 4, title: "NSW Everyday Essentials No-Show Socks (Pack of 3) White/Black", price: 1079, qty: 2, img: "https://ecommerce.routemisr.com/Route-Academy-products/1680399913757-cover.jpeg" },
  { id: 5, title: "Crew Neck Long Sleeve Men's Tricot Sweater with Color Block", price: 549, qty: 1, img: "https://ecommerce.routemisr.com/Route-Academy-products/1680401893316-cover.jpeg" },
];



const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

const Cart = () => {
  return (
    <div className="w-11/12 mx-auto py-8">
      <SectionTitle title="Shop Cart" />

      {/* Total */}
      <p className="text-primary font-semibold mb-6">
        Total Cart Price : {totalPrice.toLocaleString()} EGP
      </p>

      {/* Cart items */}
      <div className="flex flex-col gap-3">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-neutral-bg-soft border border-neutral-border rounded-base px-4 py-3"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-base shrink-0 border border-neutral-border"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-text-heading text-sm font-medium leading-snug mb-1 truncate">
                {item.title}
              </h3>
              <p className="text-primary text-sm font-semibold mb-2">
                price : {item.price.toLocaleString()}
              </p>
              <button className="flex items-center gap-1.5 text-danger-strong text-xs hover:underline">
                <FontAwesomeIcon icon={faTrashCan} />
                Remove
              </button>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button className="w-7 h-7 flex items-center justify-center border border-primary text-primary rounded-xs hover:bg-primary hover:text-white transition-colors text-sm font-bold">
                +
              </button>
              <span className="text-text-heading font-semibold text-sm w-4 text-center">
                {item.qty}
              </span>
              <button className="w-7 h-7 flex items-center justify-center border border-primary text-primary rounded-xs hover:bg-primary hover:text-white transition-colors text-sm font-bold">
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout button */}
      <div className="mt-8 flex justify-end">
        <button className="bg-primary hover:bg-primary-strong text-white font-medium text-sm px-8 py-3 rounded-base transition-colors shadow-xs">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
