import React from 'react';
import { Card, CardActionArea, Avatar, Typography, Box, Button, Tooltip } from '@mui/material';
import { matrixList, itemInfoMap } from '../../data/matrixData'; 
import { colorMap } from '../../utils/colorMap';
import { useSettings } from '../../contexts/SettingsContext';

interface Step1Props {
  selectedMatrix: string | null;
  onSelectMatrix: (name: string) => void;
  onNext: () => void;
  onSelectAndNext: (name: string) => void; 
}

const Step1SelectMatrix: React.FC<Step1Props> = ({ selectedMatrix, onSelectMatrix, onNext, onSelectAndNext }) => {
  
  const { language } = useSettings(); 
  
  const handleSelect = (name: string) => {
    onSelectMatrix(name);
  };
  
  const handleDoubleClick = (name: string) => {
    onSelectAndNext(name); 
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
            <Tooltip title={name} arrow key={item.item}>
              <Card 
                elevation={isSelected ? 8 : 2} 
                sx={{ 
                  border: '2px solid',
                  borderColor: isSelected ? 'success.main' : 'transparent', 
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.15s ease-out, border-color 0.15s ease-out',
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