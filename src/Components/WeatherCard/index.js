import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function WeatherCard(props) {
  const { avgTemp, date, cloud } = props;

  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography
          variant="h4"
          component="h4"
          // sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          <p>{avgTemp}</p>
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
}
