import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { useAuth } from "../hooks/useAuth";
import NavBar from "../components/navBar";

function CustomAlert() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const [alertType, setAlertType] = useState("Today");
  const [inputLimit, setInputLimit] = useState("");
  const [alertLimit, setAlertLimit] = useState(null);
  const [alertMessage, setAlertMessage] = useState("No alert for today.");

  const getFollowUpData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_PATH}/usersData/user/${user._id}`
      );
      setUserData(res.data.result);
      setData(res.data.result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFollowUpData();
  }, []);

  useEffect(() => {
    if (userData && data && alertLimit) {
      let alert = "No alert for today.";
      for (const element of data) {
        let maxDataToCheck = [];
        if (alertType === "This week") {
          const weekStart = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 6
          );
          for (let i = 0; i < 7; i++) {
            const dateToCheck = new Date(
              weekStart.getFullYear(),
              weekStart.getMonth(),
              weekStart.getDate() + i
            );
            const index = element.labels.indexOf(
              `${dateToCheck.getFullYear()}-${(dateToCheck.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${dateToCheck
                .getDate()
                .toString()
                .padStart(2, "0")}`
            );
            if (index !== -1) {
              maxDataToCheck.push(element.maxData[index]);
            }
          }
        } else {
          const index = element.labels.indexOf(
            `${today.getFullYear()}-${(today.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`
          );
          if (index !== -1) {
            maxDataToCheck.push(element.maxData[index]);
          }
        }
        if (
          maxDataToCheck.length > 0 &&
          Math.max(...maxDataToCheck) >= alertLimit
        ) {
          alert = `Max pick is ${alertLimit}`;
          break;
        }
      }
      setAlertMessage(alert);
    }
  }, [userData, data, alertType, alertLimit]);

  const handleMaxLimitChangeClick = () => {
    setAlertLimit(parseInt(inputLimit, 10));
  };

  const today = new Date();

  console.log(userData);
  console.log(data);
  console.log(alertLimit);
  console.log(alertMessage);

  return (
    <>
      <NavBar />
      <div className="px-4 pt-24 ml-64 font-worksans">
        <div className="px-4 py-6 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <h1 className="text-3xl font-bold">Custom Alert</h1>
          <div className="mt-4">
            <div>
              <label htmlFor="block font-medium text-gray-700">
                Alert type
              </label>
              <select
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                name="alertType"
                id="alertType"
                onChange={(e) => setAlertType(e.target.value)}
              >
                <option value="Today">Today</option>
                <option value="This week">This week</option>
              </select>
            </div>
            <div>
              <label className="mt-4" htmlFor="maxLimit">
                Max limit
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  id="maxLimit"
                  value={inputLimit}
                  className="block w-full px-4 py-2 mt-2 mr-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  onChange={(e) => setInputLimit(e.target.value)}
                />
                <button
                  className="px-4 py-2 mt-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  onClick={handleMaxLimitChangeClick}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
          <div className="alert-message">{alertMessage}</div>
        </div>
      </div>
    </>
  );
}
export default CustomAlert;
