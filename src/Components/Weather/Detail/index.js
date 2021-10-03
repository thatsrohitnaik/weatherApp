import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  text: {
    textAlign: 'left',
    color: 'white',
  },
});

const details = (props) => {
  const classes = useStyles();
  console.log(props);
  if (!props) {
    return null;
  }
  const { main } = props;

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
      ></Typography>
    </>
  );
};

export default details;
