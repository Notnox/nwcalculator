import React, { useState, useEffect } from 'react';
import { 
  Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, 
  Avatar, TextField, Typography, Paper, CircularProgress, Alert, Autocomplete,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { itemInfoMap } from '../../data/matrixData';
import { colorMap } from '../../utils/colorMap';
import { type ItemInfo } from '../../types/craftingTypes';
import { useSettings } from '../../contexts/SettingsContext';
import { usePrices } from '../../contexts/PriceContext';
import { serverList } from '../../data/priceData';

interface Step2Props {
  prices: Map<string, number>;
  onSetPrices: (newPrices: Map<string, number>) => void;
  onBack: () => void;
  onNext: () => void;
  selectedMatrix: string;
  priceableItems: ItemInfo[]; 
}

/**
 * Helper para converter o Map<string, number> (do pai)
 * para o Map<string, string> (do estado local)
 * (ex: 16.9 -> "16,9")
 */
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
  
  // --- Hooks de Contexto ---
  const { language } = useSettings(); 
  const { 
    isLoading, 
    error: fetchError, 
    updatePrices,
    loadPricesFromServer, 
    getApiTimestamp 
  } = usePrices();

  // --- Estados Locais ---
  const [localValues, setLocalValues] = useState(() => numberMapToStringMap(prices));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string | null>(null); 
  const [currentApiTimestamp, setCurrentApiTimestamp] = useState<string | null>(null);

  // Efeito 1: Sincroniza se a LISTA DE ITENS mudar (ex: trocar de Matriz)
  useEffect(() => {
    setLocalValues(numberMapToStringMap(prices));
  }, [priceableItems]); 

  // Efeito 2: Sincroniza se o estado PAI (prices) mudar
  // (Necessário para a importação)
  useEffect(() => {
    setLocalValues(numberMapToStringMap(prices));
  }, [prices]);

  // Atualiza o timestamp (e os dados) se o servidor selecionado mudar
  useEffect(() => {
    if (selectedServer) {
      // Carrega os dados do storage para este servidor
      const pricesFromServer = loadPricesFromServer(selectedServer);
      onSetPrices(pricesFromServer); 
      setLocalValues(numberMapToStringMap(pricesFromServer));
      
      // Busca o timestamp desse servidor
      setCurrentApiTimestamp(getApiTimestamp(selectedServer));
    }
  }, [selectedServer]); // Roda quando o usuário troca o servidor no Autocomplete


  // Handler para quando o usuário digita no TextField
  const handlePriceChange = (itemName: string, value: string) => {
    // 1. Normaliza: Aceita ponto ou vírgula, mas força vírgula
    let cleanValue = value.replace('.', ',');

    // 2. Limpa: Remove tudo que não for dígito ou vírgula
    cleanValue = cleanValue.replace(/[^0-9,]/g, '');

    // 3. Garante UMA vírgula
    const parts = cleanValue.split(',');
    if (parts.length > 2) {
      cleanValue = parts[0] + ',' + parts.slice(1).join('');
    }

    // 4. GARANTE 2 CASAS DECIMAIS
    if (parts.length === 2 && parts[1].length > 2) {
      cleanValue = parts[0] + ',' + parts[1].substring(0, 2);
    }
    
    // 5. Atualiza o estado local (o que o usuário vê na tela, ex: "16,")
    const newLocalValues = new Map(localValues);
    newLocalValues.set(itemName, cleanValue);
    setLocalValues(newLocalValues);

    // 6. Atualiza o estado pai (o número para o cálculo, ex: 16)
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
  
  // --- Handlers do Popup e Importação ---
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  
  const handleConfirmImport = async () => {
    handleCloseDialog();
    if (selectedServer) {
      // 1. Chama a função de atualização do CONTEXTO
      // (Isso faz o fetch OU carrega do storage, e salva no localStorage aninhado)
      const fetchedPricesMap = await updatePrices(selectedServer);
      
      if (fetchedPricesMap) {
        // 2. ATUALIZA O ESTADO PAI (Números)
        onSetPrices(fetchedPricesMap);
        
        // 3. ATUALIZA O ESTADO LOCAL (Strings com vírgula)
        setLocalValues(numberMapToStringMap(fetchedPricesMap));
        
        // 4. ATUALIZA O TIMESTAMP (após o fetch/load)
        setCurrentApiTimestamp(getApiTimestamp(selectedServer));
      }
    }
  };

  // Objeto de tradução
  const t = language === 'pt' ? {
    back: "Voltar",
    next: "Próxima Etapa",
    price: "Preço",
    help1: "Esta etapa é opcional, mas recomendada.",
    help2: "Informe os preços de mercado atuais. Isso permitirá que a calculadora encontre a opção mais barata (comprar vs. fabricar).",
    import_title: "Importar valores da base de dados NEW WORLD MARKET PRICES",
    import_button: "Importar",
    import_warning: "Não confie 100% nos valores, é apenas uma estimativa e os valores podem variar.",
    last_update: "Última atualização da base:",
    confirm_title: "Confirmar Importação",
    confirm_desc: "Isso buscará os preços mais recentes e irá sobrescrever quaisquer valores que você digitou manually. Deseja continuar?",
    cancel: "Cancelar",
    confirm: "Confirmar",
    server_label: "Selecione o Servidor"
  } : {
    back: "Back",
    next: "Next Step",
    price: "Price",
    help1: "This step is optional but recommended.",
    help2: "Enter the current market prices. This will allow the calculator to find the cheapest option (buy vs. craft).",
    import_title: "Import values from NEW WORLD MARKET PRICES database",
    import_button: "Import",
    import_warning: "Do not rely 100% on these values; they are estimates and prices may vary.",
    last_update: "Last database update:",
    confirm_title: "Confirm Import",
    confirm_desc: "This will fetch the latest prices and overwrite any values you have entered manually. Do you want to continue?",
    cancel: "Cancel",
    confirm: "Confirm",
    server_label: "Select Server"
  };

  // Pega o nome da Matriz selecionada (para o título)
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

      <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          {t.import_title}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Autocomplete
            value={selectedServer}
            onChange={(_event: React.SyntheticEvent, newValue: string | null) => {
              setSelectedServer(newValue);
            }}
            options={serverList.filter(s => s !== "Legacy Servers")} 
            getOptionDisabled={(option) => option === "Legacy Servers"}
            id="server-select-autocomplete"
            size="small"
            disabled={isLoading}
            sx={{ minWidth: 200, flexGrow: 1 }}
            renderInput={(params) => <TextField {...params} label={t.server_label} />}
          />
          
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="contained"
              onClick={handleOpenDialog}
              disabled={isLoading || !selectedServer} 
              sx={{ minWidth: 120 }}
            >
              {t.import_button}
            </Button>
            {isLoading && (
              <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
            )}
          </Box>
        </Box>
        
        <Box sx={{ mt: 1.5 }}>
          {currentApiTimestamp && (
            <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
              {t.last_update} {currentApiTimestamp}
            </Typography>
          )}
          <Typography variant="caption" display="block" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            {t.import_warning}
          </Typography>
          {fetchError && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              {fetchError}
            </Alert>
          )}
        </Box>
      </Paper>

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

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{t.confirm_title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t.confirm_desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t.cancel}</Button>
          <Button onClick={handleConfirmImport} variant="contained" autoFocus>
            {t.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Step2InputPrices;