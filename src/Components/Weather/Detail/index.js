import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { toJS } from 'mobx';

const useStyles = makeStyles({
  text: {
    textAlign: 'left',
    color: 'white',
  },
});

const details = (props) => {
  const classes = useStyles();
  if (!props.data) {
    return null;
  }
  const { data } = toJS(props);
  const { main } = data;

  return (
    <>
      <Typography
        key={3}
        variant="p"
        component="h5"
        className={classes.text}
        // sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        {'feelslike' + main.feels_like}
      </Typography>
    </>
  );
};

export default details;
