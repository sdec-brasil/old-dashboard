// Imports
import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';

// App Imports
import BlocoType from '../type';
import { getAll, getByHash, getByHeight } from '../resolvers';

// All Blocks
export const blocks = {
  type: new GraphQLList(BlocoType),
  resolve: getAll,
};

// Block By Hash
export const hashBlock = {
  type: BlocoType,
  args: {
    hash: { type: GraphQLString },
  },
  resolve: getByHash,
};

// Block By Height
export const heightBlock = {
  type: BlocoType,
  args: {
    altura: { type: GraphQLInt },
  },
  resolve: getByHeight,
};
