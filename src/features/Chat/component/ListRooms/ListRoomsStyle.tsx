import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  link: {
    textDecoration: 'none !important',
  },
  title: {
    margin: '3vh 7.5% 1vh 7.5% !important',
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bolder',
  },
  description: {
    marginLeft: '7.5%!important',
    marginRight: '7.5%!important',
    height: '15vh',
    overflow: 'hidden',
  },
  listMember: {
    height: '50vh',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0.2em',
    },
    '&::-webkit-scrollbar-track': {},
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#3f51b5',
    },
  },
});
