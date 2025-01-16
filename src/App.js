import { StyledEngineProvider } from '@mui/styled-engine';
import Router from './routes/Router';
import GlobalStyle from './styles/GlobalStyle';
import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
// import { pdfjs } from 'pdfjs-dist';
if (!pdfjs.GlobalWorkerOptions.workerSrc) {
  const WORKER_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
  pdfjs.GlobalWorkerOptions.workerSrc = WORKER_URL;
}
function App() {
  return (
    <StyledEngineProvider injectFirst>
      <GlobalStyle />
      <Router />
    </StyledEngineProvider>
  );
}

export default App;
