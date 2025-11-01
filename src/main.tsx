// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// 1. IMPORTS (você já deve ter)
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css' 

// 2. CRIE O TEMA (AQUI ESTÁ A MÁGICA)
const darkTheme = createTheme({
  palette: {
    // 1. Definimos o modo como 'dark'.
    // Isso faz com que todo o texto em cima dos cards fique branco.
    mode: 'dark', 
    
    // 2. ESTA É A MUDANÇA PRINCIPAL:
    // Forçamos a cor primária a ser o azul padrão do MUI.
    // Assim, seu botão "CALCULAR" (que usa color="primary")
    // continuará azul, mesmo no tema escuro.
    primary: {
      main: '#1976d2', // Este é o azul padrão do MUI
    },

    background: {
      // 3. A cor de fundo do <body> (seu cinza escuro)
      default: 'hsl(0, 0%, 12%)',
      
      // 4. O "cinza mais agradável" para os cards (Paper)
      // Usei a cor #1f1f1f que você definiu para o seu AppBar,
      // assim o header e os cards terão o mesmo tom.
      paper: '#1f1f1f', 
    },
  },
});

// 3. APLIQUE O TEMA
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)