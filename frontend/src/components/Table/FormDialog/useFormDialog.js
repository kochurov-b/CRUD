import { useState } from 'react';

import { generateForm, generateFormValue } from '../helpers/form.helper';
import { generateError } from '../helpers/error.helper';

export const useFormDialog = (fields, onConfirm) => {
  const initialState = generateForm(fields);
  const [form, setForm] = useState(initialState);

  const handleChange = ({ name, value, required }) =>
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
        error: generateError({ name, value, required }),
      },
    }));

  const handleSubmit = () => {
    onConfirm(generateFormValue(form));
    setForm(initialState);
  };

  return { form, onChange: handleChange, onSubmit: handleSubmit };
};
