import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';
import SlideClouds from '../Slider/';

const useStyles = makeStyles({
  cardSelect: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: '5px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '100%',
    padding: '0 10px',
  },
  card: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: '5px',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: '100%',
    padding: '0 10px',
  },
  img: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  text: {
    textAlign: 'left',
    color: 'white',
  },
});
const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  width: '50%',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function WeatherCard(props) {
  const {
    avgTemp,
    date,
    cloud,
    weather,
    showGraph,
    value,
    unit,
    city,
    index,
    currentSildeIndex,
  } = props;
  const classes = useStyles();
  return (
    <Card
      sx={{ margin: 1 }}
      className={
        currentSildeIndex === index ? classes.cardSelect : classes.card
      }
      onClick={() => {
        showGraph(value, index);
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Item>
            <Typography
              key={1}
              variant="h4"
              component="h4"
              className={classes.text}
              // sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {avgTemp}°{unit}
            </Typography>
            <Typography
              key={2}
              variant="p"
              component="h5"
              className={classes.text}
              // sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {city.name}
            </Typography>
            <Typography
              key={3}
              variant="p"
              component="h5"
              className={classes.text}
              // sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterTop
            >
              {date}
            </Typography>
          </Item>

          <Item>
            <SlideClouds value={value} />
          </Item>
        </Stack>
      </CardContent>
    </Card>
  );
}
