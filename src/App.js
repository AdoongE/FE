import { StyledEngineProvider } from '@mui/material';
import './App.css';
import Router from './routes/router';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <GlobalStyle />
      <Router />
    </StyledEngineProvider>
  );
}

export default App;
