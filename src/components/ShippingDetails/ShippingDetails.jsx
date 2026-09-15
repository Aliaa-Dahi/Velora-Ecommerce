import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faBuilding,
  faSpinner,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

const inputClass =
  "bg-neutral-bg-medium border border-neutral-border-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs placeholder:text-text-muted transition-colors";

const inputErrorClass =
  "bg-neutral-bg-medium border border-danger-strong text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-danger-strong focus:border-danger-strong block w-full px-3 py-2.5 shadow-xs placeholder:text-text-muted transition-colors";

const labelClass = "block mb-1.5 text-sm font-medium text-text-heading";

const validationSchema = Yup.object({
  details: Yup.string()
    .required("Address details are required")
    .min(6, "Please provide a more detailed address (at least 10 characters)"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
  city: Yup.string()
    .required("City is required")
    .min(2, "City name must be at least 2 characters"),
});

const ShippingDetails = () => {
  const { id } = useParams(); 
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function checkoutSession(values) {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
        { shippingAddress: values },
        { headers: { token: Cookies.get("token") } }
      );

      // API returns a Stripe checkout session URL
      if (res.data?.session?.url) {
        window.location.href = res.data.session.url;
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: checkoutSession,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const fields = [
    {
      id: "details",
      label: "Address Details",
      type: "text",
      placeholder: "e.g. 42 Tahrir St, Apt 3, Floor 5",
      icon: faLocationDot,
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "e.g. 01012345678",
      icon: faPhone,
    },
    {
      id: "city",
      label: "City",
      type: "text",
      placeholder: "e.g. Cairo",
      icon: faBuilding,
    },
  ];

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="max-w-lg mx-auto bg-neutral-white rounded-base shadow-card border border-neutral-border p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center text-primary shrink-0">
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div>
            <h1 className="text-text-heading text-xl font-bold leading-tight">
              Shipping Details
            </h1>
            <p className="text-text-muted text-xs mt-0.5">
              Enter your delivery address to complete the order
            </p>
          </div>
        </div>

        <div className="h-px bg-neutral-border w-full mb-6" />

        {/* Error alert */}
        {errorMsg && (
          <div
            className="p-3 mb-5 text-sm text-danger-text rounded-base bg-danger-bg border border-danger-strong"
            role="alert"
          >
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} noValidate>
          {fields.map(({ id, label, type, placeholder, icon }) => (
            <div key={id} className="mb-5">
              <label htmlFor={id} className={labelClass}>
                {label}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-text-muted pointer-events-none text-sm">
                  <FontAwesomeIcon icon={icon} />
                </span>
                <input
                  id={id}
                  name={id}
                  type={type}
                  placeholder={placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[id]}
                  className={`pl-9 ${
                    formik.touched[id] && formik.errors[id]
                      ? inputErrorClass
                      : inputClass
                  }`}
                />
              </div>
              {formik.touched[id] && formik.errors[id] && (
                <p className="text-danger-strong text-xs pt-1">
                  {formik.errors[id]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting || !(formik.isValid && formik.dirty)}
            className="w-full flex items-center justify-center gap-2 text-white bg-primary hover:bg-primary-strong focus:ring-4 focus:ring-primary font-medium rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTruck} />
                Proceed to Payment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingDetails;
