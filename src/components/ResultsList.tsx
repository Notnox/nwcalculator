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
import { type ItemInfo } from '../types/craftingTypes';
// --- MUDANÇA 1: Importar o colorMap centralizado ---
import { colorMap } from '../utils/colorMap';

// --- MUDANÇA 2: Remover o colorMap local ---
/*
const colorMap: Record<string, string> = {
  cinza: '#4a4a4aff',
  verde: '#4caf50',
  laranja: '#ff9800',
  default: '#607d8b',
};
*/

interface ResultsListProps {
  title: string;
  itemsMap: Map<string, number>;
  itemInfoMap: Map<string, ItemInfo>;
}

const ResultsList: React.FC<ResultsListProps> = ({ title, itemsMap, itemInfoMap }) => {
  
  const itemsArray = Array.from(itemsMap.entries());
  itemsArray.sort((a, b) => b[1] - a[1]);

  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <List dense>
        {itemsArray.map(([itemName, quantity]) => {
          
          const info: ItemInfo | undefined = itemInfoMap.get(itemName);
          const qty: number = Math.ceil(quantity); 
          
          const colorKey = info?.backgroundColor || 'default';
          // Esta linha agora usa o 'colorMap' importado
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