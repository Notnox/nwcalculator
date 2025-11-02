import React, { useEffect, useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { type CraftingModule } from '../types/craftingTypes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import { useNavigate } from 'react-router-dom';

import { useSettings } from '../contexts/SettingsContext';

interface CraftingPageProps {
  module: CraftingModule;
}

const pageTitles = {
  pt: {
    refined: "Itens Refinados (Resumo)",
    base: "Matéria-Prima (Resumo)",
    back: "Voltar para Seleção"
  },
  en: {
    refined: "Refined Items (Summary)",
    base: "Raw Materials (Summary)",
    back: "Back to Selection"
  }
};

const CraftingPage: React.FC<CraftingPageProps> = ({ module }) => {
  const { language } = useSettings();
  const t = pageTitles[language];
  const navigate = useNavigate();
  const [targetItemName, setTargetItemName] = useState(module.data.refinamentos[module.data.refinamentos.length - 1].item);
  const [quantity, setQuantity] = useState('1');
  const [results, setResults] = useState<Requirements | null>(null);
  const [clothesBonus, setClothesBonus] = useState(true);
  const [fortBonus, setFortBonus] = useState(true);

  useEffect(() => {
    setTargetItemName(module.data.refinamentos[module.data.refinamentos.length - 1].item);
    setResults(null);
    setQuantity('1');
  }, [module]);

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

  const targetItemInfo = module.itemInfoMap.get(targetItemName);
  const colorKey = targetItemInfo?.backgroundColor || 'default';
  const targetBgColor = colorMap[colorKey] || colorMap.default;

return (
    <>
      <Paper
        elevation={3}
        sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, overflow: 'hidden' }}
      >
        <Box sx={{ width: '100%', textAlign: 'left', mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/refinos')} 
          >
            {t.back}
          </Button>
        </Box>
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
          moduleName={module.data.name.pt_name}
          moduleEnName={module.data.name.en_name}
        />

        <BonusDetails
          recipes={module.data.receitas}
          clothesBonus={clothesBonus}
          fortBonus={fortBonus}
          itemInfoMap={module.itemInfoMap}
        />
      </Paper>

      {results && (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <ResultsList
              title={t.refined}
              itemsMap={results.refined}
              itemInfoMap={module.itemInfoMap} 
            />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <ResultsList
              title={t.base}
              itemsMap={results.base}
              itemInfoMap={module.itemInfoMap} 
            />
          </Box>
        </Box>
      )}

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