import React from 'react';
import ReactDOM from 'react-dom';
import StoreContext from './Context/';
import WeatherStore from './Store/weatherStore';
import App from './App';

const weatherStore = new WeatherStore();

ReactDOM.render(
  <StoreContext.Provider value={{ weatherStore: weatherStore }}>
    <App />
  </StoreContext.Provider>,
  document.body
);

// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
