// src/layout/Header.tsx
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { modules } from '../data/modules';

function Header() {
  return (
    // --- MUDANÇA AQUI ---
    // Em vez de 'sx', usamos 'color="primary"'
    // O MUI vai usar a cor '#1f1f1f' que definimos no main.tsx
    <AppBar position="fixed" color="primary" 
      sx={{ 
        backgroundColor: '#1f1f1f' // Pode ser '1f1f1f' ou '#1f1f1f'
      }}
    >
      {/* --- FIM DA MUDANÇA --- */}
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
            // 'inherit' agora vai herdar 'contrastText' (branco) do tema
            color: 'inherit',       
            textDecoration: 'none'  
          }}
        >
          New World Calc
        </Typography>
        <Box>
          {/* 'inherit' também vai herdar o 'contrastText' (branco) */}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;