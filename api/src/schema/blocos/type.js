// Imports
import {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat,
} from 'graphql';

// Bloco type
const BlocoType = new GraphQLObjectType({
  name: 'bloco',
  description: 'Esse campo descreve um bloco da rede.',

  fields: () => ({
    hash: { type: GraphQLString, description: 'A hash do Bloco' },
    altura: { type: GraphQLInt, description: 'A altura (número) do bloco' },
    numeroTransacoes: { type: GraphQLString, description: 'Número de transações (nf + transf)' },
    outputTotal: { type: GraphQLFloat, description: '' },
    volumeTransacao: { type: GraphQLFloat, description: '' },
    dataEmissao: { type: GraphQLString, description: '' },
    dificuldade: { type: GraphQLInt, description: '' },
    totalBits: { type: GraphQLInt, description: '' },
    nonce: { type: GraphQLInt, description: '' },
    createdAt: { type: GraphQLString, description: '' },
    updatedAt: { type: GraphQLString, description: '' },
  }),
});

export default BlocoType;
