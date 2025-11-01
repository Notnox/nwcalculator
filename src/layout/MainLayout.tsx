// src/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Container } from '@mui/material';

// --- NOVAS PROPS ---
interface MainLayoutProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

function MainLayout({ mode, toggleTheme }: MainLayoutProps) {
  return (
    <>
      {/* Passa as props para o Header */}
      <Header mode={mode} toggleTheme={toggleTheme} />
      
      <Container component="main" sx={{ mt: 10, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default MainLayout;