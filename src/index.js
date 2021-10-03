import React from 'react';
import ReactDOM from 'react-dom';
import GlobalContext from './Context/';
import WeatherStore from './Store/weatherStore';
import App from './App';

const weatherStore = new WeatherStore();

ReactDOM.render(
  <GlobalContext.Provider value={{ weatherStore: weatherStore }}>
    <App />
  </GlobalContext.Provider>,
  document.body
);
