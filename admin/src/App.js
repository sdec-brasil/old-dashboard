import React from 'react';
import { Admin, Resource, ListGuesser, ShowGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import HomePage from './components/homepage';
import DataProvider from './data/dataProvider';

import invoice from './components/Invoice';
import block from './components/Block';
import city from './components/City';

function App() {

  const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

  return (
    <div className='App'>
      <Admin dashboard={HomePage} dataProvider={DataProvider}>
        <Resource name='invoices' {...invoice} />
        <Resource name='cities' {...city} />
        <Resource name='blocks' {...block} />
      </Admin>
    </div>
  );
}

export default App;
