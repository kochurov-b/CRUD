import { useState, useEffect, useMemo } from 'react';

import {
  generateForm,
  generateFormValue,
  valuesFormUpdate,
} from '../helpers/form.helper';
import { generateError } from '../helpers/error.helper';

export const useFormDialog = ({
  open,
  actionName,
  fetchData,
  data,
  fields,
  onConfirm,
}) => {
  const initialState = useMemo(() => generateForm(fields), [fields]);
  const [form, setForm] = useState(initialState);

  const actionFactory = (data) => ({
    update: () => setForm((prevState) => valuesFormUpdate(prevState, data)),
  });

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
    if (open && actionName && data !== null) {
      actionFactory(data)[actionName]();
    }
  }, [open, data, actionName]);

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
