// src/layout/Header.tsx
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton,
  Menu, MenuItem, ListItemIcon, ListItemText // <-- Novos imports
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // <-- Importar useNavigate
import { modules } from '../data/modules';

// --- ÍCONES ---
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings'; // <-- Ícone de Engrenagem

// --- Props (sem alteração) ---
interface HeaderProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
}

// --- Objeto de Traduções para o Header ---
const translations = {
  pt: {
    refining: "Calc Refinos",
    settings: "Configurações",
    theme: "Mudar Tema",
    language: "Idioma"
  },
  en: {
    refining: "Refining Calcs",
    settings: "Settings",
    theme: "Toggle Theme",
    language: "Language"
  }
};

function Header({ mode, toggleTheme, language, setLanguage }: HeaderProps) {
  const navigate = useNavigate();
  const t = translations[language]; // Pega o texto (pt ou en)
  
  // --- ESTADOS DOS MENUS ---
  // Criamos um estado de "âncora" para cada menu
  const [anchorElRefining, setAnchorElRefining] = useState<null | HTMLElement>(null);
  const [anchorElSettings, setAnchorElSettings] = useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

  // --- Handlers do Menu de Refino ---
  const handleRefiningClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElRefining(event.currentTarget);
  };
  const handleRefiningClose = () => {
    setAnchorElRefining(null);
  };
  const handleRefiningSelect = (path: string) => {
    navigate(path);
    handleRefiningClose();
  };

  // --- Handlers do Menu de Configurações ---
  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSettings(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setAnchorElSettings(null);
  };

  // --- Handlers do Sub-menu de Idioma ---
  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    // Abre o menu de idioma e fecha o de configurações
    setAnchorElLang(event.currentTarget);
    handleSettingsClose(); 
  };
  const handleLanguageClose = () => {
    setAnchorElLang(null);
  };
  const handleLanguageSelect = (lang: 'pt' | 'en') => {
    setLanguage(lang);
    handleLanguageClose();
  };
  // --- FIM DOS ESTADOS E HANDLERS ---

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

        {/* --- BARRA DE AÇÕES (DIREITA) --- */}
        <Box>
          {/* 1. BOTÃO DE REFINO (SEU "SPEED DIAL" DE REFINOS) */}
          <Button
            color="inherit"
            onClick={handleRefiningClick}
          >
            {t.refining}
          </Button>

          {/* 2. BOTÃO DE CONFIGURAÇÕES (SEU "SPEED DIAL" DE ENGRENAGEM) */}
          <IconButton
            color="inherit"
            onClick={handleSettingsClick}
            sx={{ ml: 1 }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* --- MENUS (FICAM ESCONDIDOS ATÉ SEREM ACIONADOS) --- */}

      {/* 1. MENU DE REFINO */}
      <Menu
        anchorEl={anchorElRefining}
        open={Boolean(anchorElRefining)}
        onClose={handleRefiningClose}
      >
        {modules.map((module) => (
          <MenuItem 
            key={module.id} 
            onClick={() => handleRefiningSelect(`/${module.id}`)}
          >
            {/* Layout (Avatar) Texto */}
            <ListItemIcon>
              <Avatar 
                src={module.data.name.imagem} 
                sx={{ width: 28, height: 28, backgroundColor: '#000' }} 
              />
            </ListItemIcon>
            <ListItemText>
              {language === 'pt' ? module.title : module.data.name.en_name}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {/* 2. MENU DE CONFIGURAÇÕES */}
      <Menu
        anchorEl={anchorElSettings}
        open={Boolean(anchorElSettings)}
        onClose={handleSettingsClose}
      >
        {/* Ação 1: Mudar Tema */}
        <MenuItem onClick={() => { toggleTheme(); handleSettingsClose(); }}>
          <ListItemIcon>
            {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>{t.theme}</ListItemText>
        </MenuItem>
        
        {/* Ação 2: Abrir Menu de Idioma */}
        <MenuItem onClick={handleLanguageClick}>
          <ListItemIcon>
            <LanguageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t.language}</ListItemText>
        </MenuItem>
      </Menu>

      {/* 3. SUB-MENU DE IDIOMA */}
      <Menu
        anchorEl={anchorElLang}
        open={Boolean(anchorElLang)}
        onClose={handleLanguageClose}
      >
        <MenuItem 
          onClick={() => handleLanguageSelect('pt')}
          selected={language === 'pt'}
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
      
    </AppBar>
  );
}

export default Header;