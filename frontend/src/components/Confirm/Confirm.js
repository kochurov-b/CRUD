import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const renderContent = (description) => (
  <DialogContent>
    <DialogContentText>{description}</DialogContentText>
  </DialogContent>
);

const renderActions = (onClose, onConfirm) => (
  <DialogActions>
    <Button color="primary" variant="contained" onClick={onClose}>
      Cancel
    </Button>
    <Button color="primary" onClick={onConfirm}>
      Confirm
    </Button>
  </DialogActions>
);

export const Confirm = memo(
  ({ open, title, description, onConfirm, onClose }) => (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {renderContent(description)}
      {renderActions(onClose, onConfirm)}
    </Dialog>
  ),
);
