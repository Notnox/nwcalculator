import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, 
  Menu, MenuItem, ListItemIcon, ListItemText 
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings'; 
import { useSettings } from '../contexts/SettingsContext';

const translations = {
  pt: {
    refining: "Refinos",
    matrix: "Matriz",
    settings: "Configurações",
    theme: "Mudar Tema",
    language: "Idioma"
  },
  en: {
    refining: "Refining",
    matrix: "Matrix",
    settings: "Settings",
    theme: "Toggle Theme",
    language: "Language"
  }
};

function Header() {
  const { mode, toggleTheme, language, setLanguage } = useSettings();
  const t = translations[language]; 
  const navigate = useNavigate();
  
  const [anchorElRefining, setAnchorElRefining] = useState<null | HTMLElement>(null);
  const [anchorElSettings, setAnchorElSettings] = useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

  const handleRefiningClose = () => { setAnchorElRefining(null); };
  const handleRefiningSelect = (path: string) => {
    navigate(path);
    handleRefiningClose();
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorElSettings(event.currentTarget); };
  const handleSettingsClose = () => { setAnchorElSettings(null); };

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
    handleSettingsClose(); 
  };
  const handleLanguageClose = () => { setAnchorElLang(null); };
  const handleLanguageSelect = (lang: 'pt' | 'en') => {
    setLanguage(lang);
    handleLanguageClose();
  };

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
          <Button
            color="inherit"
            component={RouterLink}
            to="/refinos"
          >
            {t.refining}
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/matrizes"
          >
            {t.matrix}
          </Button>

          <IconButton
            color="inherit"
            onClick={handleSettingsClick}
            sx={{ ml: 1 }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>

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