// src/components/crafting/CraftingControls.tsx
import React from 'react';
import { Avatar, Typography, Stack, FormControlLabel, Checkbox, TextField, Button } from '@mui/material';
import { type ItemInfo } from '../../types/craftingTypes';

// Objeto de tradução
const translations = {
  pt: {
    clothes: "Roupa de",
    fort: "Bônus do Forte",
    quantity: "Quantidade",
    calculate: "Calcular"
  },
  en: {
    clothes: "Gear", // Ex: "Stonecutting Gear"
    fort: "Fort Bonus",
    quantity: "Quantity",
    calculate: "Calculate"
  }
};

interface CraftingControlsProps {
  targetItemInfo: ItemInfo | undefined;
  targetBgColor: string;
  quantity: string;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  clothesBonus: boolean;
  onClothesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fortBonus: boolean;
  onFortChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculate: () => void;
  language: 'pt' | 'en'; // <-- NOVA PROP
  moduleName: string;    // <-- NOVA PROP (Ex: "Cantaria")
  moduleEnName: string;  // <-- NOVA PROP (Ex: "Stonecutting")
}

const CraftingControls: React.FC<CraftingControlsProps> = ({
  targetItemInfo,
  targetBgColor,
  quantity,
  onQuantityChange,
  clothesBonus,
  onClothesChange,
  fortBonus,
  onFortChange,
  onCalculate,
  language,
  moduleName,
  moduleEnName,
}) => {
  const t = translations[language];

  // Define o nome do item (PT ou EN)
  const itemName = targetItemInfo 
    ? (language === 'pt' ? targetItemInfo.item : (targetItemInfo.en_name || targetItemInfo.item)) 
    : "";

  // Define o label da roupa (PT ou EN)
  const clothesLabel = language === 'pt' 
    ? `${t.clothes} ${moduleName} (+10%)`
    : `${moduleEnName} ${t.clothes} (+10%)`;

  return (
    <>
      <Avatar src={targetItemInfo?.imagem} sx={{ width: 80, height: 80, backgroundColor: targetBgColor, mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        {itemName} {/* <-- TRADUZIDO */}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
        <FormControlLabel 
          control={<Checkbox checked={clothesBonus} onChange={onClothesChange} />} 
          label={clothesLabel} /* <-- TRADUZIDO (DINÂMICO) */
        />
        <FormControlLabel 
          control={<Checkbox checked={fortBonus} onChange={onFortChange} />} 
          label={`${t.fort} (+10%)`} /* <-- TRADUZIDO */
        />
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, mb: 3 }}>
        <TextField
          label={t.quantity} /* <-- TRADUZIDO */
          type="number"
          variant="outlined"
          value={quantity}
          onChange={onQuantityChange}
          size="small"
          sx={{ width: 120 }}
          inputProps={{ min: 1 }}
        />
        <Button variant="contained" size="large" onClick={onCalculate}>
          {t.calculate} {/* <-- TRADUZIDO */}
        </Button>
      </Stack>
    </>
  );
};

export default CraftingControls;