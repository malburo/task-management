import { makeStyles } from '@mui/styles';

const useListRoomStyles = makeStyles({
  link: {
    textDecoration: 'none !important',
  },
  generalLink: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color: 'gray',
    fontWeight: 'bolder',
  },
  titleRoom: {
    paddingBottom: '10px',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bolder',
  },
  description: {
    marginLeft: '7.5%!important',
    marginRight: '7.5%!important',
    maxHeight: '15vh',
    overflow: 'hidden',
  },
  listMember: {
    marginBottom: '20px',
    overflowY: 'scroll',
  },
});

export default useListRoomStyles;
