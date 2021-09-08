import transitions from "@material-ui/core/styles/transitions";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './Logout.scss'

//mode for Nao
const LOGOUT = "LOGOUT"

const Logout = (props) => {
const { userName, setuserName, isloggedin, setIsloggedin, transitionNao } = props;
let history = useHistory();
useEffect(() => {
    const isLocalStorage = localStorage.getItem("user_token");
    const userName = localStorage.getItem("user_name")
    setuserName(userName)
    setIsloggedin(isLocalStorage)
}, [isloggedin])

const clearStorage = (e) => {
  e.preventDefault()
    history.push("/");
    localStorage.clear();
    setIsloggedin(null);

}
  transitionNao(LOGOUT)
  return (
    <div>
      {(!isloggedin)? (
            <div className="container">
            <a className='btn-a' href="/login"><button className="btn">Login</button></a>
            <a className='btn-a' href="/signup"><button className="btn">Signup</button></a>
            </div>
      ) : (
          <div className="container2">
          <h4 className="username">{userName}</h4>
        <button className="btn" onClick={clearStorage}>Logout</button>
        </div>
      )
    }
    </div>
  );
};

export default Logout;
