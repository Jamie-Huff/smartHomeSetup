import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import "./Signup.scss";
import axios from "axios";
import * as yup from "yup";
// set the error messages
const nameError = "Name is required";
const emailError = ["Must be valid email", "Email is required"];
const passwordError = [
  "Password is required",
  "password must be at least 6 characters",
];
// set the schema for the yup library
const signupSchema = yup.object().shape({
  name: yup.string().required(nameError),
  email: yup.string().email(emailError[0]).required(emailError[1]),
  password: yup.string().min(6).required(passwordError[0]),
});

export default function Signup(props) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [signedup, setSignedup] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
	// validate the schema with try block
    try {
      await signupSchema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const newErrors = {};
      for (const error of err.errors) {
        if (nameError === error) {
          newErrors.name = error;
          continue;
        }
        if (emailError.includes(error)) {
          newErrors.email = error;
          continue;
        }
        if (passwordError.includes(error)) {
          newErrors.password = error;
        }
      }
      setFormErrors(newErrors);
      return;
    }
    console.log(data);

    try {
      setFormErrors({});

      const signupPost = await axios.post("http://localhost:3002/signup", data);
      console.log(signupPost);
	  setSignedup(true);

    } catch (err) {
      console.log(err);
    }
  };


  if (signedup) {
	  return <Redirect to="/login" />
  }
  return (
    <div className="main-div">
      <form className="signup-form">
        <div className="signup-div">
          <label className="">User name</label>
          <input
            type="text"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {formErrors.name && (
            <span className="form-error">{formErrors.name}</span>
          )}
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {formErrors.email && (
            <span className="form-error">{formErrors.email}</span>
          )}
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {formErrors.password && (
            <span className="form-error">
              {formErrors.password.charAt(0).toUpperCase() +
                formErrors.password.slice(1)}
            </span>
          )}
          <a onClick={handleSubmit} className="button">
            Sign Up
          </a>
          <a className="to-login" href="/login">
            Already have an account
          </a>
        </div>
      </form>
    </div>
  );
}
