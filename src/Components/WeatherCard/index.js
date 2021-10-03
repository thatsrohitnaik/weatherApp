import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Div from '@mui/material/Div';

const Item = styled(Div)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function WeatherCard(props) {
  const { avgTemp, date, cloud, weather } = props;

  console.log(weather);

  return (
    <Card sx={{ margin: 1 }}>
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
              // sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <p>{avgTemp}</p>
            </Typography>
          </Item>

          <Item>
            <Typography
              variant="h4"
              component="h4"
              // sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <p>{avgTemp}</p>
            </Typography>
          </Item>
        </Stack>
      </CardContent>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
}
