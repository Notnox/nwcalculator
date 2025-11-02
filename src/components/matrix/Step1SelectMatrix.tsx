// src/components/matrix/Step1SelectMatrix.tsx
import React from 'react';
// --- MUDANÇA 1: Adicionei 'Tooltip' que estava faltando no seu upload ---
import { Card, CardActionArea, Avatar, Typography, Box, Button, Tooltip } from '@mui/material';
// Importa os dados DIRETAMENTE do arquivo de dados da matriz
import { matrixList, itemInfoMap } from '../../data/matrixData'; 
import { colorMap } from '../../utils/colorMap';

interface Step1Props {
  language: 'pt' | 'en';
  selectedMatrix: string | null;
  onSelectMatrix: (name: string) => void;
  onNext: () => void;
  onSelectAndNext: (name: string) => void; // Para o double-click
}

const Step1SelectMatrix: React.FC<Step1Props> = ({ language, selectedMatrix, onSelectMatrix, onNext, onSelectAndNext }) => {
  
  const handleSelect = (name: string) => {
    onSelectMatrix(name);
  };
  
  const handleDoubleClick = (name: string) => {
    onSelectAndNext(name); // Seta e avança
  };

  const t = language === 'pt' ? {
    next: "Próxima Etapa",
    help: "Clique para selecionar, clique duplo para avançar. Você deve selecionar uma matriz para continuar."
  } : {
    next: "Next Step",
    help: "Click to select, double-click to advance. You must select a matrix to continue."
  };

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'grid',
          gap: 2,
          mb: 2,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }
        }}
      >
        {matrixList.map((item) => {
          const info = itemInfoMap.get(item.item);
          const isSelected = selectedMatrix === item.item;
          const name = language === 'pt' ? info?.item : (info?.en_name || info?.item);
          
          return (
            // --- MUDANÇA 2: Tooltip adicionado ao redor do Card ---
            <Tooltip title={name} arrow key={item.item}>
              <Card 
                elevation={isSelected ? 8 : 2} // A sombra/elevação que você gostou
                sx={{ 
                  // --- MUDANÇA 3: Estilo de seleção atualizado ---
                  
                  // 1. A borda agora é 'success.main' (verde) quando selecionada
                  border: '2px solid',
                  borderColor: isSelected ? 'success.main' : 'transparent', 
                  
                  // 2. Adiciona um leve "pop" (zoom) para complementar a elevação
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  
                  // 3. Suaviza a transição
                  transition: 'transform 0.15s ease-out, border-color 0.15s ease-out',
                  // --- FIM DA MUDANÇA ---
                }}
              >
                <CardActionArea 
                  onClick={() => handleSelect(item.item)} 
                  onDoubleClick={() => handleDoubleClick(item.item)}
                  sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
                >
                  <Avatar 
                    src={info?.imagem} 
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      backgroundColor: colorMap[info?.backgroundColor || 'default']
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>{name}</Typography>
                </CardActionArea>
              </Card>
            </Tooltip>
          );
        })}
      </Box>
      
      {/* Rodapé (sem alteração) */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 4 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', mr: 'auto' }}>
          {t.help}
        </Typography>
        <Button
          variant="contained"
          onClick={onNext}
          disabled={!selectedMatrix}
        >
          {t.next}
        </Button>
      </Box>
    </Box>
  );
};

export default Step1SelectMatrix;