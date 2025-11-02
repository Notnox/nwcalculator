import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Avatar, TextField, Typography, Paper } from '@mui/material';
import { itemInfoMap } from '../../data/matrixData';
import { colorMap } from '../../utils/colorMap';
import { type ItemInfo } from '../../types/craftingTypes';
import { useSettings } from '../../contexts/SettingsContext';

interface Step2Props {
  prices: Map<string, number>; 
  onSetPrices: (newPrices: Map<string, number>) => void;
  onBack: () => void;
  onNext: () => void;
  selectedMatrix: string;
  priceableItems: ItemInfo[]; 
}

const numberMapToStringMap = (numMap: Map<string, number>): Map<string, string> => {
  const stringMap = new Map<string, string>();
  numMap.forEach((value, key) => {
    if (value > 0) {
      stringMap.set(key, value.toString().replace('.', ','));
    } else {
      stringMap.set(key, '');
    }
  });
  return stringMap;
};

const Step2InputPrices: React.FC<Step2Props> = ({ 
  prices, onSetPrices, onBack, onNext,
  selectedMatrix, priceableItems
}) => {
  
  const { language } = useSettings(); 
  const [localValues, setLocalValues] = useState(() => numberMapToStringMap(prices));

  useEffect(() => {
    setLocalValues(numberMapToStringMap(prices));
  }, [priceableItems]); 

  const handlePriceChange = (itemName: string, value: string) => {
    
    let cleanValue = value.replace('.', ',');
    cleanValue = cleanValue.replace(/[^0-9,]/g, '');

    const parts = cleanValue.split(',');
    if (parts.length > 2) {
      cleanValue = parts[0] + ',' + parts.slice(1).join('');
    }

    if (parts.length === 2 && parts[1].length > 2) {
      cleanValue = parts[0] + ',' + parts[1].substring(0, 2);
    }
    
    const newLocalValues = new Map(localValues);
    newLocalValues.set(itemName, cleanValue);
    setLocalValues(newLocalValues);

    const formattedForCalc = cleanValue.replace(',', '.');
    const newPrice = parseFloat(formattedForCalc);
    
    const newPrices = new Map(prices);
    if (!isNaN(newPrice) && newPrice >= 0) {
      newPrices.set(itemName, newPrice);
    } else {
      newPrices.delete(itemName);
    }
    onSetPrices(newPrices);
  };

  const t = language === 'pt' ? {
    back: "Voltar",
    next: "Próxima Etapa",
    price: "Preço",
    help1: "Esta etapa é opcional, mas recomendada.",
    help2: "Informe os preços de mercado atuais. Isso permitirá que a calculadora encontre a opção mais barata (comprar vs. fabricar)."
  } : {
    back: "Back",
    next: "Next Step",
    price: "Price",
    help1: "This step is optional but recommended.",
    help2: "Enter the current market prices. This will allow the calculator to find the cheapest option (buy vs. craft)."
  };

  const selectedMatrixInfo = itemInfoMap.get(selectedMatrix);
  const selectedMatrixName = selectedMatrixInfo 
    ? (language === 'pt' ? selectedMatrixInfo.item : (selectedMatrixInfo.en_name || selectedMatrixInfo.item))
    : "";

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
        <Avatar 
          src={selectedMatrixInfo?.imagem}
          sx={{ width: 40, height: 40, backgroundColor: colorMap[selectedMatrixInfo?.backgroundColor || 'default'] }}
        />
        <Typography variant="h6">
          {selectedMatrixName}
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={0} variant="outlined" sx={{ mb: 2, maxHeight: 400, overflow: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableBody>
            {priceableItems.map((item) => {
              const info = itemInfoMap.get(item.item);
              const name = language === 'pt' ? info?.item : (info?.en_name || info?.item);
              
              const currentDisplayValue = localValues.get(item.item) || '';
              
              return (
                <TableRow key={item.item}>
                  <TableCell sx={{ width: 40 }}>
                    <Avatar 
                      src={info?.imagem} 
                      sx={{ width: 28, height: 28, backgroundColor: colorMap[info?.backgroundColor || 'default'] }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    
                    <TextField
                      label={t.price}
                      type="text"
                      size="small"
                      variant="outlined"
                      value={currentDisplayValue}
                      onChange={(e) => handlePriceChange(item.item, e.target.value)}
                      
                      onWheel={(e) => (e.target as HTMLElement).blur()}

                      sx={{ 
                        width: 150,
                        '& input[type=number]': { '-moz-appearance': 'textfield' },
                        '& input[type=number]::-webkit-outer-spin-button': { '-webkit-appearance': 'none', margin: 0 },
                        '& input[type=number]::-webkit-inner-spin-button': { '-webkit-appearance': 'none', margin: 0 },
                      }}
                      
                      InputProps={{ 
                        inputProps: { 
                          inputMode: 'decimal', 
                          style: { textAlign: 'right' } 
                        } 
                      }}
                    />
                    
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button onClick={onBack}>
          {t.back}
        </Button>
        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
          <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
            {t.help1}<br/>{t.help2}
          </Typography>
          <Button variant="contained" onClick={onNext}>
            {t.next}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Step2InputPrices;