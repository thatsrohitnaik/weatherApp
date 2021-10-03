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

  const data = toJS(props.data);

  console.log(data);

  // if (!toJS(data)?.main) {
  //   return null;
  // }

  return (
    <Typography
      key={3}
      variant="p"
      component="h5"
      className={classes.text}
      // sx={{ fontSize: 14 }}
      color="text.secondary"
      gutterBottom
    >
      {'feelslike'}
    </Typography>
  );
};

export default details;
