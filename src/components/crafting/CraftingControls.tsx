// src/components/crafting/CraftingControls.tsx
import React from 'react';
import { Avatar, Typography, Stack, FormControlLabel, Checkbox, TextField, Button } from '@mui/material';
import { type ItemInfo } from '../../types/craftingTypes';

// --- ATUALIZADO: Novas traduções ---
const translations = {
  pt: {
    clothes: "Roupa de",
    fort: "Bônus do Forte",
    quantity: "Quantidade",
    calculate: "Calcular",
    tip: "Dica: Para garantir que os materiais durem, siga a quantidade de 'Total de refino' de cada etapa."
  },
  en: {
    clothes: "Gear", // Ex: "Stonecutting Gear"
    fort: "Fort Bonus",
    quantity: "Quantity",
    calculate: "Calculate",
    tip: "Tip: To ensure materials last, follow the 'Total refinements' count for each step."
  }
};
// --- FIM DA ATUALIZAÇÃO ---

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
  language: 'pt' | 'en'; 
  moduleName: string;   
  moduleEnName: string;  
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

  const itemName = targetItemInfo 
    ? (language === 'pt' ? targetItemInfo.item : (targetItemInfo.en_name || targetItemInfo.item)) 
    : "";

  const clothesLabel = language === 'pt' 
    ? `${t.clothes} ${moduleName} (+10%)`
    : `${moduleEnName} ${t.clothes} (+10%)`;

  return (
    <>
      <Avatar src={targetItemInfo?.imagem} sx={{ width: 80, height: 80, backgroundColor: targetBgColor, mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        {itemName} 
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
        <FormControlLabel 
          control={<Checkbox checked={clothesBonus} onChange={onClothesChange} />} 
          label={clothesLabel} 
        />
        <FormControlLabel 
          control={<Checkbox checked={fortBonus} onChange={onFortChange} />} 
          label={`${t.fort} (+10%)`} 
        />
      </Stack>

      <Stack 
        direction="row" 
        spacing={2} 
        alignItems="center" 
        // --- ATUALIZADO: Reduzimos a margem de baixo do Stack ---
        sx={{ mt: 2, mb: 1 }}
      >
        <TextField
          label={t.quantity} 
          type="number"
          variant="outlined"
          value={quantity}
          onChange={onQuantityChange}
          size="small"
          sx={{ width: 120 }}
          inputProps={{ min: 1 }}
        />
        <Button variant="contained" size="large" onClick={onCalculate}>
          {t.calculate} 
        </Button>
      </Stack>

      {/* --- NOVO: Mensagem sutil de dica --- */}
      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ 
          textAlign: 'center', 
          mb: 3, // Esta margem agora empurra o Accordion
          maxWidth: 400 
        }}
      >
        {t.tip}
      </Typography>
      {/* --- FIM DA MUDANÇA --- */}
    </>
  );
};

export default CraftingControls;