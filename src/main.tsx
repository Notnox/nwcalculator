// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// 1. NOVOS IMPORTS
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Mantenha seu CSS para a fonte
import './index.css' 

// 2. CRIE O TEMA (A MUDANÇA ESTÁ AQUI)
const lightThemeWithDarkBody = createTheme({
  palette: {
    // 1. Mantenha o modo 'light'.
    // Isso faz com que os componentes (Paper, Typography, etc.)
    // usem seus estilos de tema claro (ex: cards brancos, texto preto).
    mode: 'light', 
    
    // 2. Sobrescreva APENAS a cor do <body>
    background: {
      default: 'hsl(0, 0%, 12%)',
      // 'paper' (cor do card) continuará sendo branco (padrão do 'light')
    },
    

    // 3. (Opcional, mas recomendado) 
    //    Define a cor do AppBar que você já usa como a cor "primária".
  },
});

// 3. APLIQUE O TEMA
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightThemeWithDarkBody}>
      {/* O CssBaseline agora vai ler o tema e aplicar 
          background.default (seu cinza escuro) ao <body>
      */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)