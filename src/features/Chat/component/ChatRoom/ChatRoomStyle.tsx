import { makeStyles } from '@mui/styles';

export default makeStyles({
  chatRoom: {
    backgroundColor: 'rgb(37, 35, 41)',
    height: '80vh',
    width: '100%',
    color: 'white',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {},
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#3f51b5',
    },
  },
  roomHeader: {
    position: 'relative',
    display: 'flex !important',
    flexDirection: 'row',
    backgroundColor: 'rgb(37, 35, 41)',
    height: '6vh !important',
    paddingLeft: '6%',
    boxShadow: 'rgb(26, 25, 30) 0px 3px',
    zIndex: 0,
  },
  menuIcon: {
    height: '100% !important',
    marginRight: '20px !important',
    color: 'white !important',
    backgroundColor: 'rgb(37, 35, 41) !important',
  },
  roomTitle: {
    height: '6vh',
    lineHeight: '6vh !important',
    color: ' white',
  },
  messageSender: {
    height: '14vh',
    width: '100%',
    backgroundColor: 'rgb(37, 35, 41)',
    display: 'block',
  },
  messageInput: {
    marginTop: '4vh',
    marginLeft: '5%',
    width: '90%',
    height: '50px',
    display: 'inline-block',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  messageField: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  messageTextField: {
    fontSize: '15px',
    border: 'none',
    outline: 'none',
    width: '90%',
    height: '45px',
    backgroundColor: 'rgb(60, 57, 63)',
    borderRadius: '10px',
    margin: '2.5px 10px 0px 10px',
    color: 'white',
    paddingLeft: '1%',
  },
  messageSubmit: {
    height: '45px !important',
    borderRadius: '10px!important',
    marginRight: '.5vh!important',
    marginTop: '2.5px!important',
  },
  imageInput: {
    display: 'none',
  },
  imageButton: {
    borderRadius: '10px !important',
    margin: '2.5px !important',
    height: '45px !important',
    backgroundColor: '#2F80ED !important',
    color: 'white !important',
  },
});
