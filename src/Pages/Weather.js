import React, { useEffect, Component } from 'react';
import StoreContext from '../Context/';
import { observer } from 'mobx-react-lite';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import WeatherCard from '../Components/WeatherCard';
import Slider from 'react-slick';

import { toJS } from 'mobx';

const slideSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function Weather() {
  const { weatherStore } = React.useContext(StoreContext);

  useEffect(() => {}, []);

  return (
    <div>
      <Slider {...slideSettings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
        <div>
          <h3>7</h3>
        </div>
        <div>
          <h3>8</h3>
        </div>
      </Slider>

      {/* {weatherStore.loading && <Loading loading={weatherStore.loading} />}
      {weatherStore.isError && <Error isError={weatherStore.isError} />}
      <button
        onClick={() => {
          weatherStore.fetchWeatherReport();
        }}
      >
        Refresh{' '}
      </button>
      <Splide
        options={{
          rewind: true,
          width: 800,
          gap: '1rem',
        }}
      >
        {weatherStore.weatherData.length > 0 &&
          weatherStore.weatherData.map((data) => {
            return (
              <SplideSlide>
                <div />
              </SplideSlide>
            );
          })}
      </Splide> */}
    </div>
  );
}

export default observer(Weather);
