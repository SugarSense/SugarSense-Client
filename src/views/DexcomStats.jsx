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

  useEffect(() => {
    handleDayClick();
  }, [user.dexcomToken]);

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
        setData(res.data.records);
        console.log(res.data.records);
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
      </div>
    </div>
  );
};

export default DexcomStats;
