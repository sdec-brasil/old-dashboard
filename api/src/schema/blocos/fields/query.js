// Imports
import { GraphQLInt, GraphQLList } from 'graphql';

// App Imports
import BlocoType from '../type';
import { getAll, getByConstraint } from '../resolvers';
import { EnumBlockConstraint } from '../../utils/types';

// All Blocks
export const getBlocks = {
  type: new GraphQLList(BlocoType),
  description: 'Retorna uma lista de blocos [altura, altura - 15]. Se uma altura não é passada retorna a partir do último bloco.',
  args: {
    altura: { type: GraphQLInt },
  },
  resolve: getAll,
};

// Block By Constraint
export const getBlock = {
  type: BlocoType,
  description: 'Retorna um bloco específico segundo o argumento recebido, ou o último se nulo.',
  args: {
    id: { type: EnumBlockConstraint },
  },
  resolve: getByConstraint,
};
