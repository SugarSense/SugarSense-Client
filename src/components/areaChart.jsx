import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Analytics',
    },
  },
  scales:{
    y:{
      min: 0,
      max: 400,
    }
  }

};

const areaChart = (props) => {
  const [chartData, setChartData] = useState(props.data);

  // console.log(chartData);


  useEffect(()=> {
    setChartData(props.data);
  })

  const data = {
    labels: chartData[0].labels,
    datasets: [
      {
        label: 'Max pick',
        data: chartData[0].maxData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Average pick',
        data: chartData[0].averageData,
        borderColor: '#f59607',
        backgroundColor: '#f59607',
      },
      {
        label: 'Min pick',
        data: chartData[0].minData,
        borderColor: '#5fb9ed',
        backgroundColor: '#5fb9ed',
      }
    ],
  };


  return <Line data={data} options={options} />;
}

// const labels= ['2023-03-28', '2023-03-29', '2023-03-30', '2023-03-31', '2023-04-01', '2023-04-02', '2023-04-03'];

// export const data = {
//   labels,
//     datasets: [
//         {
//         fill:true,
//         label:labels[0] + ' - ' + labels[labels.length - 1],
//         data: [65, 59, 80, 81, 56, 55, 40],
//         borderColor: 'rgba(255, 99, 132, 1)',
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         }
//     ]
// };

// export default function App() {
//   return <Line options={options} data={data} />;
// }

export default areaChart;