import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './Loader.styles';

export const Loader = ({ open, size }) => {
  const classes = useStyles();
  const transitionDuration = {
    appear: 1000,
    enter: 100,
    exit: 500,
  };

  return (
    <Backdrop
      open={open}
      transitionDuration={transitionDuration}
      className={classes.loader}
    >
      <CircularProgress size={size} />
    </Backdrop>
  );
};
