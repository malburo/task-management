import { makeStyles } from '@mui/styles';

export default makeStyles({
  message: {
    boxSizing: 'border-box',
    display: 'flex',
    marginTop: '4vh',
    marginBottom: '4vh',
    paddingLeft: '6%',
    paddingRight: '30%',
  },
  avatar: {
    height: '5vh',
    marginRight: '2%',
  },
  imageContent: {
    maxWidth: '40vw',
  },
  avatarImg: {
    height: '45px',
    width: '45px',
    borderRadius: '5px',
  },
  accountInfor: {
    display: 'flex',
    height: '20px',
    marginBottom: '1%',
    minWidth: '200px',
  },

  image: {
    maxWidth: '40vw !important',
  },
  name: {
    margin: '0 3% 0 2%!important',
  },
  messageContent: {
    backgroundColor: 'black',
    color: 'white!important',
    padding: '1rem',
    borderRadius: '20px',
  },
  linkPreview: {
    width: '100%',
    maxWidth: '80vw',
  },
});
