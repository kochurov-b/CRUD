import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing, palette }) => ({
  app: {
    height: `calc(100vh - ${spacing(6)}px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing(3),
    backgroundColor: palette.background.default,
  },
  container: {
    width: '100%',
    maxWidth: 750,
  },
}));
