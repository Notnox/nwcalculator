import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Importação do CssBaseline para normalizar estilos
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
)
