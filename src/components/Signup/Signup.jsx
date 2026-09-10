import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  let navigate = useNavigate()
  let [errorMsg, setErrorMsg] = useState("");
  const baseURL = "https://ecommerce.routemisr.com/api/v1/auth/";
  let validateYup = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(20, "Name must be at most 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Repassword must match the password"),
    phone: Yup.string().required("Phone is required"),
  });

  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  async function registerApi(data) {
    let req = await axios
      .post(`${baseURL}/signup`, data)
      .then((response) => {
        if(response.data.message == 'success') {
          navigate('/login')
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.errors.msg);
      });
  }

  let registerFormik = useFormik({
    initialValues,
    onSubmit: registerApi,
    validationSchema: validateYup,
    validateOnChange: true,
  });

  return (
    <>
      <h2 className="mx-auto">Register Now</h2>

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

      <form className="w-8/12 mx-auto" onSubmit={registerFormik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your name
          </label>
          <input
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="text"
            id="name"
            name="name"
            className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {registerFormik.touched.name && registerFormik.errors.name ? (
            <p className="text-error pt-2">{registerFormik.errors.name}</p>
          ) : (
            ""
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your email
          </label>
          <input
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="email"
            id="email"
            name="email"
            className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {registerFormik.touched.name && registerFormik.errors.email ? (
            <p className="text-error pt-2">{registerFormik.errors.email}</p>
          ) : (
            ""
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your paswword
          </label>
          <input
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="password"
            id="password"
            name="password"
            className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {registerFormik.touched.name && registerFormik.errors.password ? (
            <p className="text-error pt-2">{registerFormik.errors.password}</p>
          ) : (
            ""
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Password again
          </label>
          <input
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {registerFormik.touched.name && registerFormik.errors.rePassword ? (
            <p className="text-error pt-2">
              {registerFormik.errors.rePassword}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your phone
          </label>
          <input
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            type="tel"
            id="phone"
            name="phone"
            className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
          {registerFormik.touched.name && registerFormik.errors.phone ? (
            <p className="text-error pt-2">{registerFormik.errors.phone}</p>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50"
          disabled={!(registerFormik.isValid && registerFormik.dirty)}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
