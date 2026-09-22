import { useState } from "react";
import useApi from "../../Hooks/useApi";
import SectionTitle from "../SectionTitle/SectionTitle";
import Loader from "../Loader.jsx/Loader";

const Brands = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useApi(
    `brands?page=${currentPage}&limit=40`,
    currentPage
  );

  const brands = data?.data ?? [];
  const numberOfPages = data?.metadata?.numberOfPages ?? 0;

  const paginationBase =
    "flex items-center justify-center text-text-muted bg-neutral-white border border-neutral-border-medium font-medium text-sm px-3 h-9 cursor-pointer transition-colors hover:bg-neutral-bg-medium hover:text-text-heading select-none";

    if (isLoading) {
      return <Loader />;
    }

  return (
    <div className="w-11/12 mx-auto py-8">
      {/* Header */}
      <div className="mb-2">
        <SectionTitle title="All Brands" />
        <p className="text-text-muted text-sm mt-1">
          {data?.results ?? 0} brands available
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="group relative flex flex-col items-center gap-3 bg-neutral-white border border-neutral-border rounded-base p-4 shadow-card hover:shadow-md hover:border-primary transition-all duration-300 overflow-hidden cursor-default"
          >
            {/* Hover accent bar */}
            <span className="absolute top-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            {/* Logo container */}
            <div className="w-full aspect-square flex items-center justify-center rounded-base bg-neutral-bg-soft p-3 overflow-hidden">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Name */}
            <p className="text-text-heading text-xs font-semibold text-center leading-snug w-full truncate group-hover:text-primary transition-colors duration-200">
              {brand.name}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {numberOfPages > 1 && (
        <nav aria-label="Brands pagination" className="mt-10 mb-4">
          <ul className="flex justify-center -space-x-px text-sm">
            <li>
              <a
                onClick={() =>
                  currentPage > 1 && setCurrentPage((p) => p - 1)
                }
                className={`${paginationBase} rounded-s-base ${
                  currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </a>
            </li>

            {Array(numberOfPages)
              .fill(null)
              .map((_, i) => (
                <li key={i}>
                  <a
                    onClick={() => setCurrentPage(i + 1)}
                    className={`${paginationBase} ${
                      currentPage === i + 1
                        ? "bg-primary text-white border-primary hover:bg-primary-strong hover:text-white"
                        : ""
                    }`}
                  >
                    {i + 1}
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
      )}
    </div>
  );
};

export default Brands;
