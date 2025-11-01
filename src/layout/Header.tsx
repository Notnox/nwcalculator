// src/layout/Header.tsx
import React, { useState } from 'react'; // <-- Importar useState
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Menu, MenuItem } from '@mui/material'; // <-- Imports do Menu
import { Link as RouterLink } from 'react-router-dom';
import { modules } from '../data/modules';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language'; // <-- Ícone de Idioma

// --- NOVAS PROPS ---
interface HeaderProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
}

function Header({ mode, toggleTheme, language, setLanguage }: HeaderProps) {
  
  // --- NOVO: Estado para o Menu de Idioma ---
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLanguageSelect = (lang: 'pt' | 'en') => {
    setLanguage(lang);
    handleClose();
  };
  // --- FIM DO ESTADO DO MENU ---

  return (
    <AppBar position="fixed" color="primary" sx={{ backgroundColor: '#1f1f1f' }}>
      <Toolbar>
         <Avatar
            src={"https://cdn.nwdb.info/static/images/brand/logo_transparent_48.png"}
            sx={{ backgroundColor: '#000000', width: 40, height: 40, mr: 1.5 }}
          />
        <Typography 
          variant="h6" 
          component={RouterLink}
          to="/"                  
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
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
              {/* Agora o título do botão é dinâmico */}
              {language === 'pt' ? module.title : module.data.name.en_name}
            </Button>
          ))}
          
          {/* Botão de Tema (sem alteração) */}
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleClick}
            sx={{ ml: 1 }}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem 
              onClick={() => handleLanguageSelect('pt')}
              selected={language === 'pt'} // Destaca o selecionado
            >
              Português (PT)
            </MenuItem>
            <MenuItem 
              onClick={() => handleLanguageSelect('en')}
              selected={language === 'en'}
            >
              English (EN)
            </MenuItem>
          </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;