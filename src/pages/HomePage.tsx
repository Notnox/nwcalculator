// src/pages/HomePage.tsx
import { 
  Typography, Paper, Box, List, ListItem, 
  ListItemIcon, ListItemText, Container 
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useApp } from '../layout/MainLayout'; // <-- Importar o hook de contexto

// --- NOVO: Objeto de Traduções ---
const translations = {
  pt: {
    welcome: "Bem-vindo ao New World Calc",
    subtitle: "Sua ferramenta completa para planejar e calcular os custos de refino no New World.",
    what: "O que este site faz?",
    what_desc: "Chega de adivinhar ou fazer contas complexas no papel. Esta calculadora de craft foi projetada para fornecer uma lista de materiais exata, considerando todos os seus bônus de refino.",
    f1_title: "Cálculo de Bônus Preciso",
    f1_desc: "Inclui bônus de roupas e bônus de território (Forte) para um resultado exato.",
    f2_title: "Lista de Compras Otimizada",
    f2_desc: "Gera uma lista agregada de toda a matéria-prima e itens refinados necessários.",
    f3_title: "Guia Modo de Preparo",
    f3_desc: "Fornece um guia passo a passo ('Etapas de Craft') mostrando o que refinar primeiro.",
    start: "Para começar, selecione uma profissão no menu acima."
  },
  en: {
    welcome: "Welcome to New World Calc",
    subtitle: "Your complete tool for planning and calculating refining costs in New World.",
    what: "What does this site do?",
    what_desc: "Stop guessing or doing complex math on paper. This craft calculator is designed to provide an exact materials list, accounting for all your refining bonuses.",
    f1_title: "Accurate Bonus Calculation",
    f1_desc: "Includes gear bonuses and territory (Fort) bonuses for a precise result.",
    f2_title: "Optimized Shopping List",
    f2_desc: "Generates an aggregated list of all raw materials and refined items needed.",
    f3_title: "Step-by-Step Guide",
    f3_desc: "Provides a 'Crafting Steps' guide showing what to refine first.",
    start: "To get started, select a profession from the menu above."
  }
};

function HomePage() {
  // Pega o idioma do contexto
  const { language } = useApp();
  // Seleciona o objeto de texto correto
  const t = translations[language];

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: { xs: 2, sm: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
          {t.welcome}
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
          {t.subtitle}
        </Typography>

        <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            {t.what}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t.what_desc}
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
              <ListItemText primary={t.f1_title} secondary={t.f1_desc} />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
              <ListItemText primary={t.f2_title} secondary={t.f2_desc} />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
              <ListItemText primary={t.f3_title} secondary={t.f3_desc} />
            </ListItem>
          </List>
        </Box>

        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider', width: '100%' }}>
          {t.start}
        </Typography>
        
      </Paper>
    </Container>
  );
}

export default HomePage;