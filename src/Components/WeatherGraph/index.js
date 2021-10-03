import React from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const WeatherGraph = ({ data }) => {
  console.log(data, 'hmm');
  return <Line data={data} options={options} />;
};

export default WeatherGraph;
