import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export default makeStyles((theme: Theme) => {
  let sfColor = { bg: '#e7e7e7', text: 'black' };
  if (theme.palette.mode === 'dark') {
    sfColor.bg = '#2F80ED';
    sfColor.text = 'white';
  }
  return createStyles({
    message: {
      boxSizing: 'border-box',
      width: '100% !important',
      display: 'flex',
      marginTop: '4vh',
      marginBottom: '4vh',
      paddingRight: '3%',
      paddingLeft: '30%',
      justifyContent: 'flex-end',
    },
    avatar: {
      height: '5vh',
      marginLeft: '2%',
    },
    avatarImg: {
      height: '45px',
      width: '45px',
      borderRadius: '5px',
    },
    accountInfor: {
      display: 'flex',
      justifyContent: 'flex-end',
      height: '20px',
      marginBottom: '1%',
    },
    date: {
      margin: '0 2% 0 0',
    },
    messageContent: {
      backgroundColor: sfColor.bg,
      color: sfColor.text,
      padding: '1rem',
      borderRadius: '20px',
      textAlign: 'right',
      [theme.breakpoints.up('md')]: {
        maxWidth: '70%',
      },
      [theme.breakpoints.down('md')]: {
        maxWidth: '50%',
      },
    },
    imageContent: {
      maxWidth: '200px',
    },
    iconButtonTool: {
      backgroundColor: 'transparent !important',
      width: '20px  !important',
      height: '20px !important',
      padding: '15px !important',
      '&:hover': {
        backgroundColor: 'gray !important',
      },
    },
    image: {
      cursor: 'pointer',
      maxWidth: '100%',
    },
    editForm: {
      width: '40vw',
      padding: '0 2vw 2vw 2vw',
    },
    linkPreview: {
      width: '100%',
      maxWidth: '80vw',
    },
    option: {
      margin: '10px 10px 10px 0',
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: '32px !important',
      height: 'auto',
    },
    optionValue: { textAlign: 'initial', marginRight: '20px' },
  });
});
