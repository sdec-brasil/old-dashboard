// Imports
import { GraphQLObjectType } from 'graphql';

// App Imports
import * as thought from './thoughts/fields/query';
import * as block from './blocos/fields/query';

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: '...',

  fields: () => ({
    ...thought, ...block,
  }),
});

export default query;
