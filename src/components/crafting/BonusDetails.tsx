// src/components/crafting/BonusDetails.tsx
import React from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, TableContainer,
  Table, TableHead, TableBody, TableRow, TableCell, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { type Recipe, type ItemInfo } from '../../types/craftingTypes'; // <-- Importar ItemInfo

// Objeto de tradução
const translations = {
  pt: {
    title: "Detalhes das Chances de Bônus",
    item: "Item (Receita)",
    base: "Base",
    clothes: "Roupas",
    fort: "Forte",
    total: "Total"
  },
  en: {
    title: "Bonus Chance Details",
    item: "Item (Recipe)",
    base: "Base",
    clothes: "Gear",
    fort: "Fort",
    total: "Total"
  }
};

interface BonusDetailsProps {
  recipes: Recipe[];
  clothesBonus: boolean;
  fortBonus: boolean;
  language: 'pt' | 'en';        // <-- NOVA PROP
  itemInfoMap: Map<string, ItemInfo>; // <-- NOVA PROP
}

const BonusDetails: React.FC<BonusDetailsProps> = ({ 
  recipes, 
  clothesBonus, 
  fortBonus, 
  language, 
  itemInfoMap 
}) => {
  const t = translations[language];

  return (
    <Accordion elevation={0} sx={{ width: '100%', borderTop: 1, borderColor: 'divider' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 'auto', '&.Mui-expanded': { minHeight: 'auto' }, py: 1 }}>
        <Typography variant="subtitle2" sx={{ textAlign: 'center', width: '100%' }}>
          {t.title} {/* <-- TRADUZIDO */}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t.item}</TableCell>
                <TableCell align="right">{t.base}</TableCell>
                <TableCell align="right">{t.clothes}</TableCell>
                <TableCell align="right">{t.fort}</TableCell>
                <TableCell align="right">{t.total}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map((recipe) => {
                const baseChance = recipe.chance_adicional || 0;
                const currentClothesBonus = clothesBonus ? 10 : 0;
                const currentFortBonus = fortBonus ? 10 : 0;
                const totalChance = baseChance + currentClothesBonus + currentFortBonus;

                // Pega a info do item para tradução
                const info = itemInfoMap.get(recipe.item);
                const itemName = info ? (language === 'pt' ? info.item : (info.en_name || info.item)) : recipe.item;

                return (
                  <TableRow key={recipe.item}>
                    <TableCell component="th" scope="row">{itemName}</TableCell> {/* <-- TRADUZIDO */}
                    <TableCell align="right">{`${baseChance}%`}</TableCell>
                    <TableCell align="right">{`${currentClothesBonus}%`}</TableCell>
                    <TableCell align="right">{`${currentFortBonus}%`}</TableCell>
                    <TableCell align="right"><strong>{`${totalChance}%`}</strong></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default BonusDetails;