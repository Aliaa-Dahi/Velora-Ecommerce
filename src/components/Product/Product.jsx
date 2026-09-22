import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartShopping, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import useApi from "../../Hooks/useApi";
import { useCart } from "../../Context/CartContextProvider";

const Product = () => {
  const { addToCart, isAddingToCart, isInCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useApi("products", currentPage);

  const productList = data?.data ?? [];
  const numberOfPages = data?.metadata?.numberOfPages ?? 0;
  const totalResults = data?.results ?? 0;

  const paginationBase =
    "flex items-center justify-center text-text-muted bg-neutral-white border border-neutral-border-medium font-medium text-sm px-3 h-9 cursor-pointer transition-colors hover:bg-neutral-bg-medium hover:text-text-heading select-none";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-8">
      <div className="flex items-end justify-between mb-6">
        <SectionTitle title="All Products" />
        <p className="text-text-muted text-sm pb-1">
          <span className="font-semibold text-text-heading">{totalResults}</span> products
        </p>
      </div>

      <div className="flex flex-wrap -mx-2">
        {productList.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-5"
          >
            <Link to={"/productDetails/" + product.id}>
              <div className="group border border-neutral-border rounded-base overflow-hidden bg-neutral-white shadow-card hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    className="w-full block h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isInCart(product.id) && !isAddingToCart(product.id)) {
                        addToCart(product.id);
                      }
                    }}
                    disabled={isInCart(product.id) || isAddingToCart(product.id)}
                    className={`absolute top-2 right-2 w-9 h-9 rounded-full opacity-0 group-hover:opacity-100 shadow-md flex translate-x-3 group-hover:translate-x-0 items-center justify-center transition-all duration-300 disabled:cursor-not-allowed
                      ${isInCart(product.id)
                        ? "bg-primary text-white"
                        : "bg-white text-primary hover:bg-primary hover:text-white"
                      }`}
                    aria-label={isInCart(product.id) ? "Already in cart" : "Add to cart"}
                  >
                    {isAddingToCart(product.id) ? (
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    ) : isInCart(product.id) ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faCartShopping} />
                    )}
                  </button>

                  {/* Discount badge */}
                  {product.priceAfterDiscount && (
                    <span className="absolute top-2 left-2 bg-danger-strong text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs">
                      SALE
                    </span>
                  )}
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <p className="text-primary text-xs font-medium uppercase tracking-wide mb-1">
                    {product.category?.name}
                  </p>
                  <h2 className="text-text-heading text-sm font-semibold leading-snug mb-auto truncate">
                    {product.title?.split(" ").slice(0, 4).join(" ")}
                  </h2>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      {product.priceAfterDiscount ? (
                        <div className="flex flex-col">
                          <span className="text-text-heading font-bold text-sm">
                            {product.priceAfterDiscount} EGP
                          </span>
                          <span className="text-text-muted line-through text-xs">
                            {product.price} EGP
                          </span>
                        </div>
                      ) : (
                        <span className="text-text-heading font-bold text-sm">
                          {product.price} EGP
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      {product.ratingsAverage}
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav aria-label="Product pagination" className="mt-4 mb-8">
        <ul className="flex justify-center -space-x-px text-sm">
          <li>
            <a
              onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
              className={`${paginationBase} rounded-s-base ${
                currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </a>
          </li>

          {Array(numberOfPages)
            .fill(null)
            .map((_, index) => (
              <li key={index}>
                <a
                  onClick={() => setCurrentPage(index + 1)}
                  className={`${paginationBase} ${
                    currentPage === index + 1
                      ? "bg-primary text-white border-primary hover:bg-primary-strong hover:text-white"
                      : ""
                  }`}
                >
                  {index + 1}
                </a>
              </li>
            ))}

          <li>
            <a
              onClick={() =>
                currentPage < numberOfPages && setCurrentPage((p) => p + 1)
              }
              className={`${paginationBase} rounded-e-base ${
                currentPage === numberOfPages
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Product;
