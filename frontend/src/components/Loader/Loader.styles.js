import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette }) => ({
  loader: {
    position: 'absolute',
    backgroundColor: fade(palette.background.paper, 0.5),
    zIndex: 999,
  },
}));
