import { Kind, GraphQLError, GraphQLScalarType } from 'graphql';

const EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validate = (value) => {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  if (!EMAIL_ADDRESS_REGEX.test(value)) {
    throw new TypeError(`Value is not a valid email address: ${value}`);
  }

  return value;
};

const parseLiteral = ({ kind, value }) => {
  if (kind !== Kind.STRING) {
    throw new GraphQLError(
      `Can only validate strings as email addresses but got a: ${kind}`,
    );
  }

  return validate(value);
};

export const emailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'Email scalar type',
  parseValue: validate,
  serialize: validate,
  parseLiteral,
});
