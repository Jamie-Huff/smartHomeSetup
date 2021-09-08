import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import * as yup from "yup";

const emailError = ["Must be valid email", "Email is required"];
const passwordError = [
  "Password is required",
  "password must be at least 6 characters",
];

//mode for Nao
const LOGIN = "LOGIN"

// set the schema for the yup library
const loginSchema = yup.object().shape({
  email: yup.string().email(emailError[0]).required(emailError[1]),
  password: yup.string().min(6).required(passwordError[0]),
});

export default function Login(props) {
  const { setUser, setIsloggedin, transitionNao} = props
  // set the states for the compoenet
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [signedup, setSignedup] = useState(false);
  const [serverError, setServerError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
	// validate the schema with try block
    try {
      await loginSchema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const newErrors = {};
      for (const error of err.errors) {
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
		setServerError("")
      	setFormErrors({});

      const signupPost = await axios.post("http://localhost:3002/login", data)
      console.log("======", signupPost.data.user);
	    localStorage.setItem("user_token", JSON.stringify({token: signupPost.data.token}))
      localStorage.setItem("user_name", signupPost.data.user);
      setSignedup(true);
      setIsloggedin(true)

    } catch (err) {
		// console.log("====In",err.response.data.error)
		setServerError(err.response.data.error)
    }

  };


  if (signedup) {
    return <Redirect to="/" />
}
  transitionNao(LOGIN)
  return (
    <div className="main-div">
      <form className="signup-form">
        <div className="signup-div">
          <label className="signup-text">Email</label>
          <input
		  className="input-signup"
            type="text"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
		  <span className="form-error">{formErrors.email}</span>
          <label className="signup-text">Password</label>
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
		    <span className="form-error">{serverError}</span>
          <a className="button" onClick={handleSubmit}>
            Log in
          </a>
          <a className="to-signup" href="/signup">
            Do not have an account?
          </a>
        </div>
      </form>
    </div>
  );
}
