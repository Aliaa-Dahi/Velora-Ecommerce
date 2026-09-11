import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const UpdatePassword = () => {
  let navigate = useNavigate()
  let [errorMsg, setErrorMsg] = useState("");
  const baseURL = "https://ecommerce.routemisr.com/api/v1/users";
  let validateYup = Yup.object({
    currentPassword: Yup.string()
      .required("Current password is required")
      .min(6, "Password must be at least 6 characters"),
    password: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: Yup.string()
      .required("Please confirm your new password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  let initialValues = {
    currentPassword: "",
    password: "",
    rePassword: "",
  };

  async function updatePassword(data) {
    await axios
      .put(`${baseURL}/changeMyPassword`, data, {
        headers: { token: Cookies.get("token") },
      })
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          navigate('/');
        }
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Something went wrong");
      });
  }

  let updatePasswordFormik = useFormik({
    initialValues,
    onSubmit: updatePassword,
    validationSchema: validateYup,
    validateOnChange: true,
  });

  return (
    <>

      {errorMsg ? (
        <div
          className="p-4 mb-4 w-1/2 mx-auto text-sm text-fg-danger-strong rounded-base bg-danger-soft"
          role="alert"
        >
          <span className="font-medium">{errorMsg}</span>
        </div>
      ) : (
        ""
      )}

      <form className="w-8/12 mx-auto" onSubmit={updatePasswordFormik.handleSubmit}>

        <div className="mb-5">
          <label
            htmlFor="currentPassword"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Current password
          </label>
          <input
            onChange={updatePasswordFormik.handleChange}
            onBlur={updatePasswordFormik.handleBlur}
            type="password"
            id="currentPassword"
            name="currentPassword"
            className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {updatePasswordFormik.touched.currentPassword && updatePasswordFormik.errors.currentPassword ? (
            <p className="text-error pt-2">{updatePasswordFormik.errors.currentPassword}</p>
          ) : ""}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            New password
          </label>
          <input
            onChange={updatePasswordFormik.handleChange}
            onBlur={updatePasswordFormik.handleBlur}
            type="password"
            id="password"
            name="password"
            className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {updatePasswordFormik.touched.password && updatePasswordFormik.errors.password ? (
            <p className="text-error pt-2">{updatePasswordFormik.errors.password}</p>
          ) : ""}
        </div>

        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Confirm new password
          </label>
          <input
            onChange={updatePasswordFormik.handleChange}
            onBlur={updatePasswordFormik.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {updatePasswordFormik.touched.rePassword && updatePasswordFormik.errors.rePassword ? (
            <p className="text-error pt-2">{updatePasswordFormik.errors.rePassword}</p>
          ) : ""}
        </div>

         <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50"
          disabled={!(updatePasswordFormik.isValid && updatePasswordFormik.dirty)}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default UpdatePassword;
