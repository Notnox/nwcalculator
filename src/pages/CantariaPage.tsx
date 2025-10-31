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
  // --- NOVOS IMPORTS ---
  Tooltip,
  IconButton,
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
  cinza: '#4a4a4aff',
  verde: '#4caf50',
  laranja: '#ff9800',
  default: '#607d8b',
};

const CantariaPage: React.FC = () => {
  // --- MUDANÇA PRINCIPAL ---
  // O item alvo agora é um estado, com "Bloco Prismático" como padrão.
  const [targetItemName, setTargetItemName] = useState('Bloco Prismático');

  // --- TUDO ABAIXO AGORA É DINÂMICO ---
  const targetItemInfo: ItemInfo | undefined = itemInfoMap.get(targetItemName);
  
  const colorKey = targetItemInfo?.backgroundColor || 'default';
  const targetBgColor = colorMap[colorKey] || colorMap.default;
  // --- FIM DA MUDANÇA ---

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

      // --- MUDANÇA NO CÁLCULO ---
      // Passa o 'targetItemName' que está no estado
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
  
  // Limpa os resultados se o item alvo mudar
  const handleTargetItemChange = (newItemName: string) => {
    setTargetItemName(newItemName);
    setResults(null); // Limpa os resultados antigos
    setQuantity('1'); // Reseta a quantidade
  };


  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: 3, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
          overflow: 'hidden', 
        }}
      >
        {/* --- NOVO SELETOR DE REFINAMENTOS --- */}
        <Box sx={{ width: '100%', mb: 3, borderBottom: 1, borderColor: 'divider', pb: 3 }}>
          <Typography variant="caption" display="block" sx={{ textAlign: 'center', color: 'text.secondary', mb: 1.5 }}>
            Selecione o item para calcular:
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            justifyContent="center" 
            flexWrap="wrap"
            // Adiciona um espaçamento entre as linhas se quebrar
            sx={{ rowGap: 1 }} 
          >
            {cantariaData.refinamentos.map((item) => {
              const info = itemInfoMap.get(item.item);
              const isSelected = item.item === targetItemName;
              
              return (
                <Tooltip title={item.item} key={item.item} arrow>
                  {/* Usamos um IconButton para dar área de clique e feedback */}
                  <IconButton 
                    onClick={() => handleTargetItemChange(item.item)}
                    sx={{ 
                      p: 0.5, 
                      // Estilo para o item selecionado (cinza/opaco)
                      opacity: isSelected ? 0.5 : 1.0,
                      border: isSelected ? '2px solid' : '2px solid transparent',
                      borderColor: 'primary.main',
                    }}
                  >
                    <Avatar 
                      src={info?.imagem} 
                      sx={{ 
                        backgroundColor: info ? colorMap[info.backgroundColor] : colorMap.default,
                        // Deixamos os ícones menores
                        width: 40, 
                        height: 40 
                      }} 
                    />
                  </IconButton>
                </Tooltip>
              );
            })}
          </Stack>
        </Box>
        {/* --- FIM DO NOVO SELETOR --- */}

        {/* O Avatar principal agora é dinâmico */}
        <Avatar
          src={targetItemInfo?.imagem}
          sx={{
            width: 80,
            height: 80,
            backgroundColor: targetBgColor,
            mb: 2,
          }}
        />
        {/* O Título principal agora é dinâmico */}
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
          sx={{ mt: 2, mb: 3 }} 
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

        {/* O Accordion/Tabela não precisa de mudanças, 
           pois ele já mostra todas as receitas de forma 
           dinâmica, o que continua sendo útil.
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
              title="Itens de Matéria-Prima Necessários"
              itemsMap={results.base}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CantariaPage;