import React, { useEffect } from 'react';
import GlobalContext from '../Context/';
import { observer } from 'mobx-react-lite';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import WeatherCard from '../Components/Weather/Card';
import Slider from 'react-slick';
import { kelvinConverter } from '../Util/temperature';
import { toJS } from 'mobx';
import { slideSettings } from '../settings';
import { TemperatureUnits as Units, getUnits } from '../Util/temperature';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import RefreshIcon from '@mui/icons-material/Refresh';
import { makeStyles } from '@mui/styles';
import WeatherGraph from '../Components/Weather/Graph/';
import Detail from '../Components/Weather/Detail';

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

const useStyles = makeStyles({
  icon: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    marginTop: -10,
  },
});

function Weather() {
  const { weatherStore: store } = React.useContext(GlobalContext);
  const [hourIndex, setHourIndex] = React.useState(0);
  const [unit, setUnit] = React.useState(store.unit || Units.Fahrenheit);

  const handleChange = (event) => {
    setUnit(event.target.value);
    store.setUnit(event.target.value);
  };
  const classes = useStyles();

  useEffect(() => {
    store.fetchWeatherReport();
  }, []);

  const handleIndexClick = (index) => {
    setHourIndex(index);
  };

  if (store.loading) {
    return <Loading />;
  }

  if (store.isError) {
    return <Error message={store.errorMessage} />;
  }

  const showGraph = (value, index) => {
    store.setselectedDay(value.data, index);
  };

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid key={1} item xs={10}>
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
                  {Object.entries(Units).map(([key, value]) => (
                    <ToggleButton value={value} key={key}>
                      {getUnits(value)}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </StyledToggleButtonGroup>
              <RefreshIcon
                className={classes.icon}
                onClick={() => {
                  store.fetchWeatherReport();
                }}
              />
            </Grid>
            <Grid key={2} item xs={2}></Grid>
          </Grid>
        </Box>
      </div>
      <Slider {...slideSettings}>
        {store.report.length > 0 &&
          toJS(store.report).map(({ date, value }, index) => (
            <WeatherCard
              key={index}
              avgTemp={kelvinConverter(value.avgTemp, store.unit)}
              date={date}
              unit={unit}
              value={value}
              city={store.city}
              index={index}
              currentSildeIndex={store.currentSildeIndex}
              showGraph={showGraph}
            />
          ))}
      </Slider>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12} sm={12} md={2}></Grid>

        <Grid item xs={12} sm={12} md={8}>
          <WeatherGraph
            data={store.graphDataset}
            handleIndexClick={handleIndexClick}
            rawData={store.selectedDay}
            unit={store.unit}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2}></Grid>
      </Grid>
    </div>
  );
}

export default observer(Weather);
