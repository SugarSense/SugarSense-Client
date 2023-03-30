import React from "react";
import "../index.css";
import "../../public/fonts.css";
import theme from "../theme";
import NavbarHome from "../components/navbarHome";

function Home() {
  return (
    <div
      className="flex flex-col items-center font-worksans h-screen text-white"
      style={{
        background: theme.colors.backgroundHome,
      }}
    >
      <div className="flex justify-between items-center w-full py-4">
        <NavbarHome />
      </div>
      <div className="flex h-screen">
        <div className="m-auto flex items-center">
          <img
            src="https://cdn.discordapp.com/attachments/1089824944025767996/1090249944490856528/image.png"
            alt="SugarSenseLogo"
            className="h-64 w-64 mr-10"
          />
          <div>
            <h2 className="text-8xl font-bold">SugarSense</h2>
            <p className="text-3xl">The life is sweeter with us</p>
            <button className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 mr-2 my-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-48">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl my-4">Download the SugarSense app now!</p>
        <div className="flex pb-4">
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2"
          >
            <img
              src="https://www.mysugr.com/static/assets/stores/google-play.svg"
              alt="Download on the App Store"
            />
          </a>
          <a
            href="https://play.google.com/store/apps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.mysugr.com/static/assets/stores/apple-store.svg"
              alt="Get it on Google Play"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
