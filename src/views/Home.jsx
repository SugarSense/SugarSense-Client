import React from "react";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import "../App.css";
import "../index.css";

function Home() {
  const cookies = new Cookies();

  const handleLogout = async () => {
    try {
      cookies.remove("auth_token", {path: "/"});
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <Link to="/data-graphics">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Default
        </button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
