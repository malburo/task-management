import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  footerLayout: {
    height: '10vh'
  },
  profileButton: {
    backgroundColor: 'rgb(10, 7, 9)  !important',
    padding: '0',
    borderRadius: '0 !important',
    width: '100%',
    height: '10vh !important',
    zIndex: 0,
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'flex-start  !important',
    textTransform: 'none',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: 'rgb(10, 7, 9)  !important',
    },
  },
  profileOptionList: {
    backgroundColor: 'rgb(37, 35, 41) !important',
    borderRadius: '10px',
    padding: '5px',
  },
  profileOptionIcon: {
    marginRight: '0.5em',
  },
  profileOptionHr: {
    height: '.5px',
    backgroundColor: 'gray',
    border: 'none',
    width: '80%',
    marginLeft: '10%',
  },
  profileNormalOptionItem: {
    color: 'white !important',
    padding: '10px',
    margin: '0 10px 0 10px',
    borderRadius: '10px !important',
    '&:hover': {
      backgroundColor: 'rgb(57, 55, 61)  !important',
    },
  },
  profileLogOutOptionItem: {
    color: 'red  !important',
    padding: '10px',
    margin: '0 10px 0 10px',
    borderRadius: '10px  !important',
    '&:hover': {
      backgroundColor: 'rgb(57, 55, 61)  !important',
    },
  },
  avatarImg: {
    marginLeft: '7.5%',
    height: '6vh',
    width: '6vh',
    borderRadius: '5px',
  },
  username: {
    lineHeight: '6vh !important',
    marginLeft: '5% !important',
    color: 'white',
    textTransform: 'none',
  },
});
