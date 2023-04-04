import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Cookies from "universal-cookie";

const Verify = () => {
  const {token} = useParams();
  const [verified, setVerified] = useState(false);
  const cookies = new Cookies();

  console.log(token);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_PATH}/auth/verify/${token}`)
      .then((res) => {
        setVerified(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      });
  }, []);

  const handleResend = async () => {
    try {
      await axios
        .post(`${import.meta.env.VITE_API_PATH}/auth/resend-verification`, {
          headers: {
            Authorization: `Bearer ${cookies.get("auth_token")}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="container">
      {verified ? (
        <div class="row justify-content-center mt-5">
          <div class="col-md-8 col-lg-6">
            <div class="card shadow-lg p-3 mb-5 bg-white rounded">
              <div class="card-body text-center">
                <h2 class="card-title mb-4">Email Confirmation</h2>
                <p class="card-text">
                  Thank you for signing up with our service. Please check your
                  email and click the confirmation link to activate your
                  account.
                </p>
                <p>
                  You will be redirected to the home page in 3 seconds. If you
                  are not redirected, please click the button below.
                </p>
                <a href="/" class="btn btn-primary">
                  Go to Home Page
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="row justify-content-center mt-5">
          <div class="col-md-8 col-lg-6">
            <div class="card shadow-lg p-3 mb-5 bg-white rounded">
              <div class="card-body text-center">
                <h2 class="card-title mb-4">Email Confirmation</h2>
                <p class="card-text">
                  Thank you for signing up with our service. Please check your
                  email and click the confirmation link to activate your
                  account.
                </p>
                <button
                  onClick={() => handleResend()}
                  //   href="#"
                  class="btn btn-primary"
                >
                  Resend Confirmation Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;
