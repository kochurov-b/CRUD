const EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const SPECIAL_ERROR_FACTORY = {
  email: (value) => emailValidationError(value),
};

const requiredFieldError = (value, required) =>
  value.trim() === '' && required ? 'Required field' : '';

const emailValidationError = (value) =>
  EMAIL_ADDRESS_REGEX.test(value) ? '' : 'Incorrect email';

export const generateError = ({ name, value, required }) => {
  const specialError = SPECIAL_ERROR_FACTORY[name];

  if (!specialError) return requiredFieldError(value, required);

  return specialError(value);
};
