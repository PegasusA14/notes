import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppQueryProvider } from './providers/QueryProvider.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppQueryProvider>
        <App />
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#18181b', // zinc-900
            color: '#fafafa', // zinc-50
            border: '1px solid #27272a', // zinc-800
          }
        }} />
      </AppQueryProvider>
    </BrowserRouter>
  </StrictMode>
);
