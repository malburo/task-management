import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Header from './Header';

const useStyles = makeStyles(() => ({
  wrapper: {
    fontFamily: 'Noto Sans,sans-serif',
    marginTop: 160,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function NotFound() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <p>
          Sorry, this page isn't available. Go back to{' '}
          <Link to="/">
            <span>Bullo app</span>
          </Link>
        </p>
      </div>
    </>
  );
}

export default NotFound;
