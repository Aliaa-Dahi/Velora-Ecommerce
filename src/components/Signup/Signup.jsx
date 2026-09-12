import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";

const inputClass =
  "bg-neutral-bg-medium border border-neutral-border-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs placeholder:text-text-muted";
const labelClass = "block mb-2 text-sm font-medium text-text-heading";

const Signup = () => {
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  const baseURL = "https://ecommerce.routemisr.com/api/v1/auth";

  let validateYup = Yup.object({
    name: Yup.string().required("Name is required").min(2, "Min 2 characters").max(20, "Max 20 characters"),
    email: Yup.string().required("Email is required").email("Please enter a valid email"),
    password: Yup.string().required("Password is required").min(6, "Min 6 characters"),
    rePassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string().required("Phone is required"),
  });

  async function registerApi(data) {
    await axios
      .post(`${baseURL}/signup`, data)
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          navigate("/login");
        }
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Something went wrong");
      });
  }

  let registerFormik = useFormik({
    initialValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    onSubmit: registerApi,
    validationSchema: validateYup,
    validateOnChange: true,
  });

  const fields = [
    { id: "name",       label: "Full name",        type: "text" },
    { id: "email",      label: "Email",            type: "email" },
    { id: "password",   label: "Password",         type: "password" },
    { id: "rePassword", label: "Confirm password", type: "password" },
    { id: "phone",      label: "Phone number",     type: "tel" },
  ];

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="max-w-lg mx-auto bg-neutral-white rounded-base shadow-card border border-neutral-border p-8">
        <SectionTitle title="Create an account" />

        {errorMsg && (
          <div className="p-3 mb-5 text-sm text-danger-text rounded-base bg-danger-bg" role="alert">
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={registerFormik.handleSubmit}>
          {fields.map(({ id, label, type }) => (
            <div className="mb-5" key={id}>
              <label htmlFor={id} className={labelClass}>{label}</label>
              <input
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                type={type} id={id} name={id}
                className={inputClass}
              />
              {registerFormik.touched[id] && registerFormik.errors[id] && (
                <p className="text-danger-strong text-xs pt-1">{registerFormik.errors[id]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-primary-strong focus:ring-4 font-medium rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 transition-colors"
            disabled={!(registerFormik.isValid && registerFormik.dirty)}
          >
            Register
          </button>

          <p className="mt-5 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
