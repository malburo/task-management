import { AppDispatch } from 'app/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getMe } from '../authSlice';

export interface ParamsTypes {
  access_token: string;
}
const OAuthLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const { access_token } = useParams<ParamsTypes>();
  useEffect(() => {
    (async () => {
      try {
        console.log(access_token);
        localStorage.setItem('access_token', access_token);
        await dispatch(getMe());
        history.push('/');
      } catch (error) {
        history.push('/auth/login');
      }
    })();
  }, [access_token, history, dispatch]);

  return <div></div>;
};

export default OAuthLogin;
