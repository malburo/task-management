import { makeStyles } from '@mui/styles';

export default makeStyles({
  roomLink: {
    display: 'flex',
    height: '60px !important',
    // eslint-disable-next-line
    margin: '10px 7.5% 10px 7.5%',
  },
  roomLinkHightLight: {
    display: 'flex',
    height: '60px !important',
    backgroundColor: 'rgb(37, 35, 41)',
    borderRadius: '13px',
    // eslint-disable-next-line
    margin: '10px 7.5% 10px 7.5%',
  },
  online: {
    '&:after': {
      content: `'a'`,
      position: 'absolute',
      color: 'transparent',
      width: '10px',
      height: '10px',
      backgroundColor: 'lightgreen',
      borderRadius: '50%',
      transform: 'translate(5px, 5px)',
    },
  },
  avatarImg: {
    transform: 'scale(0.75,0.75)',
    borderRadius: '10px',
  },
  roomName: {
    lineHeight: '60px !important',
    marginLeft: '5%!important',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
  },
  newMessage: {
    backgroundColor: 'red',
    height: '30px',
    textAlign: 'center',
    marginLeft: '10px !important',
    width: '30px',
    borderRadius: '50%',
  },
});
