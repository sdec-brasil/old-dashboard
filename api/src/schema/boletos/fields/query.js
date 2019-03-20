// Imports
import {
  GraphQLList, GraphQLNonNull as GNN, GraphQLString,
} from 'graphql';

// App Imports
import BoletoType from '../type';
import { getFromEntityWithStatus, getByID } from '../resolvers';
import { EnumBoletoStatus, GraphQLUUID } from '../../utils';

// Get a single boleto through the ID
export const getBoleto = {
  type: BoletoType,
  description: 'Retorna um boleto específico segundo o seu ID',
  args: {
    id: { type: GNN(GraphQLUUID) },
  },
  resolve: getByID,
};

// Get all boletos with the determined status of a certain entity
export const getBoletos = {
  type: GraphQLList(BoletoType),
  description: 'Retorna todos os boletos de uma entidade com o status passado.',
  args: {
    entidade: { type: GNN(GraphQLString), description: 'CNPJ correspondente à Empresa que emitiu o Boleto' },
    status: { type: GNN(EnumBoletoStatus), description: EnumBoletoStatus.description },
  },
  resolve: getFromEntityWithStatus,
};
