// src/layout/Header.tsx
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton } from '@mui/material'; // <-- Adicionado IconButton
import { Link as RouterLink } from 'react-router-dom';
import { modules } from '../data/modules';

// --- NOVOS IMPORTS DE ÍCONES ---
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Lua (Dark)
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sol (Light)

// --- NOVAS PROPS ---
interface HeaderProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

function Header({ mode, toggleTheme }: HeaderProps) {
  return (
    <AppBar 
      position="fixed" 
      color="primary" 
      sx={{ 
        // Usamos a cor do tema 'paper' para o AppBar,
        // que agora é dinâmico (dark: #1f1f1f, light: #ffffff)
        // Mas o seu AppBar é preto, então vamos manter
        backgroundColor: '#1f1f1f' 
      }}
    >
      <Toolbar>
         <Avatar
            src={"https://cdn.nwdb.info/static/images/brand/logo_transparent_48.png"}
            sx={{
              backgroundColor: '#000000',
              width: 40, height: 40,
              mr: 1.5,
            }}
          />
        <Typography 
          variant="h6" 
          component={RouterLink}
          to="/"                  
          sx={{ 
            flexGrow: 1,
            color: 'inherit',       
            textDecoration: 'none'  
          }}
        >
          New World Calc
        </Typography>
        <Box>
          {modules.map((module) => (
            <Button
              key={module.id}
              color="inherit"
              component={RouterLink}
              to={`/${module.id}`}
            >
              {module.title}
            </Button>
          ))}
          
          {/* --- NOVO BOTÃO DE TEMA --- */}
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {/* --- FIM DO BOTÃO --- */}

        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;