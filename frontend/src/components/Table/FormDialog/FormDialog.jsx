import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useFormDialog } from './useFormDialog';
import { isSubmitButtonDisable } from '../helpers/form.helper';

const renderField = ({
  field: { label, name, value, type, error, required },
  isFirstField,
  onChange,
}) => (
  <TextField
    key={name}
    autoFocus={isFirstField}
    fullWidth
    margin="dense"
    label={label}
    type={type}
    value={value}
    error={!!error}
    helperText={error}
    required={required}
    onChange={({ target: { value } }) => onChange({ name, value, required })}
  />
);

const renderFields = (form, onChange) =>
  Object.values(form).map((field, key) => {
    const isFirstField = key === 0;

    return renderField({ field, isFirstField, onChange });
  });

const renderContent = ({ form, loading, contentText, onChange }) => (
  <DialogContent>
    <DialogContentText>{contentText}</DialogContentText>
    <form>
      {loading && <CircularProgress size={25} />}
      {renderFields(form, onChange)}
    </form>
  </DialogContent>
);

const renderActions = ({ isSubmitButtonDisable, onClose, onSubmit }) => (
  <DialogActions>
    <Button color="primary" variant="contained" onClick={onClose}>
      Cancel
    </Button>
    <Button
      type="submit"
      color="primary"
      disabled={isSubmitButtonDisable}
      onClick={onSubmit}
    >
      Confirm
    </Button>
  </DialogActions>
);

export const FormDialog = memo(
  ({
    open,
    title,
    contentText,
    fields,
    fetchData,
    loading,
    data,
    onClose,
    onConfirm,
  }) => {
    const { form, onChange, onSubmit } = useFormDialog({
      open,
      data,
      fields,
      fetchData,
      onConfirm,
    });

    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          {renderContent({ form, loading, contentText, onChange })}
          {renderActions({
            isSubmitButtonDisable: isSubmitButtonDisable(form),
            onClose,
            onSubmit,
          })}
        </Dialog>
      </div>
    );
  },
);
