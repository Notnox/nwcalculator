// src/pages/CantariaPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Paper,
  Stack,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  itemInfoMap,
  type ItemInfo,
  cantariaData,
  // --- CORREÇÃO AQUI ---
  // A 'CraftingStep' foi REMOVIDA desta linha
} from '../data/cantariaData';
import { 
  calculateRequirements, 
  type Requirements,
  // --- CORREÇÃO AQUI ---
  // E ADICIONADA nesta linha, de onde ela realmente vem
  type CraftingStep,
} from '../utils/craftCalculator';
import ResultsList from '../components/ResultsList';

// Mapeamento de cores
const colorMap: Record<string, string> = {
  cinza: '#9e9e9e',
  verde: '#4caf50',
  laranja: '#ff9800',
  default: '#607d8b',
};

const CantariaPage: React.FC = () => {
  const [targetItemName, setTargetItemName] = useState('Bloco Prismático');
  const targetItemInfo: ItemInfo | undefined = itemInfoMap.get(targetItemName);
  const colorKey = targetItemInfo?.backgroundColor || 'default';
  const targetBgColor = colorMap[colorKey] || colorMap.default;

  const [quantity, setQuantity] = useState('1'); 
  const [results, setResults] = useState<Requirements | null>(null);
  const [clothesBonus, setClothesBonus] = useState(true);
  const [fortBonus, setFortBonus] = useState(true);

  const handleClothesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClothesBonus(event.target.checked);
  };
  const handleFortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFortBonus(event.target.checked);
  };

  const handleCalculate = () => {
    const qty = Number(quantity); 
    if (qty > 0) {
      let totalBonus = 0;
      if (clothesBonus) totalBonus += 10;
      if (fortBonus) totalBonus += 10;
      const calculated: Requirements = calculateRequirements(
        targetItemName, qty, totalBonus
      );
      setResults(calculated);
    } else {
      setResults(null);
    }
  };
  
  const handleTargetItemChange = (newItemName: string) => {
    setTargetItemName(newItemName);
    setResults(null);
    setQuantity('1');
  };

  return (
    // Usamos React.Fragment <> para não adicionar um nó extra
    <>
      {/* Card Principal (sem alteração) */}
      <Paper
        elevation={3}
        sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, overflow: 'hidden' }}
      >
        {/* Seletor de Itens */}
        <Box sx={{ width: '100%', mb: 3, borderBottom: 1, borderColor: 'divider', pb: 3 }}>
          <Typography variant="caption" display="block" sx={{ textAlign: 'center', color: 'text.secondary', mb: 1.5 }}>
            Selecione o item para calcular:
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ rowGap: 1 }} >
            {cantariaData.refinamentos.map((item) => {
              const info = itemInfoMap.get(item.item);
              const isSelected = item.item === targetItemName;
              return (
                <Tooltip title={item.item} key={item.item} arrow>
                  <IconButton 
                    onClick={() => handleTargetItemChange(item.item)}
                    sx={{ 
                      p: 0.5, 
                      opacity: isSelected ? 0.5 : 1.0,
                      border: isSelected ? '2px solid' : '2px solid transparent',
                      borderColor: 'primary.main',
                    }}
                  >
                    <Avatar 
                      src={info?.imagem} 
                      sx={{ 
                        backgroundColor: info ? colorMap[info.backgroundColor] : colorMap.default,
                        width: 40, height: 40 
                      }} 
                    />
                  </IconButton>
                </Tooltip>
              );
            })}
          </Stack>
        </Box>

        {/* Avatar e Título em Destaque */}
        <Avatar src={targetItemInfo?.imagem} sx={{ width: 80, height: 80, backgroundColor: targetBgColor, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          {targetItemInfo?.item}
        </Typography>

        {/* Checkboxes de Bônus */}
        <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <FormControlLabel control={<Checkbox checked={clothesBonus} onChange={handleClothesChange} />} label="Roupa de Cantaria (+10%)" />
          <FormControlLabel control={<Checkbox checked={fortBonus} onChange={handleFortChange} />} label="Bônus do Forte (+10%)" />
        </Stack>
        
        {/* Quantidade e Botão Calcular */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, mb: 3 }} >
          <TextField label="Quantidade" type="number" variant="outlined" value={quantity} onChange={(e) => setQuantity(e.target.value)} size="small" sx={{ width: 120 }} inputProps={{ min: 1 }} />
          <Button variant="contained" size="large" onClick={handleCalculate}>
            Calcular
          </Button>
        </Stack>

        {/* Accordion de Detalhes (sem alteração) */}
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
                  {cantariaData.receitas.map((recipe) => {
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
      </Paper>

      {/* --- LISTAS DE RESUMO (SHOPPING LIST) --- */}
      {results && (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }} >
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <ResultsList
              title="Itens Refinados (Resumo)"
              itemsMap={results.refined}
            />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <ResultsList
              title="Matéria-Prima (Resumo)"
              itemsMap={results.base}
            />
          </Box>
        </Box>
      )}

      {/* --- NOVO: ETAPAS DE CRAFT (MODO DE PREPARO) --- */}
      {results && results.steps.length > 0 && (
        <Stack spacing={3}>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 1 }}>
            Etapas de Craft
          </Typography>

          {/* Mapeia cada etapa de craft */}
          {results.steps.map((step: CraftingStep, index: number) => {
            const stepInfo = itemInfoMap.get(step.itemName);
            const stepBgColor = stepInfo ? colorMap[stepInfo.backgroundColor] : colorMap.default;

            return (
              <Paper key={step.itemName} elevation={2} sx={{ p: 2, overflow: 'hidden' }}>
                {/* Subtítulo da Etapa */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Avatar src={stepInfo?.imagem} sx={{ backgroundColor: stepBgColor }} />
                  <Typography variant="h6">
                    {`Etapa ${index + 1}: ${step.itemName}`}
                  </Typography>
                </Box>
                
                {/* Tabela de Materiais da Etapa */}
                <Typography variant="subtitle2" gutterBottom>
                  Matéria-prima necessária
                </Typography>
                <TableContainer component={Paper} elevation={0} variant="outlined">
                  <Table size="small">
                    <TableBody>
                      {step.ingredients.map((ing) => {
                        const ingInfo = itemInfoMap.get(ing.item);
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

                {/* Total de Refino */}
                <Typography variant="h6" align="right" sx={{ mt: 2 }}>
                  {`Total de refino: ${Math.ceil(step.craftsNeeded)} refinos`}
                </Typography>
              </Paper>
            );
          })}
        </Stack>
      )}
    </>
  );
}

export default CantariaPage;