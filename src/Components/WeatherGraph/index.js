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
  onClick: (e, element) => {
    console.log(element);
    if (element.length > 0) {
      var ind = element[0].index;
      alert(ind);
    }
  },
};

const WeatherGraph = ({ data }) => {
  return <Line data={data} options={options} />;
};

export default WeatherGraph;
