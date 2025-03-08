import { StyledEngineProvider } from '@mui/styled-engine';
import Router from './routes/Router';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router />
    </StyledEngineProvider>
  );
}

export default App;
