import {BiLogOut} from "react-icons/bi";
import {CgProfile} from "react-icons/cg";
import {BsGraphUp, BsShareFill} from "react-icons/bs";
import {RxDashboard} from "react-icons/rx";
import {FiCalendar} from "react-icons/fi";
import {
  MdOutlineEditNotifications,
  MdOutlineCastConnected,
} from "react-icons/md";
import React from "react";
import Cookies from "universal-cookie";
import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const SideBar = (props) => {
  const cookies = new Cookies();
  const {user} = useAuth();

  const handleLogout = async () => {
    try {
      cookies.remove("auth_token", {path: "/"});
      cookies.remove("verify_email_sent", {path: "/"});
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <div className="flex p-2 pb-6 items-center justify-start">
            <a href="https://flowbite.com" className="flex md:mr-24">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                SugarSense
              </span>
            </a>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RxDashboard size={20} color="#000" />
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/dexcomStats"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BsGraphUp size={20} color="#000" />
                <span className="flex-1 ml-3 whitespace-nowrap">Follow up</span>
              </a>
            </li>
            <li>
              <a
                href={
                  user.role === "Patient"
                    ? "/appointement"
                    : "/doctor-appointement"
                }
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiCalendar size={20} color="#000" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Appointement
                </span>
              </a>
            </li>
            <li
              onClick={() => (window.location.href = "/myProfile")}
              className="cursor-pointer"
            >
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <CgProfile size={25} color="#000" />
                <span className="flex-1 ml-2 whitespace-nowrap">Profil</span>
              </p>
            </li>
            <li onClick={() => handleLogout()}>
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
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
