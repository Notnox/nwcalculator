import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css' 
import { SettingsProvider } from './contexts/SettingsContext';
import { PriceProvider } from './contexts/PriceContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <PriceProvider>
        <App />
      </PriceProvider>
    </SettingsProvider>
  </StrictMode>,
)