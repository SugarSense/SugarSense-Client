import React, { useState } from "react";
import '../index.css';
import AreaCharts from '../components/areaChart';
import NavBar from '../components/navBar';

function FollowUp() {
    const [chartData, setChartData] = useState([]);


    const data = [
        {
            labels: ['2023-03-28', '2023-03-29', '2023-03-30', '2023-03-31', '2023-04-01', '2023-04-02', '2023-04-03'],
            fill: true,
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            labels: ['2023-04-04', '2023-04-05', '2023-04-06', '2023-04-07', '2023-04-08', '2023-04-09', '2023-04-10'],
            fill: true,
            data: [56, 82, 32, 90, 65, 45, 23],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ]

    const changeData = (e) => {
        console.log(e.target.value);
        const selectedData = data.filter(item => item.labels[0] + ' - ' + item.labels[item.labels.length - 1] === e.target.value);
        console.log(selectedData);
        setChartData(selectedData);
    }


    return (
        <>
            <NavBar />
            <div className='p-4 ml-64 custom-padding-top'>
                <div class="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                    <div class="grid grid-cols-3 gap-4 mb-4">
                        <label for="dates" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                        <select onChange={changeData} id="dates" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled>Select an Date</option>
                            {data.map((item, index) => {
                                return (
                                    <option key={index} value={item.labels[0] + ' - ' + item.labels[item.labels.length - 1]}>{item.labels[0] + ' - ' + item.labels[item.labels.length - 1]}</option>
                                )
                            })}
                        </select>
                    </div>
                    {chartData.length === 0 ? <p>No data</p> : <AreaCharts data={chartData} />}
                </div>
            </div>
        </>
    );
}

export default FollowUp;