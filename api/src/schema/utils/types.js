// Imports
import {
  GraphQLEnumType, GraphQLScalarType, GraphQLError, Kind,
} from 'graphql';

// App Imports
import {
  isValidHash, validateNonNegativeFloat, validateJSDate, serializeDateTime, validateDateTime, 
  serializeDateTimeString, validateUnixTimestamp, serializeUnixTimestamp, parseDateTime,
} from './validations';

export const nonNegativeFloat = new GraphQLScalarType({
  name: 'NonNegativeFloat',
  description: 'Pontos flutuantes que terão um valor de 0 ou mais.',
  serialize(value) {
    if (validateNonNegativeFloat(value)) {
      return value;
    }
    throw new GraphQLError('NonNegativeFloats só podem representar pontos flutuantes positivos');
  },

  parseValue(value) {
    if (validateNonNegativeFloat(value)) {
      return value;
    }
    throw new GraphQLError('NonNegativeFloats só podem representar pontos flutuantes positivos');
  },

  parseLiteral(ast) {
    if (validateNonNegativeFloat(ast.value)) {
      return ast.value;
    }
    throw new GraphQLError('NonNegativeFloats só podem representar pontos flutuantes positivos');
  },
});

export const hashType = new GraphQLScalarType({
  name: 'Hash',
  description: 'Representa um valor hexadecimal resultado de uma SHA256',
  serialize: (value) => {
    if (isValidHash(value)) {
      return value;
    }
    throw new GraphQLError('Hash precisa ser resultado de uma SHA256');
  },

  parseValue: (value) => {
    if (isValidHash(value)) {
      return value;
    }
    throw new GraphQLError('Hash precisa ser resultado de uma SHA256');
  },

  parseLiteral: (ast) => {
    if (isValidHash(ast.value)) {
      return ast.value;
    }
    throw new GraphQLError('Hash precisa ser resultado de uma SHA256');
  },
});

export const dateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: `Uma string dateTime em UTC (ex: 2007-12-03T10:15:30Z) conforme descrito na seção
                5.6 do RFC 3399 de perfil para ISO 8601, padrão para representações de tempo e data 
                usando o calendário Gregoriano`,
  serialize: (value) => {
    if (value instanceof Date) {
      if (validateJSDate(value)) {
        return serializeDateTime(value);
      }
      throw new TypeError('DateTime não pode representar uma instância inválida de data');
    } else if (typeof value === 'string' || value instanceof String) {
      if (validateDateTime(value)) {
        return serializeDateTimeString(value);
      }
      throw new TypeError(`DateTime não pode representar uma string date-time inválida ${value}.`);
    } else if (typeof value === 'number' || value instanceof Number) {
      if (validateUnixTimestamp(value)) {
        return serializeUnixTimestamp(value);
      }
      throw new TypeError(`DateTime não pode representar um timestamp Unix inválido ${value}`);
    } else {
      throw new TypeError(`DateTime não pode ser obtido de um tipo não-string, não-númerico e não-Data ${JSON.stringify(value)}`);
    }
  },

  parseValue: (value) => {
    if (!(typeof value === 'string' || value instanceof String)) {
      throw new TypeError(`DateTime não pode representar um tipo não-string ${JSON.stringify(value)}`);
    }

    if (validateDateTime(value)) {
      return parseDateTime(value);
    }
    throw new TypeError(`DateTime não pode representar uma string date-time inválida ${value}.`);
  },

  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(`DateTime não pode representar um tipo não-string ${String(ast.value != null ? ast.value : null)}`);
    }
    const { value } = ast;
    if (validateDateTime(value)) {
      return parseDateTime(value);
    }
    throw new TypeError(`DateTime não pode representar uma string date-time inválida ${String(value)}.`);
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
