import React, { useState, useEffect, useMemo } from 'react';
import { Box, Stepper, Step, StepLabel, Container, Paper } from '@mui/material';
import Step1SelectMatrix from '../components/matrix/Step1SelectMatrix';
import Step2InputPrices from '../components/matrix/Step2InputPrices';
import Step3ViewResult from '../components/matrix/Step3ViewResult';
import { getDependencyTree } from '../utils/matrixCostCalculator';
import { priceableItems as allPriceableItems } from '../data/matrixData'; 
import { useSettings } from '../contexts/SettingsContext';

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
  const { language } = useSettings();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedMatrix, setSelectedMatrix] = usePersistentState<string | null>('matrix_selected', null);
  const [pricesObj, setPricesObj] = usePersistentState<Record<string, number>>('matrix_prices', {});
  const [prices, setPrices] = useState(new Map(Object.entries(pricesObj)));
  
  useEffect(() => {
    setPricesObj(Object.fromEntries(prices));
  }, [prices, setPricesObj]);

  const filteredPriceableItems = useMemo(() => {
    if (!selectedMatrix) {
      return []; 
    }
    const dependencyTree = getDependencyTree(selectedMatrix); 
    
    return allPriceableItems.filter(item => 
      dependencyTree.has(item.item)
    );

  }, [selectedMatrix]);

  const steps = [
    language === 'pt' ? 'Selecionar Matriz' : 'Select Matrix',
    language === 'pt' ? 'Informar Preços' : 'Input Prices',
    language === 'pt' ? 'Resultado' : 'Result',
  ];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
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
            selectedMatrix={selectedMatrix}
            onSelectMatrix={setSelectedMatrix}
            onNext={handleNext}
            onSelectAndNext={handleSelectAndNext}
          />
        );
      case 1:
        return (
          <Step2InputPrices
            prices={prices}
            onSetPrices={setPrices}
            onBack={handleBack}
            onNext={handleNext}
            selectedMatrix={selectedMatrix!}
            priceableItems={filteredPriceableItems}
          />
        );
      case 2:
        return (
          <Step3ViewResult
            prices={prices}
            selectedMatrix={selectedMatrix!}
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