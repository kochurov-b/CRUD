import { useState, useEffect, useMemo } from 'react';

import {
  generateForm,
  generateFormValue,
  valuesFormUpdate,
} from '../helpers/form.helper';
import { generateError } from '../helpers/error.helper';

export const useFormDialog = ({ open, fetchData, data, fields, onConfirm }) => {
  const initialState = useMemo(() => generateForm(fields), []);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, fetchData]);

  useEffect(() => {
    if (!open) {
      setForm(initialState);
    }
  }, [open, initialState]);

  useEffect(() => {
    if (data !== null) {
      setForm((prevState) => valuesFormUpdate(prevState, data));
    }
  }, [data]);

  const handleChange = ({ name, value, required }) =>
    setForm((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
        error: generateError({ name, value, required }),
      },
    }));

  const handleSubmit = () => onConfirm(generateFormValue(form));

  return { form, onChange: handleChange, onSubmit: handleSubmit };
};
