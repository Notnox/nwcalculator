// src/layout/Header.jsx
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          New World Calc
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Início
          </Button>
          <Button color="inherit" component={RouterLink} to="/cantaria">
            Cantaria
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;