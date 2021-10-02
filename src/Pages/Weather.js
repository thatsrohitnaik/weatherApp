import React, { useEffect } from 'react';
import StoreContext from '../Context/';
import { observer } from 'mobx-react-lite';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import WeatherCard from '../Components/WeatherCard';
import Slider from 'react-slick';
import {kelvinConverter,convertKelvinToFahrenheit as kTof, convertKelvinToCelsius as kToC}  from '../Util/temperature'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { toJS } from 'mobx';
import {slideSettings} from '../settings'
import {TemperatureUnits as Units} from '../Util/temperature'

function Weather() {
  const { weatherStore } = React.useContext(StoreContext);
  const [unit, setUnit] = React.useState(weatherStore.unit || Units.Fahrenheit);

  const handleChange = (event) => {
    setUnit(event.target.value);
    weatherStore.setUnit(event.target.value)
  };

  useEffect(() => {
    weatherStore.fetchWeatherReport();
  }, []);

  if(weatherStore.loading){
     return <Loading/>
  }

  if(weatherStore.isError){
     return  <Error message={weatherStore.errorMessage} />
  }

  return (
    <div>
      <div>
      <FormControl component="fieldset">
      <FormLabel component="legend">Temperature</FormLabel>
      <RadioGroup
      row
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={unit}
        onChange={handleChange}
      >
        <FormControlLabel value={Units.Fahrenheit} control={<Radio />} label="Ferheanite" />
        <FormControlLabel value={Units.Celsius} control={<Radio />} label="Ceilcius" />
      </RadioGroup>
    </FormControl>
      </div>
      <Slider {...slideSettings}>
        {weatherStore.report.length > 0 &&
          weatherStore.report.map((data, index) => {
            const {date,value} = toJS(data);
            const temp = kelvinConverter(value.avgTemp, weatherStore.unit);

            return (
              <div key={index}>
                <WeatherCard avgTemp={temp} date={date} cloud={}/>
              </div>
            );
          })}
      </Slider>

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
