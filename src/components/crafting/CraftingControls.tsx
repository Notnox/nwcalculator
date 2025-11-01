// src/components/crafting/CraftingControls.tsx
import React from 'react';
import {
  Avatar,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from '@mui/material';
import { type ItemInfo } from '../../types/craftingTypes';

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
}) => {
  return (
    <>
      {/* Avatar e Título em Destaque */}
      <Avatar src={targetItemInfo?.imagem} sx={{ width: 80, height: 80, backgroundColor: targetBgColor, mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        {targetItemInfo?.item}
      </Typography>

      {/* Checkboxes de Bônus */}
      <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
        <FormControlLabel control={<Checkbox checked={clothesBonus} onChange={onClothesChange} />} label="Roupa de Cantaria (+10%)" />
        <FormControlLabel control={<Checkbox checked={fortBonus} onChange={onFortChange} />} label="Bônus do Forte (+10%)" />
      </Stack>

      {/* Quantidade e Botão Calcular */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, mb: 3 }}>
        <TextField
          label="Quantidade"
          type="number"
          variant="outlined"
          value={quantity}
          onChange={onQuantityChange}
          size="small"
          sx={{ width: 120 }}
          inputProps={{ min: 1 }}
        />
        <Button variant="contained" size="large" onClick={onCalculate}>
          Calcular
        </Button>
      </Stack>
    </>
  );
};

export default CraftingControls;