import './App.css';
import ChatFeature from './features/Chat/ChatApp';
import { ThemeProvider,  createTheme } from '@material-ui/core/styles';
const theme = createTheme();
function App() {
  return (  
    <ThemeProvider theme={theme}><ChatFeature /></ThemeProvider>    
  );
}

export default App;
