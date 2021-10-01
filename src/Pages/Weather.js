import React, { useEffect, Component } from 'react';
import StoreContext from '../Context/';
import { observer } from 'mobx-react-lite';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import WeatherCard from '../Components/WeatherCard';
import Slider from 'react-slick';
import {convertKelvinToFahrenheit as kTof, convertKelvinToCelsius as kToC}  from '../Util/tempConverter'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { toJS } from 'mobx';
import {slideSettings} from '../settings'

function Weather() {
  const { weatherStore } = React.useContext(StoreContext);
  const [value, setValue] = React.useState(weatherStore.showTempIn|| 'F');

  const handleChange = (event) => {
    setValue(event.target.value);
    weatherStore.setShowTempIn(event.target.value)
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div>
      <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="F" control={<Radio />} label="Ferheanite" />
        <FormControlLabel value="C" control={<Radio />} label="Ceilcius" />
      </RadioGroup>
    </FormControl>
    {value}
      </div>
      <Slider {...slideSettings}>
        {weatherStore.weatherData.length > 0 &&
          weatherStore.weatherData.map((data, index) => {
            const {date,value} = toJS(data);
            console.log(weatherStore.showTempIn,'hmm')
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
