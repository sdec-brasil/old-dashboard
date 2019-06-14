import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import UserList from './components/users.js';
import HomePage from './components/homepage';

function App() {

  const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

  return (
    <div className='App'>
      <Admin dashboard={HomePage} dataProvider={dataProvider}>
        <Resource name='users' list={UserList} />
      </Admin>
    </div>
  );
}

export default App;
