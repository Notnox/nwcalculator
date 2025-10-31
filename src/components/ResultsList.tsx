// src/components/ResultsList.tsx
import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material';
import { itemInfoMap, type ItemInfo } from '../data/cantariaData';

// Mapeamento de cores (tipado como um Record)
const colorMap: Record<string, string> = {
  cinza: '#4a4a4aff',
  verde: '#4caf50',
  laranja: '#ff9800',
  default: '#607d8b',
};

// 1. Definindo a interface para as props do componente
interface ResultsListProps {
  title: string;
  itemsMap: Map<string, number>;
}

// 2. Usando React.FC (Functional Component) e tipando as props
const ResultsList: React.FC<ResultsListProps> = ({ title, itemsMap }) => {
  
  // 'itemsArray' será do tipo [string, number][]
  const itemsArray = Array.from(itemsMap.entries());
  
  itemsArray.sort((a, b) => b[1] - a[1]);

  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <List dense>
        {itemsArray.map(([itemName, quantity]) => {
          // 'info' será do tipo 'ItemInfo | undefined'
          const info: ItemInfo | undefined = itemInfoMap.get(itemName);
          const qty: number = Math.ceil(quantity); // Arredonda para cima
          
          // Lógica mais segura para fallback de cor
          const colorKey = info?.backgroundColor || 'default';
          const bgColor = colorMap[colorKey] || colorMap.default;

          return (
            <ListItem key={itemName}>
              <ListItemAvatar>
                <Avatar
                  src={info?.imagem}
                  sx={{ backgroundColor: bgColor }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${qty.toLocaleString('pt-BR')} - ${info?.item || itemName}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

export default ResultsList;