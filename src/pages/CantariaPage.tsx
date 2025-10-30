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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  itemInfoMap,
  type ItemInfo,
  cantariaData,
} from '../data/cantariaData';
import { calculateRequirements, type Requirements } from '../utils/craftCalculator';
import ResultsList from '../components/ResultsList';

// Mapeamento de cores
const colorMap: Record<string, string> = {
  cinza: '#9e9e9e',
  verde: '#4caf50',
  laranja: '#ff9800',
  default: '#607d8b',
};

const CantariaPage: React.FC = () => {
  const targetItemName = 'Bloco Prismático';
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
        targetItemName,
        qty,
        totalBonus
      );
      setResults(calculated);
    } else {
      setResults(null);
    }
  };

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          // --- MUDANÇA DE ESTILO (Padding) ---
          // Restauramos o padding em todos os lados (p: 3)
          p: 3, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
          overflow: 'hidden', 
        }}
      >
        <Avatar
          src={targetItemInfo?.imagem}
          sx={{
            width: 80,
            height: 80,
            backgroundColor: targetBgColor,
            mb: 2,
          }}
        />
        <Typography variant="h5" gutterBottom>
          {targetItemInfo?.item}
        </Typography>

        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ mt: 2, mb: 1, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={clothesBonus}
                onChange={handleClothesChange}
              />
            }
            label="Roupa de Cantaria (+10%)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={fortBonus}
                onChange={handleFortChange}
              />
            }
            label="Bônus do Forte (+10%)"
          />
        </Stack>
        
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ mt: 2, mb: 3 }} // Deixamos uma margem inferior para o Accordion
        >
          <TextField
            label="Quantidade"
            type="number"
            variant="outlined"
            value={quantity} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
            size="small"
            sx={{ width: 120 }}
            inputProps={{ min: 1 }}
          />
          <Button variant="contained" size="large" onClick={handleCalculate}>
            Calcular
          </Button>
        </Stack>

        {/* --- RODAPÉ CORRIGIDO (Estilo e Bug) --- */}
        {/* Removemos o <Box> com margens negativas. 
          O Accordion agora fica DENTRO do padding do Paper.
        */}
        <Accordion 
          elevation={0} 
          sx={{ 
            width: '100%', 
            borderTop: 1, 
            borderColor: 'divider',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ 
              minHeight: 'auto',
              '&.Mui-expanded': { minHeight: 'auto' },
              py: 1,
            }}
          >
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
                  {/* --- CORREÇÃO DO BUG --- */}
                  {/* Iteramos sobre 'cantariaData.receitas' 
                    em vez de 'cantariaData.refinamentos'.
                    Isso garante que "Bloco Prismático" apareça.
                  */}
                  {cantariaData.receitas.map((recipe) => {
                    const baseChance = recipe.chance_adicional || 0;
                    const currentClothesBonus = clothesBonus ? 10 : 0;
                    const currentFortBonus = fortBonus ? 10 : 0;
                    const totalChance = baseChance + currentClothesBonus + currentFortBonus;

                    return (
                      <TableRow key={recipe.item}>
                        <TableCell component="th" scope="row">
                          {recipe.item}
                        </TableCell>
                        <TableCell align="right">{`${baseChance}%`}</TableCell>
                        <TableCell align="right">{`${currentClothesBonus}%`}</TableCell>
                        <TableCell align="right">{`${currentFortBonus}%`}</TableCell>
                        <TableCell align="right">
                          <strong>{`${totalChance}%`}</strong>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        {/* --- FIM DAS CORREÇÕES --- */}

      </Paper>

      {/* Box de Resultados (sem alteração) */}
      {results && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3, 
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <ResultsList
              title="Itens Refinados Necessários"
              itemsMap={results.refined}
            />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <ResultsList
              title="Itens de Matéria-Prima"
              itemsMap={results.base}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CantariaPage;