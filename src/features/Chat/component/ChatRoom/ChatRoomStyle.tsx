import { makeStyles } from '@material-ui/styles';

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
    backgroundColor: 'rgb(60, 57, 63)',
    height: '40px',
    display: 'inline-block',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  messageField: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  messageTextField: {
    border: 'none',
    outline: 'none',
    width: '90%',
    backgroundColor: 'rgb(60, 57, 63)',
    color: 'white',
    paddingLeft: '1%',
  },
  messageSubmit: {
    height: '5vh',
    borderRadius: '10px!important',
    marginRight: '.5vh!important',
    marginTop: '.5vh!important',
  },
});
