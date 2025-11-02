import React from 'react';
import { Stack, Typography, Paper, Box, Avatar, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { type CraftingStep } from '../../utils/craftCalculator';
import { type ItemInfo } from '../../types/craftingTypes';
import { colorMap } from '../../utils/colorMap';
import { useSettings } from '../../contexts/SettingsContext'; 

const translations = {
  pt: {
    title: "Etapas de Craft",
    step: "Etapa",
    materials: "Matéria-prima necessária",
    total: "Total de refino",
    refines: "refinos"
  },
  en: {
    title: "Crafting Steps",
    step: "Step",
    materials: "Required materials",
    total: "Total refinements",
    refines: "refines"
  }
};

interface CraftingStepsProps {
  steps: CraftingStep[];
  itemInfoMap: Map<string, ItemInfo>;
}

const CraftingSteps: React.FC<CraftingStepsProps> = ({ steps, itemInfoMap }) => {
  
  const { language } = useSettings();
  const t = translations[language];

  return (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 1 }}>
        {t.title} 
      </Typography>

      {steps.map((step: CraftingStep, index: number) => {
        const stepInfo = itemInfoMap.get(step.itemName);
        const stepBgColor = stepInfo ? colorMap[stepInfo.backgroundColor] : colorMap.default;
        
        const stepName = stepInfo ? (language === 'pt' ? stepInfo.item : (stepInfo.en_name || stepInfo.item)) : step.itemName;

        return (
          <Paper key={step.itemName} elevation={2} sx={{ p: 2, overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar src={stepInfo?.imagem} sx={{ backgroundColor: stepBgColor }} />
              <Typography variant="h6">
                {`${t.step} ${index + 1}: ${stepName}`} 
              </Typography>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              {t.materials} 
            </Typography>
            <TableContainer component={Paper} elevation={0} variant="outlined">
              <Table size="small">
                <TableBody>
                  {step.ingredients.map((ing) => {
                    const ingInfo = itemInfoMap.get(ing.item);
                    const ingBgColor = ingInfo ? colorMap[ingInfo.backgroundColor] : colorMap.default;
                    
                    const ingName = ingInfo ? (language === 'pt' ? ingInfo.item : (ingInfo.en_name || ingInfo.item)) : ing.item;

                    return (
                      <TableRow key={ing.item}>
                        <TableCell sx={{ width: '50px' }}>
                          <Avatar src={ingInfo?.imagem} sx={{ width: 24, height: 24, backgroundColor: ingBgColor }} />
                        </TableCell>
                        <TableCell>{ingName}</TableCell> 
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
              {`${t.total}: ${Math.ceil(step.craftsNeeded)} ${t.refines}`} 
            </Typography>
          </Paper>
        );
      })}
    </Stack>
  );
};

export default CraftingSteps;