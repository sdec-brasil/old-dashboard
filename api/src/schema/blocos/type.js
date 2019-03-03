// Imports
import {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat,
} from 'graphql';

// Bloco type
const BlocoType = new GraphQLObjectType({
  name: 'bloco',
  description: 'Esse campo descreve um bloco da rede.',

  fields: () => ({
    hash: { type: GraphQLString },
    altura: { type: GraphQLInt },
    numeroTransacoes: { type: GraphQLString },
    outputTotal: { type: GraphQLFloat },
    volumeTransacao: { type: GraphQLFloat },
    dataEmissao: { type: GraphQLString },
    dificuldade: { type: GraphQLInt },
    totalBits: { type: GraphQLInt },
    nonce: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

export default BlocoType;
