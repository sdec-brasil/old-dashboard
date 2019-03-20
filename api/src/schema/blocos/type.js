// Imports
import {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLNonNull as GNN,
} from 'graphql';

// App Imports
import { GraphQLHashType, GraphQLDateTime } from '../utils';

// Bloco type
const BlocoType = new GraphQLObjectType({
  name: 'Bloco',
  description: 'Essa entidade descreve um bloco da rede.',

  fields: () => ({
    hash: { type: GNN(GraphQLHashType), description: GraphQLHashType.description },
    altura: { type: GNN(GraphQLInt), description: 'A altura (número) do bloco' },
    numeroTransacoes: { type: GNN(GraphQLString), description: 'Número de transações (nf + transf)' },
    outputTotal: { type: GNN(GraphQLFloat), description: '' },
    volumeTransacao: { type: GNN(GraphQLFloat), description: '' },
    dataEmissao: { type: GNN(GraphQLDateTime), description: GraphQLDateTime.description },
    dificuldade: { type: GNN(GraphQLInt), description: '' },
    totalBits: { type: GNN(GraphQLInt), description: '' },
    nonce: { type: GNN(GraphQLInt), description: '' },
  }),
});

export default BlocoType;
