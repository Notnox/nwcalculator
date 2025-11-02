// src/pages/RefiningHomePage.tsx
import React from 'react';
import { Card, CardActionArea, Avatar, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../layout/MainLayout';
import { modules } from '../data/modules';
// Importa APENAS os módulos de refino


const RefiningHomePage: React.FC = () => {
  const { language } = useApp(); // Pega o idioma
  const navigate = useNavigate(); // Hook para navegar

  // Handler para navegar para a página de cálculo
  const handleSelect = (path: string) => {
    navigate(`/${path}`); // Navega para ex: '/cantaria'
  };

  const t = language === 'pt' ? {
    title: "Calculadoras de Refino",
    subtitle: "Selecione a profissão que deseja calcular:"
  } : {
    title: "Refining Calculators",
    subtitle: "Select the profession you want to calculate:"
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        {t.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
        {t.subtitle}
      </Typography>
      
      {/* Usamos o mesmo layout de 'grid' da página de Matrizes */}
      <Box 
        sx={{ 
          display: 'grid',
          gap: 3,
          // 2 colunas em 'sm', 3 colunas em 'md'
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }
        }}
      >
        {/* Loop sobre os módulos de refino */}
        {modules.map((module) => {
          const name = language === 'pt' ? module.title : module.data.name.en_name;
          
          return (
            <Card 
              key={module.id}
              elevation={3}
              sx={{ 
                // Estilo para o 'hover'
                transition: 'transform 0.15s ease-out',
                '&:hover': {
                  transform: 'scale(1.03)',
                  borderColor: 'primary.main',
                },
                border: '2px solid transparent',
              }}
            >
              <CardActionArea 
                onClick={() => handleSelect(module.id)}
                sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
              >
                <Avatar 
                  src={module.data.name.imagem} 
                  sx={{ 
                    width: 64, 
                    height: 64, 
                    backgroundColor: '#000' // Fundo preto para ícones de profissão
                  }}
                />
                <Typography variant="h6" sx={{ textAlign: 'center' }}>{name}</Typography>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default RefiningHomePage;