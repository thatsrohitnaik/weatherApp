import React from 'react';
import { Line } from 'react-chartjs-2';

const WeatherGraph = ({ data, handleIndexClick }) => {
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
      if (element.length > 0) {
        handleIndexClick(element[0].index);
      }
    },
  };
  return <Line data={data} options={options} />;
};

export default WeatherGraph;
