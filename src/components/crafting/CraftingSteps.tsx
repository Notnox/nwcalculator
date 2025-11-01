// src/components/crafting/CraftingSteps.tsx
import React from 'react';
import {
  Stack,
  Typography,
  Paper,
  Box,
  Avatar,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { type CraftingStep } from '../../utils/craftCalculator';
import { type ItemInfo } from '../../types/craftingTypes';
// --- MUDANÇA 1: Importar o colorMap centralizado ---
import { colorMap } from '../../utils/colorMap';

interface CraftingStepsProps {
  steps: CraftingStep[];
  itemInfoMap: Map<string, ItemInfo>;
}

const CraftingSteps: React.FC<CraftingStepsProps> = ({ steps, itemInfoMap }) => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 1 }}>
        Etapas de Craft
      </Typography>

      {steps.map((step: CraftingStep, index: number) => {
        const stepInfo = itemInfoMap.get(step.itemName);
        // Esta linha agora usa o 'colorMap' importado
        const stepBgColor = stepInfo ? colorMap[stepInfo.backgroundColor] : colorMap.default;

        return (
          <Paper key={step.itemName} elevation={2} sx={{ p: 2, overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar src={stepInfo?.imagem} sx={{ backgroundColor: stepBgColor }} />
              <Typography variant="h6">
                {`Etapa ${index + 1}: ${step.itemName}`}
              </Typography>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Matéria-prima necessária
            </Typography>
            <TableContainer component={Paper} elevation={0} variant="outlined">
              <Table size="small">
                <TableBody>
                  {step.ingredients.map((ing) => {
                    const ingInfo = itemInfoMap.get(ing.item);
                    // Esta linha agora usa o 'colorMap' importado
                    const ingBgColor = ingInfo ? colorMap[ingInfo.backgroundColor] : colorMap.default;

                    return (
                      <TableRow key={ing.item}>
                        <TableCell sx={{ width: '50px' }}>
                          <Avatar src={ingInfo?.imagem} sx={{ width: 24, height: 24, backgroundColor: ingBgColor }} />
                        </TableCell>
                        <TableCell>{ingInfo?.item || ing.item}</TableCell>
                        <TableCell align="right">
                          {Math.ceil(ing.quantity).toLocaleString('pt-BR')}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" align="right" sx={{ mt: 2 }}>
              {`Total de refino: ${Math.ceil(step.craftsNeeded)} refinos`}
            </Typography>
          </Paper>
        );
      })}
    </Stack>
  );
};

export default CraftingSteps;