import React, { useEffect } from 'react';
import StoreContext from '../Context/';
import { observer } from 'mobx-react-lite';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { toJS } from 'mobx';

function Weather() {
  const { weatherStore } = React.useContext(StoreContext);

  useEffect(() => {}, []);

  console.log(toJS(weatherStore.weatherData));

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
    </div>
  );
}

export default observer(Weather);
