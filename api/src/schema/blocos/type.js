// Imports
import {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat,
} from 'graphql';

// App Imports
import { hashType, dateTime } from '../utils/types';

// Bloco type
const BlocoType = new GraphQLObjectType({
  name: 'bloco',
  description: 'Esse campo descreve um bloco da rede.',

  fields: () => ({
    hash: { type: hashType, description: hashType.description },
    altura: { type: GraphQLInt, description: 'A altura (número) do bloco' },
    numeroTransacoes: { type: GraphQLString, description: 'Número de transações (nf + transf)' },
    outputTotal: { type: GraphQLFloat, description: '' },
    volumeTransacao: { type: GraphQLFloat, description: '' },
    dataEmissao: { type: dateTime },
    dificuldade: { type: GraphQLInt, description: '' },
    totalBits: { type: GraphQLInt, description: '' },
    nonce: { type: GraphQLInt, description: '' },
    createdAt: { type: dateTime, description: dateTime.description },
    updatedAt: { type: dateTime, description: dateTime.description },
  }),
});

export default BlocoType;
