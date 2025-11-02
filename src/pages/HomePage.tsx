// src/pages/HomePage.tsx
import { 
  Typography, Paper, Box, Container, 
  Card, CardActionArea, Avatar // <-- Mudança nos imports
} from '@mui/material';
import { useApp } from '../layout/MainLayout';
import { useNavigate } from 'react-router-dom'; // <-- NOVO: Para navegar

// --- Objeto de Traduções ATUALIZADO e MINIMALISTA ---
const translations = {
  pt: {
    welcome: "Bem-vindo ao New World Calc",
    subtitle: "Sua ferramenta para planejar e calcular custos no New World.",
    cta_title: "Comece a Calcular",
    refining_title: "Calculadora de Refino",
    refining_desc: "Calcule a lista de materiais exata para todos os refinos (Pedra Rúnica, Asmódeo, etc.), incluindo seus bônus de roupa e território.",
    matrix_title: "Otimizador de Matriz",
    matrix_desc: "Compare o custo de fabricar vs. comprar Matrizes (Arma, Armadura, Joia) e descubra a opção mais lucrativa com base nos preços do mercado."
  },
  en: {
    welcome: "Welcome to New World Calc",
    subtitle: "Your tool for planning and calculating costs in New World.",
    cta_title: "Start Calculating",
    refining_title: "Refining Calculator",
    refining_desc: "Calculate the exact material list for all your refines (Runestone, Asmodeum, etc.), including your gear and territory bonuses.",
    matrix_title: "Matrix Optimizer",
    matrix_desc: "Compare the cost to craft vs. buy Matrices (Weapon, Armor, Jewelry) and find the most profitable option based on market prices."
  }
};

function HomePage() {
  const { language } = useApp();
  const navigate = useNavigate(); // <-- NOVO
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

        {/* --- SEÇÕES "COMO USAR" E "FUNCIONALIDADES" REMOVIDAS --- */}

        {/* --- NOVA SEÇÃO "COMECE A CALCULAR" COM BOTÕES --- */}
        <Box sx={{ alignSelf: 'stretch', width: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            {t.cta_title}
          </Typography>
          
          {/* Layout em Grid (2 colunas em telas pequenas, 1 em extra-pequenas) */}
          <Box 
            sx={{ 
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)', // 1 coluna em mobile
                sm: 'repeat(2, 1fr)', // 2 colunas em desktop
              }
            }}
          >
            {/* Card 1: Calculadora de Refino */}
            <Card 
              elevation={3}
              sx={{ 
                transition: 'transform 0.15s ease-out, border-color 0.15s ease-out',
                '&:hover': { transform: 'scale(1.02)', borderColor: 'primary.main' },
                border: '2px solid transparent',
              }}
            >
              <CardActionArea 
                onClick={() => navigate('/refinos')} // Navega para a página de seleção
                sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '100%' }}
              >
                <Avatar 
                  // Ícone genérico para "Refino" (usando Fundição)
                  src="https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott53.png" 
                  sx={{ width: 64, height: 64, backgroundColor: '#ff9800' }} 
                />
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {t.refining_title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  {t.refining_desc}
                </Typography>
              </CardActionArea>
            </Card>

            {/* Card 2: Otimizador de Matriz */}
            <Card 
              elevation={3}
              sx={{ 
                transition: 'transform 0.15s ease-out, border-color 0.15s ease-out',
                '&:hover': { transform: 'scale(1.02)', borderColor: 'primary.main' },
                border: '2px solid transparent',
              }}
            >
              <CardActionArea 
                onClick={() => navigate('/matrizes')} // Navega para a calculadora de matriz
                sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '100%' }}
              >
                <Avatar 
                  // Ícone de Matriz
                  src="https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/matrix-weapont52.png" 
                  sx={{ width: 64, height: 64, backgroundColor: '#ff9800' }} 
                />
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {t.matrix_title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  {t.matrix_desc}
                </Typography>
              </CardActionArea>
            </Card>

          </Box>
        </Box>
        {/* --- FIM DA NOVA SEÇÃO --- */}

        {/* --- TEXTO FINAL REMOVIDO --- */}
        
      </Paper>
    </Container>
  );
}

export default HomePage;