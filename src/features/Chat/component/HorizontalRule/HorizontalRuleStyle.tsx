import { makeStyles } from '@material-ui/styles';

export default makeStyles({
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
      // eslint-disable-next-line
      ['@media (min-width:780px)']: {
        width: '40%',
      },
      // eslint-disable-next-line
      ['@media (max-width:780px)']: {
        width: '20%',
      },
    },
    timeElement: {
      color: 'white!important',
      textAlign: 'center',
    },
});
