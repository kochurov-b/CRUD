import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing }) => ({
  actions: {
    '& > *': {
      marginRight: spacing(1),
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
}));
