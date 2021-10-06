/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppDispatch } from 'app/store';
import { getMe } from 'features/Auth/authSlice';
import useSocket from 'hooks/useSocket';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RoutesComponent from 'routes';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocket();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className="App">
      <RoutesComponent />
    </div>
  );
}

export default App;
