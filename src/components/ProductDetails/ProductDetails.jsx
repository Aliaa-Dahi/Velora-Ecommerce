import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faTag,
  faBoxOpen,
  faCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Reviews from "../Reviews/Reviews";
import StarRating from "../StarRating/StarRating";

import useApi from "../../Hooks/useApi";
import { useCart } from "../../Context/CartContextProvider";
import Loader from "../Loader.jsx/Loader";

// Renders 5 stars with exact partial fill (quarter, half, three-quarter, full)


const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart, isAddingToCart, isInCart } = useCart();

  let productResponse = useApi(`products/${id}`);
  let productData = productResponse?.data;
  let isLoading = productResponse?.isLoading;

  const product = productData?.data;

  useEffect(() => {
    if (product?.imageCover) {
      setSelectedImage(product.imageCover);
    }
    // console.log(product?.reviews)
  }, [product?.imageCover]);

  if (isLoading) {
    return <Loader />;
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
                if (!isInCart(product._id) && !isAddingToCart(product._id)) {
                  addToCart(product._id);
                }
              }}
              disabled={isInCart(product._id) || isAddingToCart(product._id)}
              className={`flex items-center justify-center gap-3 w-full font-medium text-sm py-3 rounded-base transition-colors duration-200 shadow-xs disabled:cursor-not-allowed
                ${isInCart(product._id)
                  ? "bg-primary-soft text-primary border border-primary"
                  : "bg-primary hover:bg-primary-strong text-white disabled:opacity-60"
                }`}
            >
              {isAddingToCart(product._id) ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  Adding...
                </>
              ) : isInCart(product._id) ? (
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
        <Reviews reviews={product?.reviews} />
      </div>
    </div>
  );
};

export default ProductDetails;
