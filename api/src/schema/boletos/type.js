// Imports
import {
  GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLFloat,
} from 'graphql';

// App Imports
import { GraphQLDate, EnumBoletoStatus } from '../utils/types';

// Boleto type
const BoletoType = new GraphQLObjectType({
  name: 'Boleto',
  description: 'Essa entidade descreve um boleto de pagamento de notas fiscais',

  fields: () => ({
    numBoleto: { type: GraphQLNonNull(GraphQLString), description: '' },
    notasCorrespondentes: { type: GraphQLList(GraphQLNonNull(GraphQLString)), description: '' },
    cnpjPagador: { type: GraphQLNonNull(GraphQLString), description: '' },
    dataPagamento: { type: GraphQLNonNull(GraphQLDate), description: '' },
    valorTotal: { type: GraphQLNonNull(GraphQLFloat), description: '' },
    dataVencimento: { type: GraphQLNonNull(GraphQLDate), description: '' },
    status: { type: GraphQLNonNull(EnumBoletoStatus), description: '' },
  }),
});

export default BoletoType;
