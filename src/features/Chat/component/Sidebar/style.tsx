import { makeStyles } from '@mui/styles';

const sidebarAppChatStyle = makeStyles({
  sidebar: {
    backgroundColor: 'rgb(18, 15, 19)',
    height: '90vh',
    width: '100%',
    color: 'gray',
    overflow: 'hidden',
  },
  sidebarHeader: {
    margin: '3vh 7.5% 3vh 7.5%',
  },
  searchField: {
    margin: '3vh 7.5% 3vh 7.5%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'white',
    color: 'white',
    height: '6vh',
    borderRadius: '10px',
    display: 'flex',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'white',
    color: 'gray',
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
    color: 'gray',
  },
  listChanels: {
    height: '70vh',
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

export default sidebarAppChatStyle;
