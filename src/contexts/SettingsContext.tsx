// src/contexts/SettingsContext.tsx
import React, { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { type PaletteMode } from '@mui/material';

// --- 1. Definições de Tema (Movidas do App.tsx) ---
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

// --- 2. Interface do Contexto ---
// O que os componentes "filho" poderão acessar
interface SettingsContextType {
  mode: 'light' | 'dark';
  language: 'pt' | 'en';
  toggleTheme: () => void;
  setLanguage: (lang: 'pt' | 'en') => void;
}

// --- 3. O Contexto ---
// Criamos o contexto com um 'undefined' inicial
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// --- 4. O Provedor (Provider) ---
// Este componente vai envolver seu App
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // --- Toda a lógica de estado foi movida para cá ---
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('themeMode');
    return (storedTheme === 'light' || storedTheme === 'dark') ? storedTheme : 'dark';
  });

  const [language, setLanguage] = useState<'pt' | 'en'>(() => {
    const storedLang = localStorage.getItem('language');
    return (storedLang === 'pt' || storedLang === 'en') ? storedLang : 'pt';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const setLanguageHandler = (lang: 'pt' | 'en') => {
    setLanguage(lang);
  };

  // O 'theme' é criado aqui
  const theme = useMemo(
    () => createTheme(themeMode === 'light' ? lightThemeOptions : darkThemeOptions),
    [themeMode]
  );
  
  // O valor que será passado para os filhos
  const value = {
    mode: themeMode,
    language,
    toggleTheme,
    setLanguage: setLanguageHandler,
  };

  // O Provedor do MUI (ThemeProvider) fica DENTRO do nosso provedor
  return (
    <SettingsContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
};

// --- 5. O Hook de Consumo ---
// É assim que os componentes vão acessar os dados
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
  }
  return context;
};