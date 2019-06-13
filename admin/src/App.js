import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

function App() {

  const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

  return (
    <div className='App'>
      <Admin dataProvider={dataProvider} />;
    </div>
  );
}

export default App;
