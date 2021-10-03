import React, { useEffect } from 'react';
import GlobalContext from '../Context/';
import { observer } from 'mobx-react-lite';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import WeatherCard from '../Components/WeatherCard';
import Slider from 'react-slick';
import { kelvinConverter } from '../Util/temperature'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { toJS } from 'mobx';
import { slideSettings } from '../settings'
import { TemperatureUnits as Units, getUnits } from '../Util/temperature'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.1),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

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

  if (store.loading) {
    return <Loading />
  }

  if (store.isError) {
    return <Error message={store.errorMessage} />
  }

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <StyledToggleButtonGroup
                size="small"
                value={unit}
                exclusive
                onChange={handleChange}
                aria-label="Temperature"
              >
                <ToggleButtonGroup
                  color="primary"
                  value={unit}
                  exclusive
                  onChange={handleChange}
                >
                  {
                    Object.entries(Units).map(([value]) => <ToggleButton value={value} >{getUnits(value)}</ToggleButton>)
                  }
                </ToggleButtonGroup>
              </StyledToggleButtonGroup>
            </Grid>
            <Grid item xs={2}>
              <Button variant="text"
                onClick={() => {
                  store.fetchWeatherReport();
                }}>Refresh</Button>
            </Grid>
          </Grid>
        </Box>

      </div>
      <Slider {...slideSettings}>
        {store.report.length > 0 &&
          toJS(store.report).map(({ date, value }, index) => <WeatherCard key={index} avgTemp={kelvinConverter(value.avgTemp, store.unit)} date={date} cloud={} />
          )}
      </Slider>
    </div>
  );
}

export default observer(Weather);
