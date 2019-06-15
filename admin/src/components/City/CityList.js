/* eslint react/jsx-key: off */
import React from 'react';
import {
    Datagrid,
    List,
    TextField,
    NumberField,
    ShowButton
} from 'react-admin';

const InvoiceList = props => (
  <List {...props}>
    <Datagrid >
      <TextField label='Nome' source='municipio.nome' />  
      <TextField label='Estado' source='municipio.uf' />  
      <TextField label='Região' source='municipio.regiao.nomeRegiao' />  
      <TextField label='CNPJ' source='cnpj' />
      <TextField label='Código IBGE' source='id' />
      <ShowButton />
    </Datagrid>
  </List>
);

export default InvoiceList;