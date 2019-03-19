// Imports
import {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLNonNull, 
} from 'graphql';

// App Imports
import { hashType, dateTime } from '../utils/types';

// Bloco type
const BlocoType = new GraphQLObjectType({
  name: 'Bloco',
  description: 'Essa entidade descreve um bloco da rede.',

  fields: () => ({
    hash: { type: GraphQLNonNull(hashType), description: hashType.description },
    altura: { type: GraphQLNonNull(GraphQLInt), description: 'A altura (número) do bloco' },
    numeroTransacoes: { type: GraphQLNonNull(GraphQLString), description: 'Número de transações (nf + transf)' },
    outputTotal: { type: GraphQLNonNull(GraphQLFloat), description: '' },
    volumeTransacao: { type: GraphQLNonNull(GraphQLFloat), description: '' },
    dataEmissao: { type: GraphQLNonNull(dateTime), description: dateTime.description },
    dificuldade: { type: GraphQLNonNull(GraphQLInt), description: '' },
    totalBits: { type: GraphQLNonNull(GraphQLInt), description: '' },
    nonce: { type: GraphQLNonNull(GraphQLInt), description: '' },
  }),
});

export default BlocoType;
