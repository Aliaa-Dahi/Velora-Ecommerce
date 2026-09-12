import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from '../CategorySlider/CategorySlider';
import SectionTitle from "../SectionTitle/SectionTitle";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  function getAllProducts(page = 1) {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=12`)
      .then((res) => {
        setNumberOfPages(res.data.metadata.numberOfPages);
        setCurrentPage(page);
        setProductList(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const paginationBase =
    "flex items-center justify-center text-text-muted bg-neutral-white border border-neutral-border-medium font-medium text-sm px-3 h-9 cursor-pointer transition-colors hover:bg-neutral-bg-medium hover:text-text-heading select-none";

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-11/12 mx-auto py-6">
          {/* Slider */}
          <MainSlider />
          <CategorySlider />

          {/* Product grid */}
          <SectionTitle title="Featured Products" subtitle="Explore our latest arrivals" />
          <div className="flex flex-wrap -mx-2">
            {productList?.map((product) => (
              <div key={product.id} className="w-2/12 px-2 mb-5">
                <div className="group border border-neutral-border rounded-base overflow-hidden bg-neutral-white shadow-card hover:shadow-md transition-shadow duration-300">
                  {/* Image + hover cart icon */}
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full block h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <button
                      className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 hover:bg-primary hover:text-white"
                      aria-label="Add to cart"
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                  </div>

                  {/* Card info */}
                  <div className="p-3">
                    <p className="text-primary text-xs font-medium uppercase tracking-wide mb-1">
                      {product.category.name}
                    </p>
                    <h2 className="text-text-heading text-sm font-semibold leading-snug mb-2 truncate">
                      {product.title.split(" ").slice(0, 3).join(" ")}
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
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav aria-label="Product pagination" className="mt-4 mb-8">
            <ul className="flex justify-center -space-x-px text-sm">
              <li>
                <a
                  onClick={() => currentPage > 1 && getAllProducts(currentPage - 1)}
                  className={`${paginationBase} rounded-s-base ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  Previous
                </a>
              </li>

              {Array(numberOfPages)
                .fill(null)
                .map((_, index) => (
                  <li key={index}>
                    <a
                      onClick={() => getAllProducts(index + 1)}
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
                  onClick={() => currentPage < numberOfPages && getAllProducts(currentPage + 1)}
                  className={`${paginationBase} rounded-e-base ${currentPage === numberOfPages ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Home;
