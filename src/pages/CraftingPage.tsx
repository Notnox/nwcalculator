// src/pages/CraftingPage.tsx
import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { type CraftingModule } from '../types/craftingTypes';
import {
  calculateRequirements,
  type Requirements,
} from '../utils/craftCalculator';
import { colorMap } from '../utils/colorMap'; 
import ResultsList from '../components/ResultsList';
import ItemSelector from '../components/crafting/ItemSelector';
import CraftingControls from '../components/crafting/CraftingControls';
import BonusDetails from '../components/crafting/BonusDetails';
import CraftingSteps from '../components/crafting/CraftingSteps';

interface CraftingPageProps {
  module: CraftingModule;
}

const CraftingPage: React.FC<CraftingPageProps> = ({ module }) => {
  // --- STATE ---
  const [targetItemName, setTargetItemName] = useState(module.data.refinamentos[module.data.refinamentos.length - 1].item);
  const [quantity, setQuantity] = useState('1');
  const [results, setResults] = useState<Requirements | null>(null);
  const [clothesBonus, setClothesBonus] = useState(true);
  const [fortBonus, setFortBonus] = useState(true);

  useEffect(() => {
    // Define o item alvo para o item padrão do NOVO módulo
    setTargetItemName(module.data.refinamentos[module.data.refinamentos.length - 1].item);
    
    // Limpa os resultados e a quantidade
    setResults(null);
    setQuantity('1');

    // Nota: Os bônus (clothes/fort) não são resetados
    // para manter a preferência do usuário entre as profissões.

  }, [module]);

  // --- HANDLERS ---
  const handleClothesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClothesBonus(event.target.checked);
  };
  const handleFortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFortBonus(event.target.checked);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuantity(e.target.value);
  };
  const handleTargetItemChange = (newItemName: string) => {
    setTargetItemName(newItemName);
    setResults(null);
    setQuantity('1');
  };
  const handleCalculate = () => {
    const qty = Number(quantity);
    if (qty > 0) {
      let totalBonus = 0;
      if (clothesBonus) totalBonus += 10;
      if (fortBonus) totalBonus += 10;
      const calculated: Requirements = calculateRequirements(
        targetItemName, qty, totalBonus, module.recipeMap
      );
      setResults(calculated);
    } else {
      setResults(null);
    }
  };

  // --- DERIVED DATA ---
  const targetItemInfo = module.itemInfoMap.get(targetItemName);
  const colorKey = targetItemInfo?.backgroundColor || 'default';
  // Esta linha agora usa o 'colorMap' importado
  const targetBgColor = colorMap[colorKey] || colorMap.default;

  return (
    <>
      {/* Card Principal */}
      <Paper
        elevation={3}
        sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, overflow: 'hidden', backgroundColor: 'hsl(0, 0%, %)' }}
      >
        <ItemSelector
          refinements={module.data.refinamentos}
          itemInfoMap={module.itemInfoMap}
          selectedItemName={targetItemName}
          onSelectItem={handleTargetItemChange}
        />

        <CraftingControls
          targetItemInfo={targetItemInfo}
          targetBgColor={targetBgColor}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          clothesBonus={clothesBonus}
          onClothesChange={handleClothesChange}
          fortBonus={fortBonus}
          onFortChange={handleFortChange}
          onCalculate={handleCalculate}
        />

        <BonusDetails
          recipes={module.data.receitas}
          clothesBonus={clothesBonus}
          fortBonus={fortBonus}
        />
      </Paper>

      {/* --- LISTAS DE RESUMO (SHOPPING LIST) --- */}
      {results && (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <ResultsList
              title="Itens Refinados (Resumo)"
              itemsMap={results.refined}
              itemInfoMap={module.itemInfoMap} 
            />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <ResultsList
              title="Matéria-Prima (Resumo)"
              itemsMap={results.base}
              itemInfoMap={module.itemInfoMap} 
            />
          </Box>
        </Box>
      )}

      {/* --- ETAPAS DE CRAFT (MODO DE PREPARO) --- */}
      {results && results.steps.length > 0 && (
        <CraftingSteps
          steps={results.steps}
          itemInfoMap={module.itemInfoMap}
        />
      )}
    </>
  );
}

export default CraftingPage;