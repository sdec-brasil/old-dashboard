// Imports
import { GraphQLEnumType, GraphQLScalarType } from 'graphql';

export const hashType = new GraphQLScalarType({
  name: 'Hash',
  description: 'Representa um valor hexadecimal resultado de uma SHA256',
  serialize: (value) => {
    // todo: create isValidHash()
    if (true) {
      return value;
    }
    throw new Error('Hash cannot represent an invalid SHA256 hash string');
  },

  parseValue: (value) => {
    // todo: create isValidHash()
    if (true) {
      return value;
    }
    throw new Error('Hash cannot represent an invalid SHA256 hash string');
  },

  parseLiteral: (ast) => {
    // todo: create isValidHash()
    if (true) {
      return ast.value;
    }
    throw new Error('Hash cannot represent an invalid SHA256 hash string');
  },
});

export const EnumBlockConstraint = new GraphQLEnumType({
  name: 'BlockConstraint',
  description: 'Identificadores únicos de um bloco na rede.',
  values: {
    hash: hashType,
    altura: { value: 1, description: 'Um inteiro que repsenta o número do Bloco procurado' },
  },
});
