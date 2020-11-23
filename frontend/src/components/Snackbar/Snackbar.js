import React from 'react';
import SnackbarMUI from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

const AUTO_HIDE_DURATION = 5000;

const SlideTransition = (props) => <Slide {...props} direction="up" />;

export const Snackbar = ({ open, message, type = 'success', onClose }) => (
  <SnackbarMUI
    open={open}
    onClose={onClose}
    TransitionComponent={SlideTransition}
    autoHideDuration={AUTO_HIDE_DURATION}
  >
    <Alert elevation={6} variant="filled" severity={type} onClose={onClose}>
      {message}
    </Alert>
  </SnackbarMUI>
);
