import React, { useEffect } from 'react';
import StoreContext from '../Context/';
import { observer } from 'mobx-react-lite';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import WeatherCard from '../Components/WeatherCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import { toJS } from 'mobx';

function Weather() {
  const { weatherStore } = React.useContext(StoreContext);

  useEffect(() => {}, []);

  const { pageIndex, setPageIndex } = React.useState(0);
  const pageSize = 3;

  const options = {
    rewind: true,
    width: 800,
    gap: '1rem',
  };

  return (
    <div>
      {weatherStore.loading && <Loading loading={weatherStore.loading} />}
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
      </Splide>
    </div>
  );
}

export default observer(Weather);
