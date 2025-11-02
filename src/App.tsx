// src/App.tsx
import { useState, useMemo, useEffect } from 'react'; // <-- 1. Importar useEffect
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import CraftingPage from './pages/CraftingPage';
import { modules } from './data/modules';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { type PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MatrixCalculatorPage from './pages/MatrixCalculatorPage';
import RefiningHomePage from './pages/RefiningHomePage';

const repoName = '/nwcalculator/';

// LÓGICA DO TEMA (sem alteração)
const darkThemeOptions = {
  palette: {
    mode: 'dark' as PaletteMode,
    primary: { main: '#1976d2' },
    background: {
      default: 'hsl(0, 0%, 12%)',
      paper: '#1f1f1f',
    },
  },
};
const lightThemeOptions = {
  palette: {
    mode: 'light' as PaletteMode,
    primary: { main: '#1976d2' },
    background: {
      default: '#f4f4f5',
      paper: '#ffffff',
    },
  },
};

export type AppContextType = {
  language: 'pt' | 'en';
};

function App() {
  // --- 2. ESTADO DO TEMA (COM LEITURA DO LOCALSTORAGE) ---
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    // Esta função roda apenas uma vez, na inicialização
    const storedTheme = localStorage.getItem('themeMode');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    // Padrão se nada for encontrado
    return 'dark'; 
  });

  // Função para trocar o tema (sem alteração)
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // --- 3. NOVO: EFEITO PARA SALVAR NO LOCALSTORAGE ---
  // Este hook roda toda vez que 'themeMode' muda
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const [language, setLanguage] = useState<'pt' | 'en'>(() => {
    const storedLang = localStorage.getItem('language');
    return (storedLang === 'pt' || storedLang === 'en') ? storedLang : 'pt';
  });
  const handleChangeLanguage = (lang: 'pt' | 'en') => {
    setLanguage(lang);
  };
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Tema é criado dinamicamente (sem alteração)
  const theme = useMemo(
    () =>
      createTheme(
        themeMode === 'light' ? lightThemeOptions : darkThemeOptions
      ),
    [themeMode]
  );

return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={repoName}>
        <Routes>
          <Route 
            element={
              <MainLayout 
                mode={themeMode} 
                toggleTheme={toggleTheme} 
                language={language} // Passa para o Header
                setLanguage={handleChangeLanguage} // Passa para o Header
              />
            }
          >
            {/* O Outlet agora passa o 'language' para TODAS as rotas filhas via contexto */}
            <Route index element={<HomePage />} />
            {modules.map((module) => (
              <Route 
                key={module.id}
                path={module.id} 
                element={<CraftingPage module={module} />} 
              />
            ))}
            <Route path="/refinos" element={<RefiningHomePage />} />
            <Route 
              path="/matrizes" 
              element={<MatrixCalculatorPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;