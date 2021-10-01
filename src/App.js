import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import StoreContext from './Context/';
import Weather from './Pages/Weather';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './style.css';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box>
          <Weather />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
