import { makeStyles } from '@mui/styles';

const chatPageStyles = makeStyles({
  surface: {
    display: 'flex',
    justifyContent: 'column',
  },
  chatAppBox: {
    width: '30%',
    height: '90%',
    borderRadius: '20px',
    backgroundColor: '#f8f9fd',
    marginLeft: '2.5%',
    marginTop: '80px',
  },
  chatBox: {
    marginTop: '80px',
    marginLeft: '2.5%',
    backgroundColor: '#f8f9fd',
    height: '90%',
    width: '60%',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  messagesField: {
    height: 'calc(100% - 80px)',
  },
  sendMessageField: {
    height: '80px',
  },
});

export default chatPageStyles;
