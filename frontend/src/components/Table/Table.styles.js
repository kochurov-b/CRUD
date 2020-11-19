import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing, palette }) => ({
  paper: {
    position: 'relative',
  },
  container: {
    height: 560,
  },
  footer: {
    height: 52,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: spacing(2),
    borderTop: `1px solid ${palette.grey[300]}`,
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
