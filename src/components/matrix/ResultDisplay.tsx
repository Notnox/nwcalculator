// src/components/matrix/ResultDisplay.tsx
import React from 'react';
import {
  Box, Paper, Typography, Avatar, TableContainer, 
  Table, TableHead, TableBody, TableRow, TableCell 
} from '@mui/material';
import { getCraftCost, type AnalysisResult } from '../../utils/matrixCostCalculator';
import { itemInfoMap, recipeMap } from '../../data/matrixData';
import { colorMap } from '../../utils/colorMap';

import { formatCurrency } from '../../utils/formatting';

interface ResultDisplayProps {
  result: AnalysisResult;
  language: 'pt' | 'en';
  prices: Map<string, number>;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, language, prices }) => {
  
  const { bestOption, allOptions } = result;
  const finalItemInfo = itemInfoMap.get(bestOption.itemName);
  
  const t = language === 'pt' ? {
    best_option: "Melhor Opção Custo-Benefício:",
    total_cost: "Custo Total Estimado",
    analysis_summary: "Resumo da Análise",
    option: "Opção",
    cost: "Custo",
    buy: "(Comprar Pronto)",
    craft: "(Fabricar)"
  } : {
    best_option: "Best Cost-Benefit Option:",
    total_cost: "Estimated Total Cost",
    analysis_summary: "Analysis Summary",
    option: "Option",
    cost: "Cost",
    buy: "(Buy Directly)",
    craft: "(Craft this)"
  };

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: { xs: 1, sm: 3 } }}>
      <Typography variant="h6" gutterBottom>{t.best_option}</Typography>
      
      {/* Cabeçalho (sem alteração) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
        <Avatar 
          src={bestOption.recipe?.trade_skill_icon || finalItemInfo?.imagem} 
          sx={{ backgroundColor: colorMap[finalItemInfo?.backgroundColor || 'default'] }}
        />
        <Typography variant="h5">{bestOption.name}</Typography>
      </Box>
      
      {/* Tabela de Ingredientes (ATUALIZADA) */}
      {bestOption.recipe && (
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table size="small">
            <TableBody>
              {bestOption.recipe.ingredientes.map((ing) => {
                const ingInfo = itemInfoMap.get(ing.item);
                const name = language === 'pt' ? ingInfo?.item : (ingInfo?.en_name || ingInfo?.item);
                
                const ingCostResult = getCraftCost(ing.item, prices);
                const ingCost = ingCostResult.cost;
                const ingMethod = ingCostResult.method;
                // --- MUDANÇA: 'ing.quantidade' (em vez de ing.quantidade) ---
                // (Garantindo que estamos usando o nome de prop correto do seu matrixData)
                const totalIngCost = ing.quantidade * ingCost;
                const quantity = ing.quantidade; // <-- Pega a quantidade

                const subRecipe = (ingMethod === 'craft') 
                  ? recipeMap.get(ing.item)?.[0] 
                  : null;

                return (
                  <React.Fragment key={ing.item}>
                    
                    {/* --- LÓGICA DE RENDERIZAÇÃO CONDICIONAL --- */}
                    {quantity === 1 ? (
                      // --- CENÁRIO 1: Quantidade é 1 (Layout Simplificado) ---
                      <TableRow>
                        <TableCell sx={{ width: '50px' }}>
                          <Avatar src={ingInfo?.imagem} sx={{ width: 24, height: 24, backgroundColor: colorMap[ingInfo?.backgroundColor || 'default'] }} />
                        </TableCell>
                        
                        {/* Célula do Nome (ocupa 3 colunas) */}
                        <TableCell colSpan={3}>
                          <Typography variant="body1">{name}</Typography>
                          {ingMethod === 'buy' && (
                            <Typography variant="caption" sx={{ color: 'success.main', fontStyle: 'italic' }}>
                              {t.buy}
                            </Typography>
                          )}
                          {ingMethod === 'craft' && (
                            <Typography variant="caption" sx={{ color: 'info.main', fontStyle: 'italic' }}>
                              {t.craft}
                            </Typography>
                          )}
                        </TableCell>
                        
                        {/* Célula do Custo Total */}
                        <TableCell align="right">
                          <strong>{formatCurrency(totalIngCost)}</strong>
                        </TableCell>
                      </TableRow>
                    ) : (
                      // --- CENÁRIO 2: Quantidade > 1 (Layout Completo) ---
                      <TableRow>
                        <TableCell sx={{ width: '50px' }}>
                          <Avatar src={ingInfo?.imagem} sx={{ width: 24, height: 24, backgroundColor: colorMap[ingInfo?.backgroundColor || 'default'] }} />
                        </TableCell>
                        
                        <TableCell>
                          <Typography variant="body1">{name}</Typography>
                          {ingMethod === 'buy' && (
                            <Typography variant="caption" sx={{ color: 'success.main', fontStyle: 'italic' }}>
                              {t.buy}
                            </Typography>
                          )}
                          {ingMethod === 'craft' && (
                            <Typography variant="caption" sx={{ color: 'info.main', fontStyle: 'italic' }}>
                              {t.craft}
                            </Typography>
                          )}
                        </TableCell>
                        
                        <TableCell align="right">{`${quantity.toLocaleString('pt-BR')} un`}</TableCell>
                        <TableCell align="right" sx={{ color: 'text.secondary' }}>
                          {ingCost !== Infinity ? `@ ${formatCurrency(ingCost)}` : `@ N/A`}
                        </TableCell>
                        <TableCell align="right">
                          <strong>{formatCurrency(totalIngCost)}</strong>
                        </TableCell>
                      </TableRow>
                    )}
                    
                    {/* --- SUB-LISTA DE INGREDIENTES (sem alteração) --- */}
                    {subRecipe && subRecipe.ingredientes.map(subIng => {
                      const subIngInfo = itemInfoMap.get(subIng.item);
                      const subName = language === 'pt' ? subIngInfo?.item : (subIngInfo?.en_name || subIngInfo?.item);
                      
                      return (
                        <TableRow key={subIng.item} sx={{ backgroundColor: 'action.hover' }}>
                          <TableCell sx={{ pl: 4, py: 0.5, borderBottom: 'none' }}>
                            <Avatar src={subIngInfo?.imagem} sx={{ width: 20, height: 20, backgroundColor: colorMap[subIngInfo?.backgroundColor || 'default'] }} />
                          </TableCell>
                          <TableCell colSpan={2} sx={{ py: 0.5, borderBottom: 'none' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {subName}
                            </Typography>
                          </TableCell>
                          <TableCell colSpan={2} align="right" sx={{ color: 'text.secondary', py: 0.5, borderBottom: 'none' }}>
                            {`${subIng.quantidade.toLocaleString('pt-BR')} un`}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Custo Total (sem alteração) */}
      <Typography variant="h5" align="right" sx={{ mt: 2 }}>
        {`${t.total_cost}: ${formatCurrency(bestOption.totalCost)}`}
      </Typography>

      {/* Tabela de Resumo da Análise (sem alteração) */}
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3, borderTop: 1, borderColor: 'divider', pt: 2 }}>
        {t.analysis_summary}
      </Typography>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t.option}</TableCell>
              <TableCell align="right">{t.cost}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOptions.map((option) => {
              const isBest = option.name === bestOption.name;
              return (
                <TableRow 
                  key={option.name} 
                  sx={{ backgroundColor: isBest ? 'action.selected' : 'transparent' }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" sx={{ fontWeight: isBest ? 'bold' : 'normal' }}>
                      {option.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" sx={{ fontWeight: isBest ? 'bold' : 'normal' }}>
                      {formatCurrency(option.totalCost)}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ResultDisplay;