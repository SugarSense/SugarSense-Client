import {BiLogOut} from "react-icons/bi";
import {CgProfile} from "react-icons/cg";
import {BsGraphUp, BsShareFill} from "react-icons/bs";
import {RxDashboard} from "react-icons/rx";
import React from "react";
import Cookies from "universal-cookie";
import {Navigate} from "react-router-dom";

const SideBar = (props) => {
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
    <>
      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <div class="flex p-2 pb-6 items-center justify-start">
            <a href="https://flowbite.com" class="flex md:mr-24">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                SugarSense
              </span>
            </a>
          </div>
          <ul class="space-y-2 font-medium">
            <li>
              <a
                href=""
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RxDashboard size={20} color="#000" />
                <span class="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/follow-up"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BsGraphUp size={20} color="#000" />
                <span class="flex-1 ml-3 whitespace-nowrap">Follow up</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BsShareFill size={20} color="#000" />
                <span class="flex-1 ml-3 whitespace-nowrap">Sharing</span>
              </a>
            </li>
            <li
              onClick={() => (window.location.href = "/myProfile")}
              class="cursor-pointer"
            >
              <p class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <CgProfile size={25} color="#000" />
                <span class="flex-1 ml-2 whitespace-nowrap">Profil</span>
              </p>
            </li>
            <li onClick={handleLogout}>
              <p class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <BiLogOut size={25} color="#000" />
                Logout
              </p>
            </li>
          </ul>
        </div>
      </aside>

      <div>{props.children}</div>
    </>
  );
};

export default SideBar;
