import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import MainSlider from '../MainSlider/MainSlider'

const Home = () => {
  let [productList, setProductList] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [numberOfPages, setNumberOfPages] = useState(0);
  let [isLoading, setIsLoading] = useState(true);

  function getAllProducts(page = 1) {
    setIsLoading(true);
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=12`
      )
      .then((res) => {
        console.log(res.data);
        setNumberOfPages(res.data.metadata.numberOfPages);
        setCurrentPage(page);
        setProductList(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center translate-y-50">
          <span className="loader mx-auto"></span>
        </div>

      ) : (
        <div className="w-11/12 mx-auto">
          <MainSlider />
          <div className="flex flex-wrap -mx-2">
            {productList?.map((product) => {
              return (
                <div key={product.id} className="w-2/12 px-2 mb-4">
                  <div className="item border border-brand p-4 group overflow-hidden">
                    <div className="relative overflow-hidden mb-1">
                      <img
                        className="w-full block"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <button className="btn absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 duration-200">
                        Add To Cart
                      </button>
                    </div>
                    <h5 className="text-brand text-sm">
                      {product.category.name}
                    </h5>
                    <h2 className="text-lg">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="flex justify-between">
                      <span>{product.price}</span>
                      <span>
                        {product.ratingsAverage}
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-500"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <nav aria-label="Page navigation example">
            <ul className="flex -space-x-px text-sm justify-center">
              <li>
                <a
                  onClick={() =>
                    currentPage > 1 && getAllProducts(currentPage - 1)
                  }
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none cursor-pointer"
                >
                  Previous
                </a>
              </li>
              {Array(numberOfPages)
                .fill(null)
                .map((_, index) => {
                  return (
                    <li key={index} onClick={() => getAllProducts(index + 1)}>
                      <a className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm px-3 h-9 focus:outline-none cursor-pointer">
                        {index + 1}
                      </a>
                    </li>
                  );
                })}
              <li
                onClick={() =>
                  currentPage < numberOfPages && getAllProducts(currentPage + 1)
                }
              >
                <a className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-9 focus:outline-none cursor-pointer">
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
