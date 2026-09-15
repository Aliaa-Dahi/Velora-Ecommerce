import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTag, faBoxOpen, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import SectionTitle from "../SectionTitle/SectionTitle";
import useApi from "../../Hooks/useApi";
import { useCart } from "../../Context/CartContextProvider";

// Renders 5 stars with exact partial fill (quarter, half, three-quarter, full)
const StarRating = ({ rating, size = "text-base" }) => {
  return (
    <div className={`flex gap-0.5 ${size}`}>
      {Array(5)
        .fill(null)
        .map((_, i) => {
          const fill = Math.min(Math.max(rating - i, 0), 1); // 0 to 1
          const percent = Math.round(fill * 100);
          return (
            <span key={i} className="relative inline-block w-[1em] h-[1em]">
              {/* Gray base star */}
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full fill-neutral-border absolute top-0 left-0"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {/* Yellow fill star clipped to percent */}
              {percent > 0 && (
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full absolute top-0 left-0"
                  style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="#facc15"
                  />
                </svg>
              )}
            </span>
          );
        })}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: productData, isLoading } = useApi(`products/${id}`);
  const product = productData?.data;
  const { addToCart, isAddingToCart, isInCart } = useCart();

  useEffect(() => {
    if (product?.imageCover) {
      setSelectedImage(product.imageCover);
    }
  }, [product?.imageCover]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loader"></span>
      </div>
    );
  }

  const discount = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100
      )
    : null;

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="bg-neutral-white border border-neutral-border rounded-base shadow-card p-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          {/* ── Left: images ── */}
          <div className="w-full md:w-5/12 flex flex-col gap-3">
            {/* Main image */}
            <div className="rounded-base overflow-hidden border border-neutral-border">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover block transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 flex-wrap justify-center">
              {(product.images ?? []).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`rounded-base overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === img
                      ? "border-primary"
                      : "border-neutral-border hover:border-primary"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-14 h-14 md:w-16 md:h-16 object-cover block"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: info ── */}
          <div className="w-full md:w-7/12 flex flex-col gap-4">
            {/* Category & brand */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.category?.name && (
                <span className="text-xs font-medium text-primary uppercase tracking-wide bg-primary-soft px-2 py-1 rounded-xs">
                  {product.category.name}
                </span>
              )}
              {product.brand?.name && (
                <span className="text-xs font-medium text-text-muted bg-neutral-bg-medium px-2 py-1 rounded-xs">
                  {product.brand.name}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-text-heading text-2xl font-bold leading-snug">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.ratingsAverage} size="text-sm" />
              <span className="text-text-heading text-sm font-semibold">
                {product.ratingsAverage}
              </span>
              <span className="text-text-muted text-sm">
                ({product.ratingsQuantity} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3">
              {product.priceAfterDiscount ? (
                <>
                  <span className="text-text-heading text-3xl font-bold">
                    {product.priceAfterDiscount} EGP
                  </span>
                  <span className="text-text-muted line-through text-lg">
                    {product.price} EGP
                  </span>
                  <span className="bg-danger-bg text-danger-text text-xs font-bold px-2 py-1 rounded-xs">
                    -{discount}%
                  </span>
                </>
              ) : (
                <span className="text-text-heading text-3xl font-bold">
                  {product.price} EGP
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-border w-full"></div>

            {/* Description */}
            <div>
              <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <FontAwesomeIcon icon={faBoxOpen} className="text-primary" />
                <span>
                  <span className="font-semibold text-text-heading">
                    {product.sold}
                  </span>{" "}
                  sold
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <FontAwesomeIcon icon={faTag} className="text-primary" />
                <span>
                  <span className="font-semibold text-text-heading">
                    {product.quantity}
                  </span>{" "}
                  in stock
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-border w-full"></div>

            {/* Add to cart */}
            <button
              onClick={() => {
                if (!isInCart(product.id) && !isAddingToCart(product.id)) {
                  addToCart(product.id);
                }
              }}
              disabled={isInCart(product.id) || isAddingToCart(product.id)}
              className={`flex items-center justify-center gap-3 w-full font-medium text-sm py-3 rounded-base transition-colors duration-200 shadow-xs disabled:cursor-not-allowed
                ${isInCart(product.id)
                  ? "bg-success text-white opacity-80"
                  : "bg-primary hover:bg-primary-strong text-white disabled:opacity-60"
                }`}
            >
              {isAddingToCart(product.id) ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  Adding...
                </>
              ) : isInCart(product.id) ? (
                <>
                  <FontAwesomeIcon icon={faCheck} />
                  Added to Cart
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCartShopping} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Reviews ── */}
        {product.reviews?.length > 0 && (
          <div className="mt-10">
            <SectionTitle title="Customer Reviews" />
            <div className="flex flex-col gap-4">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-neutral-bg-soft border border-neutral-border rounded-base p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-soft flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {review.user?.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <span className="text-text-heading text-sm font-semibold block">
                          {review.user?.name || "Anonymous"}
                        </span>
                        <span className="text-text-muted text-xs">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </span>
                      </div>
                    </div>
                    <StarRating
                      rating={review.rating ?? review.ratings ?? 0}
                      size="text-sm"
                    />
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {review.review}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
