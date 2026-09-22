import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useDispatch } from "react-redux";
import { login } from "../Store/AuthSlice";

const inputClass =
  "bg-neutral-bg-medium border border-neutral-border-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs placeholder:text-text-muted";
const labelClass = "block mb-2 text-sm font-medium text-text-heading";

const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  const baseURL = "https://ecommerce.routemisr.com/api/v1/auth";

  let validateYup = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  async function loginApi(data) {
    await axios
      .post(`${baseURL}/signin`, data)
      .then((response) => {
        if (response.data.token) {
          Cookies.set("token", response.data.token, { expires: 7 });
          console.log(response.data)
          Cookies.set("user", JSON.stringify({
            name:  response.data.user.name,
            email: response.data.user.email,
          }), { expires: 7 });
          dispatch(login({ token: response.data.token }));
          navigate("/");
        }
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Something went wrong");
      });
  }

  let loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: loginApi,
    validationSchema: validateYup,
    validateOnChange: true,
  });

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="max-w-lg mx-auto bg-neutral-white rounded-base shadow-card border border-neutral-border p-8">
        <SectionTitle title="Login" />

        {errorMsg && (
          <div
            className="p-3 mb-5 text-sm text-danger-text rounded-base bg-danger-bg"
            role="alert"
          >
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={loginFormik.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              type="email"
              id="email"
              name="email"
              className={inputClass}
            />
            {loginFormik.touched.email && loginFormik.errors.email && (
              <p className="text-danger-strong text-xs pt-1">
                {loginFormik.errors.email}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              type="password"
              id="password"
              name="password"
              className={inputClass}
            />
            {loginFormik.touched.password && loginFormik.errors.password && (
              <p className="text-danger-strong text-xs pt-1">
                {loginFormik.errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mb-5">
            <Link
              to="/forgetPassword"
              className="text-primary text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-primary-strong focus:ring-4 font-medium rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 transition-colors"
            disabled={!(loginFormik.isValid && loginFormik.dirty)}
          >
            Sign In
          </button>

          <p className="mt-5 text-center text-sm text-text-muted">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
