import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useSendMessageFormStyles = makeStyles((theme: Theme) => {
  let bgColor = { bg: '#e7e7e7', text: 'default' };
  if (theme.palette.mode === 'dark') {
    bgColor.bg = 'gray';
    bgColor.text = 'white';
  }
  return createStyles({
    formField: {
      height: '80px',
      width: '100%',
      display: 'block',
    },
    messageInput: {
      marginTop: '15px',
      marginLeft: '5%',
      [theme.breakpoints.up('sm')]: {
        width: '90%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '98%',
        margin: '2.5px 1% 0px 1%',
      },
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
      backgroundColor: bgColor.bg,
      color: bgColor.text,
      borderRadius: '10px',
      margin: '2.5px 10px 0px 10px',
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
      height: '45px !important',
      boxShadow: 'none',
      width: '56px',
      marginLeft: '5px !important',
    },
  });
});

export default useSendMessageFormStyles;
