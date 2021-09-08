import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import "./Signup.scss";
import axios from "axios";
import * as yup from "yup";

//mode for nao 
const SIGNUP = "SIGNUP"
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
  password: yup.string().min(6).required(passwordError[0])
});

export default function Signup(props) {
  const { setUser, setIsloggedin, transitionNao } = props
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [signedup, setSignedup] = useState(false)
  const [serverError, setServerError] = useState("")

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
    console.log("important",data);

    try {
      setServerError("")
      setFormErrors({});

      const signupPost = await axios.post("http://localhost:3002/signup", data)
      localStorage.setItem("user_token", JSON.stringify({token: signupPost.data.token}))
      localStorage.setItem("user_name", data.name)
	    setSignedup(true);
      setIsloggedin(true);

    } catch (err) {
      console.log(err.response);
      setServerError(err.response.data.error)
    }
  };


  if (signedup) {
	  return <Redirect to="/" />
  }
  
  transitionNao(SIGNUP)
  return (
    <div className="main-div">
      <form className="signup-form">
        <div className="signup-div">
          <label className="">User Name</label>
          <input
          className="input-signup"
            type="text"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {formErrors.name && (
            <span className="form-error">{formErrors.name}</span>
          )}
          <label>Email</label>
          <input
            className="input-signup"
            type="text"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {formErrors.email && (
            <span className="form-error">{formErrors.email}</span>
          )}
          <label>Password</label>
          <input
            className="input-signup"
            type="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {formErrors.password && (
            <span className="form-error">
              {formErrors.password.charAt(0).toUpperCase() +
                formErrors.password.slice(1)}
            </span>
          )}
          <label>Phone Number (Optional)</label>
          <input
            className="input-signup"
            type="text"
            onChange={(e) => setData({ ...data, phone_number: e.target.value })}
          />
           <span className="form-error">{serverError}</span>
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
