import axios from "axios";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import "./Register.css";
import Cookies from "universal-cookie";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const {enqueueSnackbar} = useSnackbar();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("auth_token")) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_PATH}/auth/register`, {
        email,
        password,
        firstname,  
        lastname,
      }).then((res) => {
        cookies.set("auth_token", res.data.user.token, {path: "/"});
        enqueueSnackbar("User registered successfully", {
          variant: "success",
        });
        window.location.href = "/follow-up";
      })
    } catch (err) {
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
      });
    }
  };

  return (
    <div class="container2">
      <div class="left">
        <div class="header">
          <h2 class="animation a1">Register</h2>
          <h4 class="animation a2">
            Create an account to get access to our services
          </h4>
        </div>
        <div class="form">
          <input
            type="text"
            class="form-field animation a3"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            class="form-field animation a3"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            class="form-field animation a3"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            class="form-field animation a4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p class="animation a5">
            <a href="#">Forgot Password</a>
          </p>
          <p class="animation a5">
            <a href="login">Already have an account?</a>
          </p>
          <button class="animation a6" onClick={(e) => handleSubmit(e)}>
            REGISTER
          </button>
        </div>
      </div>
      <div class="right-register"></div>
    </div>
  );
}

export default Register;
