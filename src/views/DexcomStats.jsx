import React, {useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth";
import axios from "axios";
import {Line} from "react-chartjs-2";
import moment from "moment";

const DexcomStats = () => {
  const {user} = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user.dexcomToken) return;

      await axios
        .get(`${import.meta.env.VITE_API_PATH}/dexcom/EGVS`, {
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
    })();
  }, [user.dexcomToken]);

  return (
    <div className="p-4 ml-64 custom-padding-top">
      <h1>Dexcom Stats</h1>
      <p>Here you can see your Dexcom stats</p>
      <p>Here is your data: </p>
      {!loading && (
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
      )}
    </div>
  );
};

export default DexcomStats;
