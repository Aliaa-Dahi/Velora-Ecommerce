import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputClass =
  "bg-neutral-bg-medium border border-neutral-border-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs placeholder:text-text-muted";
const labelClass = "block mb-2.5 text-sm font-medium text-text-heading";

const Signup = () => {
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  const baseURL = "https://ecommerce.routemisr.com/api/v1/auth";

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
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string().required("Phone is required"),
  });

  let initialValues = { name: "", email: "", password: "", rePassword: "", phone: "" };

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
    initialValues,
    onSubmit: registerApi,
    validationSchema: validateYup,
    validateOnChange: true,
  });

  const fields = [
    { id: "name", label: "Your name", type: "text" },
    { id: "email", label: "Your email", type: "email" },
    { id: "password", label: "Your password", type: "password" },
    { id: "rePassword", label: "Password again", type: "password" },
    { id: "phone", label: "Your phone", type: "tel" },
  ];

  return (
    <>
      <h2 className="mx-auto">Register Now</h2>

      {errorMsg && (
        <div className="p-4 mb-4 w-1/2 mx-auto text-sm text-danger-text rounded-base bg-danger-bg" role="alert">
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      <form className="w-8/12 mx-auto" onSubmit={registerFormik.handleSubmit}>
        {fields.map(({ id, label, type }) => (
          <div className="mb-5" key={id}>
            <label htmlFor={id} className={labelClass}>{label}</label>
            <input
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              type={type}
              id={id}
              name={id}
              className={inputClass}
            />
            {registerFormik.touched[id] && registerFormik.errors[id] && (
              <p className="text-danger-strong pt-2">{registerFormik.errors[id]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="text-white bg-primary box-border border border-transparent hover:bg-primary-strong focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50"
          disabled={!(registerFormik.isValid && registerFormik.dirty)}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
