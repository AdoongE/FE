import { StyledEngineProvider } from '@mui/styled-engine';
import Router from './routes/Router';
import GlobalStyle from './styles/GlobalStyle';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <GlobalStyle />
      <Router />
    </StyledEngineProvider>
  );
}

export default App;
