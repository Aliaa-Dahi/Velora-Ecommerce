import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Login = () => {
  let navigate = useNavigate()
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

  let initialValues = {
  
    email: "",
    password: "",
   
  };

  async function loginApi(data) {
    await axios
      .post(`${baseURL}/signin`, data)
      .then((response) => {
        if (response.data.token) {
          Cookies.set("token", response.data.token, { expires: 7 });
          navigate('/');
        }
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Something went wrong");
      });
  }

  let loginFormik = useFormik({
    initialValues,
    onSubmit: loginApi,
    validationSchema: validateYup,
    validateOnChange: true,
  });

  return (
    <>
      <h2 className="mx-auto">Login Now</h2>

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

      <form className="w-8/12 mx-auto" onSubmit={loginFormik.handleSubmit}>


        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your email
          </label>
          <input
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            type="email"
            id="email"
            name="email"
            className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {loginFormik.touched.email && loginFormik.errors.email ? (
            <p className="text-error pt-2">{loginFormik.errors.email}</p>
          ) : (
            ""
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your password
          </label>
          <input
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            type="password"
            id="password"
            name="password"
            className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {loginFormik.touched.password && loginFormik.errors.password ? (
            <p className="text-error pt-2">{loginFormik.errors.password}</p>
          ) : (
            ""
          )}
        </div>

          <Link to='/forgetPassword'>Forget Password?</Link> 
          <br />       <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50"
          disabled={!(loginFormik.isValid && loginFormik.dirty)}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
