import React, { useEffect } from 'react';
import GlobalContext from '../Context/';
import { observer } from 'mobx-react-lite';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import WeatherCard from '../Components/WeatherCard';
import Slider from 'react-slick';
import {kelvinConverter}  from '../Util/temperature'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { toJS } from 'mobx';
import {slideSettings} from '../settings'
import {TemperatureUnits as Units} from '../Util/temperature'

function Weather() {
  const { weatherStore: store } = React.useContext(GlobalContext);
  const [unit, setUnit] = React.useState(store.unit || Units.Fahrenheit);

  const handleChange = (event) => {
    setUnit(event.target.value);
    store.setUnit(event.target.value)
  };

  useEffect(() => {
    store.fetchWeatherReport();
  }, []);

  if(store.loading){
     return <Loading/>
  }

  if(store.isError){
     return  <Error message={store.errorMessage} />
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
        {
         Object.entries(Units).map(([key,value])=> <FormControlLabel value={value} control={<Radio />} label={key} />)
        }
      </RadioGroup>
    </FormControl>
      </div>
      <Slider {...slideSettings}>
        {store.report.length > 0 &&
          toJS(store.report).map(({date,value}, index) => <WeatherCard key={index} avgTemp={kelvinConverter(value.avgTemp, store.unit)} date={date} cloud={}/>
          )}
      </Slider>

      <button
        onClick={() => {
          store.fetchWeatherReport();
        }}
      >
        Refresh{' '}
      </button>
    </div>
  );
}

export default observer(Weather);
