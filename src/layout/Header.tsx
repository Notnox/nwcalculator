// src/layout/Header.tsx
import React, { useState } from 'react'; // <-- useState não é mais necessário para os menus
import { 
  AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, 
  Menu, MenuItem, ListItemIcon, ListItemText // <-- Vários destes não são mais necessários
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // <-- useNavigate não é mais necessário
// import { modules } from '../data/modules'; // <-- Não é mais necessário aqui

// --- ÍCONES ---
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings'; 

// --- Props (sem alteração) ---
interface HeaderProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
}

// --- Objeto de Traduções (com 'matrix' adicionado) ---
const translations = {
  pt: {
    refining: "Refinos",
    matrix: "Matriz", // <-- NOVO
    settings: "Configurações",
    theme: "Mudar Tema",
    language: "Idioma"
  },
  en: {
    refining: "Refining",
    matrix: "Matrix", // <-- NOVO
    settings: "Settings",
    theme: "Toggle Theme",
    language: "Language"
  }
};

function Header({ mode, toggleTheme, language, setLanguage }: HeaderProps) {
  const t = translations[language]; // Pega o texto (pt ou en)
  
  // --- ESTADOS DOS MENUS (MUITA COISA REMOVIDA) ---
  // Removemos 'anchorElRefining' e 'anchorElMatrix'
  const [anchorElSettings, setAnchorElSettings] = useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

  // --- Handlers (Removemos os de Refino e Matriz) ---

  // --- Handlers do Menu de Configurações ---
  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorElSettings(event.currentTarget); };
  const handleSettingsClose = () => { setAnchorElSettings(null); };

  // --- Handlers do Sub-menu de Idioma ---
  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
    handleSettingsClose(); 
  };
  const handleLanguageClose = () => { setAnchorElLang(null); };
  const handleLanguageSelect = (lang: 'pt' | 'en') => {
    setLanguage(lang);
    handleLanguageClose();
  };
  // --- FIM DAS REMOÇÕES ---

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

        {/* --- BARRA DE AÇÕES (DIREITA) ATUALIZADA --- */}
        <Box>
          
          {/* 2. BOTÃO DE MATRIZ (Agora é um Link) */}
          <Button
            color="inherit"
            component={RouterLink}
            to="/matrizes"
          >
            {t.matrix}
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/refinos"
          >
            {t.refining}
          </Button>

          {/* 3. BOTÃO DE CONFIGURAÇÕES (Menu - sem alteração) */}
          <IconButton
            color="inherit"
            onClick={handleSettingsClick}
            sx={{ ml: 1 }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* --- MENUS (Refino e Matriz REMOVIDOS) --- */}

      {/* 1. MENU DE CONFIGURAÇÕES (Sem alteração) */}
      <Menu
        anchorEl={anchorElSettings}
        open={Boolean(anchorElSettings)}
        onClose={handleSettingsClose}
      >
        <MenuItem onClick={() => { toggleTheme(); handleSettingsClose(); }}>
          <ListItemIcon>
            {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>{t.theme}</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleLanguageClick}>
          <ListItemIcon>
            <LanguageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t.language}</ListItemText>
        </MenuItem>
      </Menu>

      {/* 2. SUB-MENU DE IDIOMA (Sem alteração) */}
      <Menu
        anchorEl={anchorElLang}
        open={Boolean(anchorElLang)}
        onClose={handleLanguageClose}
      >
        <MenuItem onClick={() => handleLanguageSelect('pt')} selected={language === 'pt'}>
          Português (PT)
        </MenuItem>
        <MenuItem onClick={() => handleLanguageSelect('en')} selected={language === 'en'}>
          English (EN)
        </MenuItem>
      </Menu>
      
    </AppBar>
  );
}

export default Header;