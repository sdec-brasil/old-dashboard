// Imports
import {
  GraphQLScalarType, GraphQLError, Kind,
} from 'graphql';

// App Imports
import {
  isValidHash, validateNonNegativeFloat, validateJSDate, serializeDateTime, validateDateTime,
  serializeDateTimeString, validateUnixTimestamp, serializeUnixTimestamp, parseDateTime, 
  serializeDate, validateDate, parseDate, isUUID,
} from '../validators';

const GraphQLNonNegativeFloat = new GraphQLScalarType({
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

const GraphQLHashType = new GraphQLScalarType({
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

const GraphQLDateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: `Uma string dateTime em UTC (ex: 2007-12-03T10:15:30Z) conforme descrito na seção
                5.6 do RFC 3339 de perfil para ISO 8601, padrão para representações de tempo e data 
                usando o calendário Gregoriano`,
  serialize: (value) => {
    if (value instanceof Date) {
      if (validateJSDate(value)) {
        return serializeDateTime(value);
      }
      throw new GraphQLError('DateTime não pode representar uma instância inválida de data');
    } else if (typeof value === 'string' || value instanceof String) {
      if (validateDateTime(value)) {
        return serializeDateTimeString(value);
      }
      throw new GraphQLError(`DateTime não pode representar uma string date-time inválida ${value}.`);
    } else if (typeof value === 'number' || value instanceof Number) {
      if (validateUnixTimestamp(value)) {
        return serializeUnixTimestamp(value);
      }
      throw new GraphQLError(`DateTime não pode representar um timestamp Unix inválido ${value}`);
    } else {
      throw new GraphQLError(`DateTime não pode ser obtido de um tipo não-string, não-númerico e não-Data ${JSON.stringify(value)}`);
    }
  },

  parseValue: (value) => {
    if (!(typeof value === 'string' || value instanceof String)) {
      throw new GraphQLError(`DateTime não pode representar um tipo não-string ${JSON.stringify(value)}`);
    }

    if (validateDateTime(value)) {
      return parseDateTime(value);
    }
    throw new GraphQLError(`DateTime não pode representar uma string date-time inválida ${value}.`);
  },

  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`DateTime não pode representar um tipo não-string ${String(ast.value != null ? ast.value : null)}`);
    }
    const { value } = ast;
    if (validateDateTime(value)) {
      return parseDateTime(value);
    }
    throw new GraphQLError(`DateTime não pode representar uma string date-time inválida ${String(value)}.`);
  },
});

const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  description: `Uma data (ex: 2008-11-03) compatível com o formato 'full-date' especificado 
                na seção 5.6 do RFC 3339. `,
  serialize: (value) => {
    if (value instanceof Date) {
      if (validateJSDate(value)) {
        return serializeDate(value);
      }
      throw new GraphQLError('Date não pode representar uma instância inválida de Data');
    } else if (typeof value === 'string' || value instanceof String) {
      if (validateDate(value)) {
        return value;
      }
      throw new GraphQLError(`Date não pode representar uma string inválida ${value}.`);
    } else {
      throw new GraphQLError(`Date não pode representar um tipo não-string e não-Data ' + ${JSON.stringify(value)}.`);
    }
  },
  parseValue: (value) => {
    if (!(typeof value === 'string' || value instanceof String)) {
      throw new GraphQLError(`Date não pode representar um tipo não-string ${JSON.stringify(value)}.`);
    }

    if (validateDate(value)) {
      return parseDate(value);
    }
    throw new GraphQLError(`Date não pode representar uma string inválida ${value}.`);
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Date não pode representar um tipo não-string ${String(ast.value != null ? ast.value : null)}`);
    }
    const { value } = ast;
    if (validateDate(value)) {
      return parseDate(value);
    }
    throw new GraphQLError(`Date não pode representar uma string inválida ${String(value)}.`);
  },
});

const GraphQLUUID = new GraphQLScalarType({
  name: 'UUID',
  description: 'O scalar UUID representa valores de identificadores como especificado pelo [RFC 4122](https://tools.ietf.org/html/rfc4122).',
  serialize: (value) => {
    if (!isUUID(value)) {
      throw new TypeError(`UUID não pode representar valores que não sejam UUID: ${value}`);
    }

    return value.toLowerCase();
  },
  parseValue: (value) => {
    if (!isUUID(value)) {
      throw new TypeError(`UUID não pode representar valores que não sejam UUID: ${value}`);
    }

    return value.toLowerCase();
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      if (isUUID(ast.value)) {
        return ast.value;
      }
      throw new TypeError(`UUID não pode representar valores que não sejam UUID: ${ast.value}`);
    }

    throw new TypeError(`UUID não pode representar valores não sejam strings: ${ast.value}`);
  },
});

export {
  GraphQLNonNegativeFloat, GraphQLHashType, GraphQLDateTime, GraphQLDate, GraphQLUUID,
};
