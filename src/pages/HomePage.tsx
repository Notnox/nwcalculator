// src/pages/HomePage.tsx
import { 
  Typography, Paper, Box, List, ListItem, 
  ListItemIcon, ListItemText, Container 
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useApp } from '../layout/MainLayout'; // <-- Importar o hook de contexto

// --- Objeto de Traduções ATUALIZADO ---
const translations = {
  pt: {
    welcome: "Bem-vindo ao New World Calc",
    subtitle: "Sua ferramenta completa para planejar e calcular os custos de refino no New World.",
    // --- NOVA SEÇÃO: COMO USAR ---
    how_title: "Como usar o site",
    h_step1_title: "1. Selecione a Profissão",
    h_step1_desc: "Clique em 'Calc Refinos' no menu para escolher a profissão (ex: Cantaria, Fundição).",
    h_step2_title: "2. Escolha o Item Final",
    h_step2_desc: "Na página da profissão, clique no ícone do item que você deseja fabricar (ex: Bloco Prismático).",
    h_step3_title: "3. Ajuste seus Bônus",
    h_step3_desc: "Marque ou desmarque as caixas de 'Roupa' e 'Forte' para corresponder aos seus bônus no jogo.",
    h_step4_title: "4. Calcule!",
    h_step4_desc: "Digite a quantidade desejada e clique em 'Calcular' para ver a lista de compras e o guia de refino.",
    // --- SEÇÃO ANTIGA (RENOMEADA) ---
    features_title: "Funcionalidades Principais", // Renomeado de "what"
    features_desc: "Esta calculadora de craft foi projetada para fornecer uma lista de materiais exata, considerando todos os seus bônus de refino.", // Renomeado de "what_desc"
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
    // --- NEW SECTION: HOW TO USE ---
    how_title: "How to Use the Site",
    h_step1_title: "1. Select a Profession",
    h_step1_desc: "Click 'Refining Calcs' in the menu to choose a profession (e.g., Stonecutting, Smelting).",
    h_step2_title: "2. Choose the Final Item",
    h_step2_desc: "On the profession's page, click the icon of the item you want to craft (e.g., Prismatic Block).",
    h_step3_title: "3. Adjust Your Bonuses",
    h_step3_desc: "Check or uncheck the 'Gear' and 'Fort' boxes to match your in-game bonuses.",
    h_step4_title: "4. Calculate!",
    h_step4_desc: "Enter the desired quantity and click 'Calculate' to see the shopping list and refining guide.",
    // --- OLD SECTION (RENAMED) ---
    features_title: "Main Features", // Renamed from "what"
    features_desc: "This craft calculator is designed to provide an exact materials list, accounting for all your refining bonuses.", // Renamed from "what_desc"
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

        {/* --- NOVA SEÇÃO "COMO USAR" --- */}
        <Box sx={{ alignSelf: 'flex-start', width: '100%', mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {t.how_title}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Typography variant="h6" color="primary">1.</Typography>
              </ListItemIcon>
              <ListItemText primary={t.h_step1_title} secondary={t.h_step1_desc} />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Typography variant="h6" color="primary">2.</Typography>
              </ListItemIcon>
              <ListItemText primary={t.h_step2_title} secondary={t.h_step2_desc} />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Typography variant="h6" color="primary">3.</Typography>
              </ListItemIcon>
              <ListItemText primary={t.h_step3_title} secondary={t.h_step3_desc} />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Typography variant="h6" color="primary">4.</Typography>
              </ListItemIcon>
              <ListItemText primary={t.h_step4_title} secondary={t.h_step4_desc} />
            </ListItem>
          </List>
        </Box>
        {/* --- FIM DA NOVA SEÇÃO --- */}


        {/* --- SEÇÃO "FUNCIONALIDADES" (ANTIGA "O QUE FAZ") --- */}
        <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            {t.features_title} {/* Título atualizado */}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t.features_desc} {/* Descrição atualizada */}
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