import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import StoreContext from './Context/';
import Weather from './Pages/Weather';

function App() {
  return (
    <div>
      <Weather />
    </div>
  );
}

export default App;
