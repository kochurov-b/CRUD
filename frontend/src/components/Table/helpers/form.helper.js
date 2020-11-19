export const generateForm = (fields) =>
  fields.reduce(
    (acc, { label, name, type = 'text', required = false }) => ({
      ...acc,
      [name]: {
        label,
        name,
        type,
        value: '',
        error: '',
        required,
      },
    }),
    {},
  );

export const generateFormValue = (form) =>
  Object.values(form).reduce(
    (acc, { name, value }) => ({
      ...acc,
      [name]: value,
    }),
    {},
  );

export const isSubmitButtonDisable = (form) =>
  Object.values(form).some(
    ({ value, required, error }) =>
      error.length !== 0 || (required && value.length === 0),
  );

export const valuesFormUpdate = (form, data) =>
  Object.keys(form).reduce(
    (acc, field) => ({
      ...acc,
      [field]: {
        ...form[field],
        error: '',
        value: data[field] || '',
      },
    }),
    {},
  );
