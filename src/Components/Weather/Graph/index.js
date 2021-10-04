import React from 'react';
import { Line } from 'react-chartjs-2';
import { toJS } from 'mobx';
import { externalTooltipHandler } from './tooltip';

const WeatherGraph = ({ data, handleIndexClick, rawData: array, unit }) => {
  const rawData = toJS(array);

  const externalTooltipHandlerWrapper = (context) => {
    externalTooltipHandler(context, unit, rawData);
  };

  const options = {
    scales: {
      y: [
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
      title: {
        display: true,
        text: 'Hourly weather breakdown',
      },
      legend: {
        position: 'bottom',
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandlerWrapper,
        unit: unit,
        rawData: rawData,
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default WeatherGraph;
