import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  horizontalRule: {
    display: 'flex',
    marginTop: '5vh',
    marginBottom: '5vh',
    marginRight: '6vh',
    marginLeft: '6vh',
  },
  hrElement: {
    backgroundColor: 'gray',
    border: 'none',
    height: '1.2px',
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
