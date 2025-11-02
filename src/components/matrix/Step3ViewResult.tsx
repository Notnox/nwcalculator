// src/components/matrix/Step3ViewResult.tsx
import React, { useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { analyzeMatrix } from '../../utils/matrixCostCalculator';
import { recipeMap } from '../../data/matrixData';

// --- NOVOS IMPORTS DOS COMPONENTES FILHOS ---
import ResultDisplay from './ResultDisplay';
import RecipeOptionsDisplay from './RecipeOptionsDisplay';


interface Step3Props {
  language: 'pt' | 'en';
  prices: Map<string, number>;
  selectedMatrix: string;
  onBack: () => void;
  onReset: () => void;
}

const Step3ViewResult: React.FC<Step3Props> = ({ language, prices, selectedMatrix, onBack, onReset }) => {

  // --- LÓGICA (SEM ALTERAÇÃO) ---
  const analysisResult = useMemo(() => {
    if (!selectedMatrix || prices.size === 0) {
      return null; // Não roda a análise se não houver preços
    }
    return analyzeMatrix(selectedMatrix, prices, language);
  }, [selectedMatrix, prices, language]);
  
  const recipes = useMemo(() => {
    return recipeMap.get(selectedMatrix) || [];
  }, [selectedMatrix]);

  const hasPrices = prices.size > 0;

  // --- Traduções (sem alteração) ---
  const t = language === 'pt' ? {
    back: "Voltar",
    new_calc: "Novo Cálculo",
    error: "Erro",
    error_desc: "Matriz não selecionada. Por favor, volte para a Etapa 1.",
    insufficient: "Preços Insuficientes",
    insufficient_desc: "Não foi possível calcular o custo do craft. Por favor, volte e insira mais preços na Etapa 2.",
    no_price_title: "Receitas Possíveis", 
    no_price_desc: "Você pulou a Etapa 2 (Preços), então não é possível fazer uma análise de custo. Aqui estão as receitas disponíveis para este item:",
  } : {
    back: "Back",
    new_calc: "New Calculation",
    error: "Error",
    error_desc: "No matrix selected. Please return to Step 1.",
    insufficient: "Insufficient Prices",
    insufficient_desc: "Could not calculate crafting cost. Please go back and enter more prices in Step 2.",
    no_price_title: "Available Recipes", 
    no_price_desc: "You skipped Step 2 (Prices), so a cost analysis cannot be performed. Here are the available recipes for this item:",
  };

  return (
    <Box>
      {/* Botões de Navegação (sempre visíveis) */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>
          {t.back}
        </Button>
        <Button variant="contained" onClick={onReset}>
          {t.new_calc}
        </Button>
      </Box>
      
      {/* --- RENDERIZAÇÃO CONDICIONAL (AGORA MAIS LIMPA) --- */}
      {hasPrices ? (
        // CENÁRIO 1: Usuário inseriu preços
        <>
          {!analysisResult ? (
            <Typography color="error">{t.error_desc}</Typography>
          ) : analysisResult.bestOption.cost === 0 && analysisResult.bestOption.recipe === null ? (
            <Typography color="warning.main">
              {t.insufficient_desc}
            </Typography>
          ) : (
            // --- USA O COMPONENTE IMPORTADO ---
            <ResultDisplay 
              result={analysisResult} 
              language={language}
              prices={prices}
            />
          )}
        </>
      ) : (
        // CENÁRIO 2: Usuário NÃO inseriu preços
        <Box>
          <Typography variant="h6" gutterBottom>{t.no_price_title}</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>{t.no_price_desc}</Typography>
          {/* --- USA O COMPONENTE IMPORTADO --- */}
          <RecipeOptionsDisplay recipes={recipes} language={language} />
        </Box>
      )}
    </Box>
  );
};

export default Step3ViewResult;