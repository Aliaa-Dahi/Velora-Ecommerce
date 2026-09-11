import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  let [formDisplay, setFormDisplay] = useState(true);
  const baseURL = "https://ecommerce.routemisr.com/api/v1/auth";

  let validateYup = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });

  let resetValidate = Yup.object({
    resetCode: Yup.string().required("resetCode is required"),
  });

  let initialValues = {
    email: "",
  };

  async function forgetPasswordApi(data) {
    await axios
      .post(`${baseURL}/forgotPasswords`, data)
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          setFormDisplay(false);
        }
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Something went wrong");
      });
  }

  let forgetPasswordFormik = useFormik({
    initialValues,
    onSubmit: forgetPasswordApi,
    validationSchema: validateYup,
    validateOnChange: true,
  });

  async function verifyResetPasswordApi(data) {
    await axios
      .post(`${baseURL}/verifyResetCode`, { resetCode: String(data.resetCode) })
      .then((response) => {
        if (response.status >= 200 &&response.status <= 300 ) {
          navigate('/updatePassword');
        }
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Something went wrong");
      });
  }

  let verifyResetCodeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyResetPasswordApi,
    validationSchema: resetValidate,
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

      {formDisplay ? (
        <form
          className="w-8/12 mx-auto"
          onSubmit={forgetPasswordFormik.handleSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your email
            </label>
            <input
              onChange={forgetPasswordFormik.handleChange}
              onBlur={forgetPasswordFormik.handleBlur}
              type="email"
              id="email"
              name="email"
              className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            />
            {forgetPasswordFormik.touched.email &&
            forgetPasswordFormik.errors.email ? (
              <p className="text-error pt-2">
                {forgetPasswordFormik.errors.email}
              </p>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50"
            disabled={
              !(forgetPasswordFormik.isValid && forgetPasswordFormik.dirty)
            }
          >
            Submit
          </button>
        </form>
      ) : (
        <form
          className="w-8/12 mx-auto"
          onSubmit={verifyResetCodeFormik.handleSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="resetCode"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your code
            </label>
            <input
              onChange={verifyResetCodeFormik.handleChange}
              onBlur={verifyResetCodeFormik.handleBlur}
              type="text"
              id="resetCode"
              name="resetCode"
              className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            />
            {verifyResetCodeFormik.touched.resetCode &&
            verifyResetCodeFormik.errors.resetCode ? (
              <p className="text-error pt-2">
                {verifyResetCodeFormik.errors.resetCode}
              </p>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50"
            disabled={
              !(verifyResetCodeFormik.isValid && verifyResetCodeFormik.dirty)
            }
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default ForgetPassword;
