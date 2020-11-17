import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing }) => ({
  paper: {
    position: 'relative',
  },
  container: {
    height: 560,
  },
  footer: {
    height: 52,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loaderFooter: {
    padding: spacing(0, 2),
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9,
  },
}));
