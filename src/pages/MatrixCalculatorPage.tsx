// src/pages/MatrixCalculatorPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Stepper, Step, StepLabel, Container, Paper } from '@mui/material';
import { useApp } from '../layout/MainLayout';
import Step1SelectMatrix from '../components/matrix/Step1SelectMatrix';
import Step2InputPrices from '../components/matrix/Step2InputPrices';
import Step3ViewResult from '../components/matrix/Step3ViewResult';

// --- ADICIONE A LINHA QUE FALTAVA AQUI ---
import { getDependencyTree } from '../utils/matrixCostCalculator';
// ------------------------------------------

// Renomeamos a importação para 'allPriceableItems' para evitar conflito de nome
import { priceableItems as allPriceableItems } from '../data/matrixData'; 


/**
 * Hook customizado para salvar o estado no localStorage
 * (para persistência entre recarregamentos da página)
 */
function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
}

const MatrixCalculatorPage: React.FC = () => {
  const { language } = useApp(); // Pega o idioma do contexto
  const [activeStep, setActiveStep] = useState(0);
  
  // --- ESTADO PERSISTENTE (Salvo no localStorage) ---
  const [selectedMatrix, setSelectedMatrix] = usePersistentState<string | null>('matrix_selected', null);
  
  // Os preços são um Map, mas o JSON só armazena objetos
  const [pricesObj, setPricesObj] = usePersistentState<Record<string, number>>('matrix_prices', {});
  
  // Criamos um Map/SetMap para os componentes filhos usarem
  const [prices, setPrices] = useState(new Map(Object.entries(pricesObj)));
  
  // Sincroniza o Map -> Objeto (para salvar no localStorage)
  useEffect(() => {
    setPricesObj(Object.fromEntries(prices));
  }, [prices, setPricesObj]);
  // --- FIM DO ESTADO PERSISTENTE ---

  // --- LÓGICA DE FILTRO (para a Etapa 2) ---
  const filteredPriceableItems = useMemo(() => {
    if (!selectedMatrix) {
      return []; // Se nada selecionado, lista vazia
    }
    
    // 1. Pega a árvore de dependência completa (ex: "Matriz de Armas" e todos os seus sub-itens)
    // (Esta função precisa daquele import)
    const dependencyTree = getDependencyTree(selectedMatrix); 
    
    // 2. Filtra a lista mestre de itens precificáveis
    return allPriceableItems.filter(item => 
      dependencyTree.has(item.item)
    );

  }, [selectedMatrix]);
  // --- FIM DA LÓGICA DE FILTRO ---

  const steps = [
    language === 'pt' ? 'Selecionar Matriz' : 'Select Matrix',
    language === 'pt' ? 'Informar Preços' : 'Input Prices',
    language === 'pt' ? 'Resultado' : 'Result',
  ];

  // --- Handlers ---
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    // "Novo Calculo" - volta à etapa 1, mas mantém os estados
    setActiveStep(0); 
  };
  const handleSelectAndNext = (name: string) => {
    setSelectedMatrix(name);
    handleNext();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Step1SelectMatrix
            language={language}
            selectedMatrix={selectedMatrix}
            onSelectMatrix={setSelectedMatrix}
            onNext={handleNext}
            onSelectAndNext={handleSelectAndNext} // Para o double-click
          />
        );
      case 1:
        return (
          <Step2InputPrices
            language={language}
            prices={prices}
            onSetPrices={setPrices}
            onBack={handleBack}
            onNext={handleNext}
            selectedMatrix={selectedMatrix!} // Passa a matriz selecionada (para o título)
            priceableItems={filteredPriceableItems} // Passa a lista JÁ FILTRADA
          />
        );
      case 2:
        return (
          <Step3ViewResult
            language={language}
            prices={prices}
            selectedMatrix={selectedMatrix!} // Sabemos que não é null aqui
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mb: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box>
          {renderStepContent(activeStep)}
        </Box>
      </Paper>
    </Container>
  );
};

export default MatrixCalculatorPage;