import React, { useState, useEffect } from "react";
import './Logout.scss'

const Logout = (props) => {

const { userName, isloggedin, setIsloggedin } = props
useEffect(() => {
    const isLocalStorage = localStorage.getItem("user_token");
    setIsloggedin(isLocalStorage)
}, [isloggedin])

const clearStorage = () => {
    localStorage.clear();
    setIsloggedin(null)
}


    // console.log("this is from here",isLocalStorage);
  return (
    <div>
      {(!isloggedin)? (
            <>
            <button className="btn"><a className='brn-a' href="/login">Login</a></button>
            <button className="btn"><a className='brn-a' href="/signup">signup</a></button>
            </>
      ) : (
          <>
          <h4>{userName}</h4>
        <button className="btn" onClick={clearStorage}>Logout</button>
        </>
      )
    }
    </div>
  );
};

export default Logout;
