import React from 'react';

import {
  UikNavPanel,
  UikNavSection,
  UikNavSectionTitle,
  UikNavLink,
  Uikon,
  UikDivider,
  UikSelect,
} from '../@uik'; // <--- new

import UikChart from './componentWrappers/UikChart';
import NavHeader from './NavHeader';
import NavStats from './NavStats';

const labels = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S',
];

const dataset = [
  {
    borderColor: '#1665D8',
    backgroundColor: '#1665D8',
    data: [
      1239,
      764,
      2013,
      836,
      1246,
      1890,
      380,
    ],
  },
];

const options = {
  events: [],
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
      },
    }],
    yAxes: [{
      display: false,
      gridLines: {
        display: false,
      },
    }],
  },
};

const dropdown = [
  {
    value: 1,
    label: '7 dias',
  },
  {
    value: 2,
    label: '14 dias',
  },
  {
    value: 3,
    label: '30 dias',
  },
];

const SideMenu = () => {
  const links = [
    ['Página Principal', 'home'],
    ['Monitoramento de Atividade', 'stats'],
    ['Empresas Emissoras', 'buildings'],
    ['Categorias e Setores', 'front_store'],
    ['Notas Fiscais', 'inbox_paper_round'],
    ['Extrato', 'multitasking'],
  ];
  return (
    <UikNavPanel style={{ height: '-webkit-fill-available' }}>
      <NavHeader title='São José dos Campos' uf='SP' imgUrl='https://i.imgur.com/Tj8KMrP.png' />
      <NavStats stats={[[456, 'Empresas'], [123, 'Notas Fiscais'], [123, 'Arrecadação']]} />
      <UikDivider />
      <UikNavSection>
        <UikNavSectionTitle>Menu do Município</UikNavSectionTitle>
        {links.map((val, i) => <UikNavLink icon={<Uikon>{val[1]}</Uikon>} key={i}>{val[0]}</UikNavLink>)}
        <UikNavSectionTitle>
            Resumo
          <div style={{ display: '-webkit-inline-box', paddingLeft: '72px' }}>
            <UikSelect excluded={[1]} placeholder='7 dias' options={dropdown} position='bottomRight' style={{ paddingleft: '70px' }} />
          </div>
        </UikNavSectionTitle>
        <UikChart
          chartType='Bar'
          data={{ labels, datasets: dataset }}
          options={options}
          height={100} />
      </UikNavSection>
      <UikDivider />
      <UikNavSection>
        <UikNavSectionTitle>Menu do Sistema </UikNavSectionTitle>
        <UikNavLink>Help Desk</UikNavLink>
        <UikNavLink>FAQ</UikNavLink>
      </UikNavSection>
    </UikNavPanel>
  );
};

export default SideMenu;
