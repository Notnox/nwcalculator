// src/pages/HomePage.tsx
import { 
  Typography, 
  Paper, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Container 
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function HomePage() {
  return (
    <Container maxWidth="md">
      <Paper sx={{ 
        p: { xs: 2, sm: 4 }, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ textAlign: 'center' }}
        >
          Bem-vindo ao New World Calc
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ textAlign: 'center', mb: 4 }}
        >
          Sua ferramenta completa para planejar e calcular os custos de refino no New World.
        </Typography>

        <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            O que este site faz?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Chega de adivinhar ou fazer contas complexas no papel. Esta calculadora de craft foi projetada para 
            fornecer uma lista de materiais exata, considerando todos os seus bônus de refino.
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Cálculo de Bônus Preciso" 
                secondary="Inclui bônus de roupas e bônus de território (Forte) para um resultado exato." 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Lista de Compras Otimizada" 
                secondary="Gera uma lista agregada de toda a matéria-prima e itens refinados necessários." 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Guia Modo de Preparo" 
                secondary="Fornece um guia passo a passo ('Etapas de Craft') mostrando o que refinar primeiro." 
              />
            </ListItem>
          </List>
        </Box>

        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider', width: '100%' }}>
          Para começar, selecione uma profissão no menu acima.
        </Typography>
        
      </Paper>
    </Container>
  );
}

export default HomePage;