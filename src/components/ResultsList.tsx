import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Paper } from '@mui/material';
import { type ItemInfo } from '../types/craftingTypes';
import { colorMap } from '../utils/colorMap';
import { useSettings } from '../contexts/SettingsContext';

interface ResultsListProps {
  title: string;
  itemsMap: Map<string, number>;
  itemInfoMap: Map<string, ItemInfo>;
}

const ResultsList: React.FC<ResultsListProps> = ({ title, itemsMap, itemInfoMap }) => {
  const { language } = useSettings(); 
  
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
          const bgColor = colorMap[colorKey] || colorMap.default;

          const name = info ? (language === 'pt' ? info.item : (info.en_name || info.item)) : itemName;

          return (
            <ListItem key={itemName}>
              <ListItemAvatar>
                <Avatar src={info?.imagem} sx={{ backgroundColor: bgColor }} />
              </ListItemAvatar>
              <ListItemText
                primary={`${qty.toLocaleString('pt-BR')} - ${name}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

export default ResultsList;