// src/layout/MainLayout.tsx
import { Outlet, useOutletContext } from 'react-router-dom'; // <-- Importar useOutletContext
import Header from './Header';
import { Container } from '@mui/material';
import { type AppContextType } from '../App'; // <-- Importar nosso tipo de contexto

// --- NOVAS PROPS ---
interface MainLayoutProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
}

function MainLayout({ mode, toggleTheme, language, setLanguage }: MainLayoutProps) {
  return (
    <>
      <Header 
        mode={mode} 
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={setLanguage}
      />
      
      <Container component="main" sx={{ mt: 10, mb: 4 }}>
        {/* Passa o idioma para todas as páginas (HomePage, CraftingPage) */}
        <Outlet context={{ language } satisfies AppContextType} />
      </Container>
    </>
  );
}

// Hook customizado para que as páginas acessem o contexto
export function useApp() {
  return useOutletContext<AppContextType>();
}

export default MainLayout;