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
      <TextField label='TxId' source='id' />
      <TextField label='Endereço Emissor' source='enderecoEmissor' />
      <TextField label='# Bloco' source='blocoConfirmacaoId' />
      <TextField label='Status' source='estado' />
      <TextField label='Substituiu' source='substitutes' />
      <TextField label='Substituída por' source='substitutedBy' /> 
      <ShowButton />
    </Datagrid>
  </List>
);

export default InvoiceList;