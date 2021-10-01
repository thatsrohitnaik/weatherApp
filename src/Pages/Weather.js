import React, { useEffect, Component } from 'react';
import StoreContext from '../Context/';
import { observer } from 'mobx-react-lite';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import WeatherCard from '../Components/WeatherCard';
import Slider from 'react-slick';
import {convertKelvinToFahrenheit as kTof, convertKelvinToCelsius as kToC}  from '../Util/tempConverter'

import { toJS } from 'mobx';

const slideSettings = {
  arrows: true,
  accessibility: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const setting = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Weather() {
  const { weatherStore } = React.useContext(StoreContext);


  useEffect(() => {}, []);

  return (
    <div>
      <div></div>
      <Slider {...slideSettings}>
        {weatherStore.weatherData.length > 0 &&
          weatherStore.weatherData.map((data, index) => {
            const {date,value} = toJS(data);
            const temp = weatherStore.showTempIn === 'F' ? kTof(value.avgTemp) : kToC(value.avgTemp);

            return (
              <div key={index}>
                <WeatherCard avgTemp={temp} date={date} cloud={}/>
              </div>
            );
          })}
      </Slider>

      {weatherStore.loading && <Loading loading={weatherStore.loading} />}
      {weatherStore.isError && <Error isError={weatherStore.isError} />}
      <button
        onClick={() => {
          weatherStore.fetchWeatherReport();
        }}
      >
        Refresh{' '}
      </button>
    </div>
  );
}

export default observer(Weather);
