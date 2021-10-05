import React from 'react';
import { Line } from 'react-chartjs-2';
import { toJS } from 'mobx';
import { externalTooltipHandler } from './weatherTooltip';
import { epocToDate } from '../../Util/date';

const WeatherGraph = ({ data, handleIndexClick, rawData: array, unit }) => {
  const rawData = toJS(array);

  const externalTooltipHandlerWrapper = (context) => {
    externalTooltipHandler(context, unit, rawData);
  };

  const date = epocToDate(rawData[0]?.dt) || null;

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
    plugins: {
      title: {
        display: true,
        text: 'Hourly weather breakdown for ' + date,
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
