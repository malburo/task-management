import { useEffect } from 'react';
import RoutesComponent from 'routes';
import socketClient from 'socket.io-client';

function App() {
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
