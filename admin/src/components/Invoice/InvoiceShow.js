/* eslint react/jsx-key: off */
import React from 'react';
import PropTypes from 'prop-types';
import { Show, Tab, TabbedShowLayout, TextField, ReferenceField } from 'react-admin'; // eslint-disable-line import/no-unresolved

const InvoiceShow = (props) => {
  const MaybeField = ({field, record, label}) => {
    return !record[field] ? <TextField label={label} source={field} /> : null;
  };

  return (
    <Show {...props}>
      <TabbedShowLayout {...props}>
        <Tab label='Raíz' {...props}>
          <TextField label='TxId' source='id' />
          <TextField label='Endereço Emissor' source='enderecoEmissor' />
          <TextField label='# Bloco' source='blocoConfirmacaoId' />
          <MaybeField label='Substituiu' field='substitutes' record={props.record} />
          <MaybeField label='Substituída por' field='substitutedBy' record={props.record} />
          <TextField label='Status' source='estado' />
        </Tab>
        <Tab label='Prestação' path='prestacao'>
          <ReferenceField label='Prefeitura/UF' source='prestacao.prefeituraIncidencia' reference='cities'>
            <TextField source='municipio.nome' />
          </ReferenceField>
          <TextField label='Data' source='prestacao.competencia' />
          <TextField label='Base de Cálculo' source='prestacao.baseCalculo' />
          <TextField label='Código do Serviço' source='prestacao.codServico' />
        </Tab>
        <Tab label='Tomador' path='tomador' />
        <Tab label='Intermediário' path='intermediario' />
        <Tab label='Construção Civil' path='construcao_civil' />
      </TabbedShowLayout>
    </Show>
  );
}

InvoiceShow.propTypes = {
    field: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    label: PropTypes.string,
}; 

export default InvoiceShow;