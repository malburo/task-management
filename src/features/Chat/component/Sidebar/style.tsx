import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const sidebarAppChatStyle = makeStyles((theme: Theme) => {
  let sfColor = { bg: 'white', text: 'white' };
  if (theme.palette.mode === 'dark') {
    sfColor.bg = 'gray';
  }
  return createStyles({
    surface: {
      padding: '20px 7.5% 20px 7.5%',
    },
    sidebarHeader: {
      // margin: '3vh 7.5% 3vh 7.5%',
    },
    searchField: {
      margin: '3vh 0 3vh 0',
      border: 'none',
      outline: 'none',
      backgroundColor: sfColor.bg,
      height: '55px',
      borderRadius: '10px',
      display: 'flex',
    },
    searchInput: {
      border: 'none',
      outline: 'none',
      backgroundColor: sfColor.bg,
      borderRadius: '10px',
      width: '70%',
      fontSize: '1rem',
      '&::-internal-autofill-selected': {
        backgroundColor: '0 0 0px 1000px white inset',
      },
    },
    searchIcon: {
      height: '6vh!important',
      marginLeft: '10px',
    },
    listChanels: {
      height: '70vh',
      width: '105%',
      overflowY: 'scroll',
    },
    avatar: {
      borderRadius: '5px',
      textTransform: 'uppercase',
      marginRight: '1em  !important',
      textAlign: 'center',
      width: '40px',
    },
  });
});

export default sidebarAppChatStyle;
