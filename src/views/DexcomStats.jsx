import React, {useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth";
import axios from "axios";
import {Line} from "react-chartjs-2";
import moment from "moment";

import {addDays, format} from "date-fns";
import {DayPicker} from "react-day-picker";
import "react-day-picker/dist/style.css";
import Cookies from "universal-cookie";
import {BallTriangle} from "react-loader-spinner";
import {Toaster, toast} from "react-hot-toast";

const DexcomStats = () => {
  const {user} = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({});
  const [averageDay, setAverageDay] = useState([]);
  const [highestDay, setHighestDay] = useState([]);
  const [lowestDay, setLowestDay] = useState([]);
  const [labels, setLabels] = useState([]);

  const cookies = new Cookies();

  // useEffect(() => {
  //   handleDayClick();
  // }, [user.dexcomToken]);

  const handleDayClick = async (day) => {
    setRange(day);
    console.log(day);
    setLoading("loading");

    if (!user.dexcomToken) return;
    await axios
      .post(
        `${import.meta.env.VITE_API_PATH}/dexcom/EGVS`,
        {
          date: day
            ? moment(day).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD"),
        },
        {
          headers: {
            Authorization: `Bearer ${user.dexcomToken}`,
          },
        }
      )
      .then((res) => {
        const test = res.data.records
          .reverse()
          .map((r) => moment(r.systemTime).format("HH:mm"));
        setLabels(test);
        setData(res.data.records);

        const max = Math.max(...res.data.records.map((r) => r.value));
        const min = Math.min(...res.data.records.map((r) => r.value));
        const average =
          res.data.records.reduce((a, b) => a + b.value, 0) /
          res.data.records.length;
        setHighestDay(max);
        setLowestDay(min);
        setAverageDay(average.toFixed(0));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isFutureDate = (day) => {
    return day > new Date();
  };

  useEffect(() => {
    (async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get("code");
      const token = cookies.get("auth_token");

      if (code) {
        await axios
          .get(`${import.meta.env.VITE_API_PATH}/dexcom/auth`, {
            headers: {
              Authorization: `Bearer ${code}`,
              UserAuthorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })();
  }, []);

  const handleLoginDexcom = () => {
    if (user.verified) {
      window.location.href = `https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=${
        import.meta.env.VITE_DEXCOM_CLIENT_ID
      }&redirect_uri=http://localhost:5173/dexcomStats&response_type=code&scope=offline_access&state=offline_access`;
    } else {
      toast.error("You need to verify your account first !");
    }
  };

  return (
    <div className="p-4 ml-64">
      <Toaster />
      {user.dexcomToken ? (
        <div className="flex flex-wrap justify-center shadow-md items-center">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Dexcom Stats
            </h1>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Here you can see your Dexcom stats
            </p>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Here is your data:{" "}
            </p>
          </div>
          <DayPicker
            mode="single"
            selected={range}
            onSelect={(day) => handleDayClick(day)}
            disabled={isFutureDate}
            style={{alignSelf: "flex-start"}}
          />
          {!loading ? (
            <div className="w-2/3 text-center">
              <Line
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: "Glucose Level",
                      data: data.map((r) => r.value),
                      fill: false,
                      backgroundColor: "rgb(255, 99, 132)",
                      borderColor: "rgba(255, 99, 132, 0.2)",
                    },
                  ],
                }}
              />
            </div>
          ) : (
            loading === "loading" && (
              <div className="w-1/3 text-center">
                <BallTriangle
                  height={100}
                  width={100}
                  radius={5}
                  color="#00BFFF"
                  ariaLabel="ball-triangle-loading"
                  wrapperClass={{}}
                  wrapperStyle=""
                  visible={true}
                />
              </div>
            )
          )}
          {data.length === 0 ? null : (
            <div
              id="fullWidthTabContent"
              className="border-t border-gray-200 dark:border-gray-600"
            >
              <div
                className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                id="stats"
                role="tabpanel"
                aria-labelledby="stats-tab"
              >
                <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">
                      {averageDay}
                    </dt>
                    <dd className="text-gray-500 dark:text-gray-400">
                      Average
                    </dd>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">
                      {highestDay}
                    </dt>
                    <dd className="text-gray-500 dark:text-gray-400">
                      Highest pick
                    </dd>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">
                      {lowestDay}
                    </dt>
                    <dd className="text-gray-500 dark:text-gray-400">
                      Lowest pick
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-8">
            Please connect your Dexcom account
          </h1>
          {!user.dexcomToken && (
            <button
              type="button"
              class="text-white mb-4 w-44 sm:w-44 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={() => handleLoginDexcom()}
            >
              Connect to Dexcom
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DexcomStats;
