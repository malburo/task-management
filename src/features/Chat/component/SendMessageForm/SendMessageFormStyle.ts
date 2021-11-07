import { makeStyles } from '@mui/styles';

export default makeStyles({
  formField: {
    height: '80px',
    width: '100%',
    display: 'block',
  },
  messageInput: {
    marginTop: '15px',
    marginLeft: '5%',
    width: '90%',
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
    backgroundColor: '#e7e7e7',
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
    margin: '2.5px !important',
    height: '45px !important',
    backgroundColor: '#2F80ED !important',
    color: 'white !important',
  },
});
