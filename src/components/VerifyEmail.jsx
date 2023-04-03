import axios from "axios";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import Cookies from "universal-cookie";

const VerifyEmail = () => {
  const cookies = new Cookies();
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_API_PATH}/auth/resend-verification`,
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies.get("auth_token")}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          cookies.set("verify_email_sent", true, {path: "/"});
          setSent(true);
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (cookies.get("verify_email_sent")) {
      setSent(true);
    }
  }, []);

  return (
    <div
      className="custom-padding-top w-full z-100"
      style={{
        display: sent ? "none" : "block",
      }}
    >
      <div className="absolute top-0 rounded-lg dark:border-gray-700 w-full">
        <div
          class="p-4 w-full text-sm text-orange-800 rounded-lg bg-orange-50 dark:bg-gray-800 dark:text-orange-400 flex items-center justify-center"
          role="alert"
        >
          <p class="font-medium">Info alert!</p>{" "}
          <span className="mr-4 ml-1">
            You need to verify your email before you can access the dashboard.
          </span>
          <span>
            <button
              type="button"
              class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => {
                handleResend();
              }}
            >
              Resend Email
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
