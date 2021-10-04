import React from 'react';
import { Line } from 'react-chartjs-2';
import { toJS } from 'mobx';

const WeatherGraph = ({ data, handleIndexClick, array }) => {
  const rawData = toJS(array);
  const footer = (tooltipItem) => {
    let sum = 0;
    console.log(rawData[tooltipItem[0].dataIndex]);
    return 'Sum: ' + sum;
  };

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
    plugins: {
      tooltip: {
        callbacks: {
          footer: footer,
        },
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default WeatherGraph;
