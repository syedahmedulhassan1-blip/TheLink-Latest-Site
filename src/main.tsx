import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { ContentProvider } from './content/ContentContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ContentProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContentProvider>
    </HelmetProvider>
  </StrictMode>,
);
