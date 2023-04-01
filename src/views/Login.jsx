import axios from "axios";
import {enqueueSnackbar, closeSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import "./Login.css";
import Cookies from "universal-cookie";
import useEnterKeyDown from "../hooks/useEnterKeyDown";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("auth_token")) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${import.meta.env.VITE_API_PATH}/auth/login`, {
          email,
          password,
        })
        .then((res) => {
          enqueueSnackbar("User logged in successfully", {
            variant: "success",
          });
          cookies.set("auth_token", res.data.user.token, {
            path: "/",
          });

          console.log(res.data);
          window.location.href = "/dashboard";
        });
    } catch (err) {
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  useEnterKeyDown(handleKeyPress);

  return (
    <div className="container2">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">Welcome Back</h2>
          <h4 className="animation a2">
            Log in to your account using email and password
          </h4>
        </div>
        <div className="form">
          <input
            type="email"
            className="form-field animation a3"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-field animation a4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="animation a5">
            <a href="#">Forgot Password</a>
          </p>
          <p className="animation a5">
            <a href="register">I don't have an account</a>
          </p>
          <button className="animation a5" onClick={(e) => handleSubmit(e)}>
            LOGIN
          </button>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Login;
