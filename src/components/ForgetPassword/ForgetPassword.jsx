import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";

const inputClass =
  "bg-neutral-bg-medium border border-neutral-border-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs placeholder:text-text-muted";
const labelClass = "block mb-2 text-sm font-medium text-text-heading";
const submitBtn =
  "w-full text-white bg-primary hover:bg-primary-strong focus:ring-4 font-medium rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 transition-colors";

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
    <div className="w-11/12 mx-auto py-10">
      <div className="max-w-lg mx-auto bg-neutral-white rounded-base shadow-card border border-neutral-border p-8">
        <SectionTitle title={formDisplay ? "Forgot Password" : "Enter Reset Code"} />

        {errorMsg && (
          <div className="p-3 mb-5 text-sm text-danger-text rounded-base bg-danger-bg" role="alert">
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {formDisplay ? (
          <form onSubmit={forgetPasswordFormik.handleSubmit}>
            <p className="text-text-muted text-sm mb-5">
              Enter your email and we'll send you a reset code.
            </p>
            <div className="mb-5">
              <label htmlFor="email" className={labelClass}>Email</label>
              <input
                onChange={forgetPasswordFormik.handleChange}
                onBlur={forgetPasswordFormik.handleBlur}
                type="email" id="email" name="email"
                className={inputClass}
              />
              {forgetPasswordFormik.touched.email && forgetPasswordFormik.errors.email && (
                <p className="text-danger-strong text-xs pt-1">{forgetPasswordFormik.errors.email}</p>
              )}
            </div>
            <button
              type="submit" className={submitBtn}
              disabled={!(forgetPasswordFormik.isValid && forgetPasswordFormik.dirty)}
            >
              Send Reset Code
            </button>
          </form>
        ) : (
          <form onSubmit={verifyResetCodeFormik.handleSubmit}>
            <p className="text-text-muted text-sm mb-5">
              Check your email and enter the code you received.
            </p>
            <div className="mb-5">
              <label htmlFor="resetCode" className={labelClass}>Reset code</label>
              <input
                onChange={verifyResetCodeFormik.handleChange}
                onBlur={verifyResetCodeFormik.handleBlur}
                type="text" id="resetCode" name="resetCode"
                className={inputClass}
              />
              {verifyResetCodeFormik.touched.resetCode && verifyResetCodeFormik.errors.resetCode && (
                <p className="text-danger-strong text-xs pt-1">{verifyResetCodeFormik.errors.resetCode}</p>
              )}
            </div>
            <button
              type="submit" className={submitBtn}
              disabled={!(verifyResetCodeFormik.isValid && verifyResetCodeFormik.dirty)}
            >
              Verify Code
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
