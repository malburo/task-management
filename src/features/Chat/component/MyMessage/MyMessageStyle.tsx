import { makeStyles } from '@mui/styles';

export default makeStyles({
  message: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    marginTop: '4vh',
    marginBottom: '4vh',
    paddingRight: '6%',
    paddingLeft: '30%',
    justifyContent: 'flex-end',
  },
  avatar: {
    height: '5vh',
    marginLeft: '2%',
  },
  avatarImg: {
    height: '5vh',
    width: '5vh',
    borderRadius: '5px',
  },
  accountInfor: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '20px',
    marginBottom: '1%',
  },
  date: {
    margin: '0 2% 0 0',
  },
  messageContent: {
    backgroundColor: 'white',
    color: 'black',
    padding: '1rem',
    borderRadius: '20px',
    textAlign: 'right',
  },
});
