import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SectionTitle from "../SectionTitle/SectionTitle";

const inputClass =
  "bg-neutral-bg-medium border border-neutral-border-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs placeholder:text-text-muted";
const labelClass = "block mb-2 text-sm font-medium text-text-heading";

const UpdatePassword = () => {
  let navigate = useNavigate();
  let [errorMsg, setErrorMsg] = useState("");
  const baseURL = "https://ecommerce.routemisr.com/api/v1/users";

  let validateYup = Yup.object({
    currentPassword: Yup.string().required("Current password is required").min(6, "Min 6 characters"),
    password: Yup.string().required("New password is required").min(6, "Min 6 characters"),
    rePassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match"),
  });

  async function updatePassword(data) {
    await axios
      .put(`${baseURL}/changeMyPassword`, data, {
        headers: { token: Cookies.get("token") },
      })
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          navigate("/");
        }
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message || "Something went wrong");
      });
  }

  let updatePasswordFormik = useFormik({
    initialValues: { currentPassword: "", password: "", rePassword: "" },
    onSubmit: updatePassword,
    validationSchema: validateYup,
    validateOnChange: true,
  });

  const fields = [
    { id: "currentPassword", label: "Current password" },
    { id: "password",        label: "New password" },
    { id: "rePassword",      label: "Confirm new password" },
  ];

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="max-w-lg mx-auto bg-neutral-white rounded-base shadow-card border border-neutral-border p-8">
        <SectionTitle title="Update Password" />

        {errorMsg && (
          <div className="p-3 mb-5 text-sm text-danger-text rounded-base bg-danger-bg" role="alert">
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={updatePasswordFormik.handleSubmit}>
          {fields.map(({ id, label }) => (
            <div className="mb-5" key={id}>
              <label htmlFor={id} className={labelClass}>{label}</label>
              <input
                onChange={updatePasswordFormik.handleChange}
                onBlur={updatePasswordFormik.handleBlur}
                type="password" id={id} name={id}
                className={inputClass}
              />
              {updatePasswordFormik.touched[id] && updatePasswordFormik.errors[id] && (
                <p className="text-danger-strong text-xs pt-1">{updatePasswordFormik.errors[id]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-primary-strong focus:ring-4 font-medium rounded-base text-sm px-4 py-2.5 focus:outline-none disabled:opacity-50 transition-colors"
            disabled={!(updatePasswordFormik.isValid && updatePasswordFormik.dirty)}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
