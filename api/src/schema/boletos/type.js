// Imports
import {
  GraphQLObjectType, GraphQLString, GraphQLNonNull as GNN, GraphQLList, GraphQLFloat,
} from 'graphql';

// App Imports
import { GraphQLDate, EnumBoletoStatus } from '../utils/types';

// Boleto type
const BoletoType = new GraphQLObjectType({
  name: 'Boleto',
  description: 'Essa entidade descreve um boleto de pagamento de notas fiscais',

  fields: () => ({
    numBoleto: { type: GNN(GraphQLString), description: '' },
    notasCorrespondentes: { type: GraphQLList(GNN(GraphQLString)), description: '' },
    cnpjPagador: { type: GNN(GraphQLString), description: '' },
    dataPagamento: { type: GNN(GraphQLDate), description: '' },
    valorTotal: { type: GNN(GraphQLFloat), description: '' },
    dataVencimento: { type: GNN(GraphQLDate), description: '' },
    status: { type: GNN(EnumBoletoStatus), description: '' },
  }),
});

export default BoletoType;
