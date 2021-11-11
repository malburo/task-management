import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const chatPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      display: 'flex',
      justifyContent: 'column',
    },
    chatAppSidebar: {
      width: '30%',
      height: '90%',
      borderRadius: '15px',
      marginLeft: '2.5%',
      marginTop: '80px',
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    chatBoxHeader: { height: '30px', padding: '7.5px 0 7.5px 20px' },
    chatBox: {
      marginTop: '80px',
      marginLeft: '2.5%',
      height: '90%',
      width: '60%',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    messagesField: {
      height: 'calc(100% - 120px)',
    },
    sendMessageField: {
      height: '90px',
    },
  })
);

export default chatPageStyles;
