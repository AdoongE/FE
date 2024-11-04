import './App.css';
import { StyledEngineProvider } from '@mui/styled-engine';
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
