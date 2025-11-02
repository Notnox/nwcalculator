import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Container } from '@mui/material';

function MainLayout() {
  return (
    <>
      <Header />
      <Container component="main" sx={{ mt: 10, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

// --- REMOVEMOS: O hook 'useApp()' ---

export default MainLayout;