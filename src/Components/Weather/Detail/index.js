import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { toJS } from 'mobx';

const useStyles = makeStyles({
  text: {
    textAlign: 'left',
    color: 'black',
  },
});

const details = (props) => {
  const classes = useStyles();
  const data = toJS(props.data);

  if (!data?.main) {
    return null;
  }

  return (
    <div>
      <Typography
        key={3}
        variant="p"
        component="h5"
        className={classes.text}
        // sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        {'Feels Like' + data.main.feels_like}
      </Typography>
    </div>
  );
};

export default details;
