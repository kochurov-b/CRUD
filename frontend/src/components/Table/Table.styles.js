import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing, palette }) => ({
  paper: {
    position: 'relative',
  },
  container: {
    position: 'relative',
    height: 560,
  },
  footer: {
    position: 'relative',
    height: 52,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: spacing(2),
    borderTop: `1px solid ${palette.grey[300]}`,
  },
}));
