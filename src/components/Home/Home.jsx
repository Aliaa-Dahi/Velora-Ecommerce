import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartShopping, faCheck, faSpinner, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import BrandsSlider from "../BrandsSlider/BrandsSlider";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import useApi from "../../Hooks/useApi";
import { useCart } from "../../Context/CartContextProvider";
import Loader from "../Loader.jsx/Loader";

const PREVIEW_COUNT = 6;

const Home = () => {
  const { addToCart, isAddingToCart, isInCart } = useCart();
  const { data, isLoading } = useApi("products");

  // Show only the first N products as a preview
  const productList = (data?.data ?? []).slice(0, PREVIEW_COUNT);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-11/12 mx-auto py-6">
          {/* Hero */}
          <MainSlider />

          {/* Categories */}
          <CategorySlider />

          {/* Featured Products */}
          <div className="flex items-center justify-between mb-4">
            <SectionTitle title="Featured Products" className="mb-0" />
            <Link
              to="/product"
              className="flex items-center gap-1.5 text-primary text-sm font-medium hover:text-primary-strong transition-colors"
            >
              View All
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>

          <div className="flex flex-wrap -mx-2 mb-6">
            {productList.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/12 px-2 mb-5"
              >
                <Link to={"/productDetails/" + product.id}>
                  <div className="group border border-neutral-border rounded-base overflow-hidden bg-neutral-white shadow-card hover:shadow-md transition-shadow duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        className="w-full block h-44 object-cover transition-transform duration-300 group-hover:scale-105"
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
                    </div>
                    <div className="p-3">
                      <p className="text-primary text-xs font-medium uppercase tracking-wide mb-1">
                        {product.category?.name}
                      </p>
                      <h2 className="text-text-heading text-sm font-semibold leading-snug mb-2 truncate">
                        {product.title?.split(" ").slice(0, 3).join(" ")}
                      </h2>
                      <div className="flex justify-between items-center">
                        <span className="text-text-heading font-bold text-sm">
                          {product.price} EGP
                        </span>
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

          {/* View all CTA */}
          <div className="flex justify-center mb-10">
            <Link
              to="/product"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-strong text-white font-medium text-sm px-8 py-2.5 rounded-base transition-colors shadow-xs"
            >
              Browse All Products
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>

          {/* Brands */}
          <BrandsSlider />
        </div>
      )}
    </>
  );
};

export default Home;
