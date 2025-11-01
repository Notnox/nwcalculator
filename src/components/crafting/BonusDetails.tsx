// src/components/crafting/BonusDetails.tsx
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { type Recipe } from '../../types/craftingTypes';

interface BonusDetailsProps {
  recipes: Recipe[];
  clothesBonus: boolean;
  fortBonus: boolean;
}

const BonusDetails: React.FC<BonusDetailsProps> = ({ recipes, clothesBonus, fortBonus }) => {
  return (
    <Accordion elevation={0} sx={{ width: '100%', borderTop: 1, borderColor: 'divider' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" sx={{ minHeight: 'auto', '&.Mui-expanded': { minHeight: 'auto' }, py: 1 }}>
        <Typography variant="subtitle2" sx={{ textAlign: 'center', width: '100%' }}>
          Detalhes das Chances de Bônus
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item (Receita)</TableCell>
                <TableCell align="right">Base</TableCell>
                <TableCell align="right">Roupas</TableCell>
                <TableCell align="right">Forte</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map((recipe) => {
                const baseChance = recipe.chance_adicional || 0;
                const currentClothesBonus = clothesBonus ? 10 : 0;
                const currentFortBonus = fortBonus ? 10 : 0;
                const totalChance = baseChance + currentClothesBonus + currentFortBonus;
                return (
                  <TableRow key={recipe.item}>
                    <TableCell component="th" scope="row">{recipe.item}</TableCell>
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