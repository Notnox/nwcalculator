// src/layout/Header.tsx
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { modules } from '../data/modules';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
         <Avatar
            src={"https://cdn.nwdb.info/static/images/brand/logo_transparent_48.png"}
            sx={{
              backgroundColor: '#000000',
              width: 40, height: 40,
              mr: 1.5, // Adicionei uma margem para separar do texto
            }}
          />
        {/* --- MUDANÇA AQUI --- */}
        <Typography 
          variant="h6" 
          component={RouterLink} // 1. Trocado de 'div' para 'RouterLink'
          to="/"                  // 2. Adicionado o link para a raiz
          sx={{ 
            flexGrow: 1,
            color: 'inherit',       // 3. Mantém a cor branca do header
            textDecoration: 'none'  // 4. Remove o sublinhado do link
          }}
        >
          New World Calc
        </Typography>
        {/* --- FIM DA MUDANÇA --- */}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;