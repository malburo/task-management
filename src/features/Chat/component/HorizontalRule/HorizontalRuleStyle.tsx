import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    horizontalRule: {
      display: 'flex',
      marginTop: '4vh',
      marginBottom: '4vh',
      marginRight: '6vh',
      marginLeft: '6vh',
    },
    hrElement: {
      backgroundColor: 'gray',
      border: 'none',
      height: '1.75px',
      [theme.breakpoints.up('sm')]: {
        width: '40%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '20%',
      },
    },
    timeElement: {
      color: 'white!important',
      textAlign: 'center',
    },
  })
);
