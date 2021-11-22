import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const chatPageStyles = makeStyles((theme: Theme) => {
  // let bgColor = '#f8f9fa';
  // if (theme.palette.mode === 'dark') bgColor = '#242424';
  return createStyles({
    surface: {
      display: 'flex',
      justifyContent: 'column',
      marginTop: '65px',
      padding: '48px',
    },
    chatAppSidebar: {
      width: '33.333%',
      borderRadius: '15px',
      backgroundColor: 'white',
      marginRight: '24px',
      boxShadow: '0 8px 30px rgb(0 0 0 / 12%)',
    },
    chatBoxHeader: {
      height: '30px',
      padding: '7.5px 0 7.5px 20px',
      position: 'relative',
      boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
    },
    chatBox: {
      width: '-webkit-fill-available',
      borderRadius: '15px',
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: '0 8px 30px rgb(0 0 0 / 12%)',
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
