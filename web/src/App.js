import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';

import Store from './store';
import SideMenu from './components/SideMenu';
import './@uik/styles.css';

function App() {
  return (
    <Provider store={Store}>
      <SideMenu />
    </Provider>
  );
}

export default App;
