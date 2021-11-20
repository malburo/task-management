import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const chatPageStyles = makeStyles((theme: Theme) => {
  let bgColor = '#f8f9fa';
  if (theme.palette.mode === 'dark') bgColor = '#242424';
  return createStyles({
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
      backgroundColor: bgColor,
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    chatBoxHeader: {
      height: '30px',
      padding: '7.5px 0 7.5px 20px',
      position: 'relative',
      boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
    },
    chatBox: {
      width: '-webkit-fill-available',
      marginTop: '80px',
      marginLeft: '2.5%',
      height: '90%',
      marginRight: '2.5%',
      borderRadius: '15px',
      overflow: 'hidden',
      backgroundColor: bgColor,
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    messagesField: {
      height: 'calc(100% - 120px)',
    },
    sendMessageField: {
      height: '90px',
    },
    accessDeny: {
      width: '-webkit-fill-available',
      marginTop: '80px',
      marginLeft: '2.5%',
      height: '90%',
      marginRight: '2.5%',
      borderRadius: '15px',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '50px',
    },
  });
});

export default chatPageStyles;
