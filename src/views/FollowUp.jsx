import React, { useState } from "react";
import '../index.css';
import AreaCharts from '../components/areaChart';
import NavBar from '../components/navBar';
import axios from 'axios';
import { useAuth } from "../hooks/useAuth";


function FollowUp() {
    const [chartData, setChartData] = useState([]);
    const [data, setData] = useState([]);
    const [averageWeek, setAverageWeek] = useState([]);
    const [highestWeek, setHighestWeek] = useState([]);
    const [lowestWeek, setLowestWeek] = useState([]);
    const {user} = useAuth();
    const [userData, setUserData] = useState([]);

    const getFollowUpData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_PATH}/usersData/user/${user._id}`);
            // console.log(res.data);
            setUserData(res.data.result);
            setData(res.data.result.data);
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getFollowUpData();
    }, []);

    // console.log(userData);

    // const data = [
    //     {
    //         labels: ['2023-03-28', '2023-03-29', '2023-03-30', '2023-03-31', '2023-04-01', '2023-04-02', '2023-04-03'],
    //         maxData : [200, 250, 300, 250, 200, 350, 300],
    //         data: [152, 177, 258, 176, 125, 344, 247],
    //         minData: [120 , 150, 200, 150, 100, 300, 200],
    //     },
    //     {
    //         labels: ['2023-04-04', '2023-04-05', '2023-04-06', '2023-04-07', '2023-04-08', '2023-04-09', '2023-04-10'],
    //         maxData : [300, 350, 400, 350, 300, 400, 400],
    //         data: [255, 288, 209, 246, 100, 300, 200],
    //         minData: [239, 156, 200, 150, 82, 286, 122],
    //     }
    // ]

    const changeData = (e) => {
        // console.log(typeof data)
        // console.log(e.target.value);
        const selectedData = data.filter(item => item.labels[0] + ' - ' + item.labels[item.labels.length - 1] === e.target.value);
        // console.log(selectedData);
        setAverageWeek((selectedData[0].averageData.reduce((a, b) => a + b, 0) / selectedData[0].averageData.length).toFixed(0));
        setHighestWeek(selectedData[0].maxData.reduce((a, b) => Math.max(a, b)));
        setLowestWeek(selectedData[0].minData.reduce((a, b) => Math.min(a, b)));
        setChartData(selectedData);
    }

  const changeData = (e) => {
    console.log(e.target.value);
    const selectedData = data.filter(
      (item) =>
        item.labels[0] + " - " + item.labels[item.labels.length - 1] ===
        e.target.value
    );
    console.log(selectedData);
    setAverageWeek(
      (
        selectedData[0].data.reduce((a, b) => a + b, 0) /
        selectedData[0].data.length
      ).toFixed(0)
    );
    setHighestWeek(selectedData[0].maxData.reduce((a, b) => Math.max(a, b)));
    setLowestWeek(selectedData[0].minData.reduce((a, b) => Math.min(a, b)));
    setChartData(selectedData);
  };

    return (
        <>
            <NavBar />
            <div className='p-4 ml-64 custom-padding-top'>
                <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <label for="dates" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select the Date</label>
                        <select onChange={changeData} id="dates" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled>Select a Date</option>
                            {data.map((item, index) => {
                                return (
                                    <option key={index} value={item.labels[0] + ' - ' + item.labels[item.labels.length - 1]}>{item.labels[0] + ' - ' + item.labels[item.labels.length - 1]}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="w-2/3 m-auto text-center">
                    {chartData.length === 0 ? <p>No data</p> : <AreaCharts data={chartData} />}
                    </div>
                    {chartData.length === 0 ? null :
                    <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
                        <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">{averageWeek}</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Average</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">{highestWeek}</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Highest pick</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">{lowestWeek}</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Lowest pick</dd>
                                </div>
                            </dl>
                    </div>
                </div>
                }
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FollowUp;
