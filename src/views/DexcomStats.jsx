import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { Line } from "react-chartjs-2";
import moment from "moment";

import { addDays, format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const DexcomStats = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({});
  const [averageDay, setAverageDay] = useState([]);
  const [highestDay, setHighestDay] = useState([]);
  const [lowestDay, setLowestDay] = useState([]);

  // useEffect(() => {
  //   handleDayClick();
  // }, [user.dexcomToken]);

  const handleDayClick = async (day) => {
    setRange(day);
    console.log(day);

    if (!user.dexcomToken) return;
    await axios
      .post(`${import.meta.env.VITE_API_PATH}/dexcom/EGVS`,
        {
          date: day ? moment(day).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
        },
        {
          headers: {
            Authorization: `Bearer ${user.dexcomToken}`,
          },
        })
      .then((res) => {
        setData(res.data.records || []);
        console.log(res.data.records);
        const max = Math.max(...res.data.records.map((r) => r.value));
        const min = Math.min(...res.data.records.map((r) => r.value));
        const average = res.data.records.reduce((a, b) => a + b.value, 0) / res.data.records.length;
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
  }

  return (
    <div className="p-4 ml-64 custom-padding-top">
      <div className="flex flex-wrap justify-center shadow-md">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Dexcom Stats</h1>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">Here you can see your Dexcom stats</p>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">Here is your data: </p>
        </div>
        <DayPicker
          mode="single"
          selected={range}
          onSelect={
            (day) => handleDayClick(day)
          }
          disabled={isFutureDate}
        />
        {!loading && range && (
          <div className="w-2/3  text-center">
            <Line
              data={{
                labels: data
                  .reverse()
                  .map((r) => moment(r.systemTime).format("HH:mm")),
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
    </div>
  );
};

export default DexcomStats;
