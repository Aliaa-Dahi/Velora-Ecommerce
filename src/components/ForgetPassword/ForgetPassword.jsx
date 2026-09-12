import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputClass =
  "bg-neutral-bg-medium border border-neutral-border-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs placeholder:text-text-muted";
const labelClass = "block mb-2.5 text-sm font-medium text-text-heading";
const submitBtn =
  "text-white bg-primary box-border border border-transparent hover:bg-primary-strong focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50";

const ForgetPassword = () => {
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  let [formDisplay, setFormDisplay] = useState(true);
  const baseURL = "https://ecommerce.routemisr.com/api/v1/auth";

  let validateYup = Yup.object({
    email: Yup.string().required("Email is required").email("Please enter a valid email"),
  });

  let resetValidate = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });

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
    initialValues: { email: "" },
    onSubmit: forgetPasswordApi,
    validationSchema: validateYup,
    validateOnChange: true,
  });

  async function verifyResetPasswordApi(data) {
    await axios
      .post(`${baseURL}/verifyResetCode`, { resetCode: String(data.resetCode) })
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          navigate("/updatePassword");
        }
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Something went wrong");
      });
  }

  let verifyResetCodeFormik = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: verifyResetPasswordApi,
    validationSchema: resetValidate,
    validateOnChange: true,
  });

  return (
    <>
      {errorMsg && (
        <div className="p-4 mb-4 w-1/2 mx-auto text-sm text-danger-text rounded-base bg-danger-bg" role="alert">
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      {formDisplay ? (
        <form className="w-8/12 mx-auto" onSubmit={forgetPasswordFormik.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className={labelClass}>Your email</label>
            <input
              onChange={forgetPasswordFormik.handleChange}
              onBlur={forgetPasswordFormik.handleBlur}
              type="email"
              id="email"
              name="email"
              className={inputClass}
            />
            {forgetPasswordFormik.touched.email && forgetPasswordFormik.errors.email && (
              <p className="text-danger-strong pt-2">{forgetPasswordFormik.errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            className={submitBtn}
            disabled={!(forgetPasswordFormik.isValid && forgetPasswordFormik.dirty)}
          >
            Submit
          </button>
        </form>
      ) : (
        <form className="w-8/12 mx-auto" onSubmit={verifyResetCodeFormik.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="resetCode" className={labelClass}>Your code</label>
            <input
              onChange={verifyResetCodeFormik.handleChange}
              onBlur={verifyResetCodeFormik.handleBlur}
              type="text"
              id="resetCode"
              name="resetCode"
              className={inputClass}
            />
            {verifyResetCodeFormik.touched.resetCode && verifyResetCodeFormik.errors.resetCode && (
              <p className="text-danger-strong pt-2">{verifyResetCodeFormik.errors.resetCode}</p>
            )}
          </div>
          <button
            type="submit"
            className={submitBtn}
            disabled={!(verifyResetCodeFormik.isValid && verifyResetCodeFormik.dirty)}
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default ForgetPassword;
