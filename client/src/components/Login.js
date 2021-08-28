import React, { useState } from "react";
import "./Login.scss";
import axios from 'axios'

export default function Login (props) {
	const [data, setData] = useState({
		email: "",
		password: ""
	})



	const handleSubmit = (e) => {
		console.log(data)
		e.preventDefault();
		return axios.post("http://localhost:3002/signup", data)
	}
	return (
		<div>
			<form>
			<label>Email</label>
			<input type="text" placeholder="email@example.com" onChange={(e) => setData({...data, email: e.target.value})}/>
			<label>password</label>
			<input type="password" onChange={(e) => setData({...data, password: e.target.value})} />
			<button onClick={handleSubmit}>Sign Up</button>
			</form>
		</div>
	)
}
