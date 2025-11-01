// src/components/crafting/ItemSelector.tsx
import React from 'react';
import { Box, Typography, Stack, Tooltip, IconButton, Avatar } from '@mui/material';
import { type ItemInfo } from '../../types/craftingTypes';
import { colorMap } from '../../utils/colorMap';

// Objeto de tradução
const translations = {
  pt: { select: "Selecione o item para calcular:" },
  en: { select: "Select item to calculate:" },
};

interface ItemSelectorProps {
  refinements: ItemInfo[];
  itemInfoMap: Map<string, ItemInfo>;
  selectedItemName: string;
  onSelectItem: (itemName: string) => void;
  language: 'pt' | 'en'; // <-- NOVA PROP
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  refinements,
  itemInfoMap,
  selectedItemName,
  onSelectItem,
  language, // <-- PROP EM USO
}) => {
  const t = translations[language]; // Pega o texto (pt ou en)

  return (
    <Box sx={{ width: '100%', mb: 3, borderBottom: 1, borderColor: 'divider', pb: 3 }}>
      <Typography variant="caption" display="block" sx={{ textAlign: 'center', color: 'text.secondary', mb: 1.5 }}>
        {t.select} {/* <-- TRADUZIDO */}
      </Typography>
      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ rowGap: 1 }}>
        {refinements.map((item) => {
          const info = itemInfoMap.get(item.item);
          const isSelected = item.item === selectedItemName;
          const colorKey = info?.backgroundColor || 'default';
          const bgColor = colorMap[colorKey] || colorMap.default;
          
          // Define o nome do tooltip (PT ou EN)
          const tooltipName = language === 'pt' ? item.item : (item.en_name || item.item);

          return (
            <Tooltip title={tooltipName} key={item.item} arrow>
              <IconButton
                onClick={() => onSelectItem(item.item)}
                sx={{
                  p: 0.5,
                  opacity: isSelected ? 0.5 : 1.0,
                  border: isSelected ? '2px solid' : '2px solid transparent',
                  borderColor: 'primary.main',
                }}
              >
                <Avatar
                  src={info?.imagem}
                  sx={{ backgroundColor: bgColor, width: 40, height: 40 }}
                />
              </IconButton>
            </Tooltip>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ItemSelector;