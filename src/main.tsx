// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css' 

// O createRoot agora renderiza o App "puro".
// O ThemeProvider e o CssBaseline serão movidos para DENTRO do App.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)