import { AppDispatch } from 'app/store';
import { getMe } from 'features/Auth/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RoutesComponent from 'routes';
import socketClient from 'socket.io-client';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    const socket = socketClient('http://localhost:8001');
    socket.on('connect', () => {
      console.log(`I'm connected with the back-end`);
    });
  }, []);
  return (
    <div className="App">
      <RoutesComponent />
    </div>
  );
}

export default App;
