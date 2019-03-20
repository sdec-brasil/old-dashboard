// Imports
import { GraphQLEnumType } from 'graphql';

// App Imports
import { GraphQLHashType } from '../customScalarTypes';

const EnumBlockConstraint = new GraphQLEnumType({
  name: 'BlockConstraint',
  description: 'Identificadores únicos de um bloco na rede.',
  values: {
    hash: GraphQLHashType,
    altura: { value: 1, description: 'Um inteiro que repsenta o número do Bloco procurado' },
  },
});

const EnumBoletoStatus = new GraphQLEnumType({
  name: 'BoletoStatus',
  description: 'Status de um boleto no Sistema.',
  values: {
    pendente: { value: 0, description: 'Boleto emitido e dentro do prazo de validade.' },
    pago: { value: 1, description: 'Boleto emitido e pago dentro do prazo de validade.' },
    vencido: { value: 2, description: 'Boleto vencido e não pago.' },
    cancelado: { value: 3, description: 'Boleto cancelado antes do seu prazo de validade. '}
  },
});

export { EnumBlockConstraint, EnumBoletoStatus };
