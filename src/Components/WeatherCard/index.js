import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';
import { getIcon } from '../../Util/icon';

const useStyles = makeStyles({
  card: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: '5px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '100%',
    padding: '0 10px',
  },
  temp: {
    textAlign: 'left',
    color: 'white',
  },
  img: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
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
  const { avgTemp, date, cloud, weather, showGraph, value, unit } = props;
  const classes = useStyles();

  return (
    <Card
      sx={{ margin: 1 }}
      className={classes.card}
      onClick={() => {
        showGraph(value);
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
              variant="h4"
              component="h4"
              className={classes.temp}
              // sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <p>
                {avgTemp}°{unit}
              </p>
            </Typography>
            <Typography
              variant="p"
              component="h5"
              className={classes.temp}
              // sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <p>{date}</p>
            </Typography>
          </Item>

          <Item>
            <img src={getIcon(weather.icon)} className={classes.img} />
          </Item>
        </Stack>
      </CardContent>
      {/* <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {date}
        </Typography>
      </CardContent> */}
    </Card>
  );
}
