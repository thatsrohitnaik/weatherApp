import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { getIcon } from '../../../Util/icon';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles({
  text: {
    textAlign: 'left',
    color: 'white',
    margin: 0,
    marginTop: '-10px',
  },
});

function SlideClouds({ value }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {value.data.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  overflow: 'hidden',
                  width: '90px',
                  height: '90px',
                }}
                src={getIcon(step.weather[0].icon)}
                alt={step.label}
              />
            ) : null}
            <Typography
              variant="p"
              component="h6"
              className={classes.text}
              // sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {step.hour + ' ' + step.weather[0].description}
            </Typography>
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default SlideClouds;
