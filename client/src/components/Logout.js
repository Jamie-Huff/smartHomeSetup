import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import './Logout.scss'

const Logout = (props) => {

const { userName, setuserName, isloggedin, setIsloggedin } = props
useEffect(() => {
    const isLocalStorage = localStorage.getItem("user_token");
    const userName = localStorage.getItem("user_name")
    setuserName(userName)
    setIsloggedin(isLocalStorage)
}, [isloggedin])

const clearStorage = (e) => {
  e.preventDefault()
    localStorage.clear();
    setIsloggedin(null);
    return <Redirect to="/"/>
}
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
