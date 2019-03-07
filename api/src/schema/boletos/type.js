// Imports
import {
  GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLFloat,
} from 'graphql';

// Boleto type
const BoletoType = new GraphQLObjectType({
  name: 'boleto',
  description: '...',

  fields: () => ({
    numBoleto: { type: GraphQLString, description: '' },
    notasCorrespondentes: { type: GraphQLList(GraphQLNonNull(GraphQLString)), description: '' },
    cnpjPagador: { type: GraphQLString, description: '' },
    dataPagamento: { type: GraphQLString, description: '' },
    valorTotal: { type: GraphQLFloat, description: '' },
    dataVencimento: { type: GraphQLString, description: '' },
    status: { type: GraphQLString, description: '' },
  }),
});

export default BoletoType;
