// src/contexts/PriceContext.tsx
import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
// --- MUDANÇA: Importa o mapa de tradução ---
import { enToPtItemMap, defaultPrices } from '../data/matrixData';
// O priceItemSet (em inglês) ainda é necessário para filtrar a API
import { priceItemSet } from '../data/priceData';

// --- Tipos ---

interface ApiListing {
  timestamp: string;
  item_name: string; // <-- Chave em INGLÊS da API
  price: number;
}
type FetchTimestamps = Record<string, string>;
interface PriceContextType {
  prices: Map<string, number>; // <-- Agora usará chaves em PORTUGUÊS
  apiTimestamp: string | null;
  isLoading: boolean;
  error: string | null;
  updatePrices: (serverName: string) => Promise<void>;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

const PRICE_STORAGE_KEY = 'nw_matrix_prices';
const API_TIMESTAMP_KEY = 'nw_api_timestamp';
const FETCH_THROTTLE_KEY = 'nw_fetch_timestamps';

// --- Funções Helper (sem alteração) ---
function formatApiTimestamp(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString('pt-BR', { /* ... (opções) ... */ });
  } catch (e) { return "Data indisponível"; }
}
function isFetchThrottled(serverName: string): boolean {
  const storedTimestamps = localStorage.getItem(FETCH_THROTTLE_KEY);
  if (!storedTimestamps) return false;
  const timestamps: FetchTimestamps = JSON.parse(storedTimestamps);
  const lastFetchISO = timestamps[serverName.toLowerCase()];
  if (!lastFetchISO) return false;
  const lastFetchTime = new Date(lastFetchISO).getTime();
  const now = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  return (now - lastFetchTime) < oneDay;
}
function saveFetchTimestamp(serverName: string) {
  const storedTimestamps = localStorage.getItem(FETCH_THROTTLE_KEY);
  const timestamps: FetchTimestamps = storedTimestamps ? JSON.parse(storedTimestamps) : {};
  timestamps[serverName.toLowerCase()] = new Date().toISOString();
  localStorage.setItem(FETCH_THROTTLE_KEY, JSON.stringify(timestamps));
}

// --- O Provedor (Provider) ---
export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<Map<string, number>>(() => {
    const storedPrices = localStorage.getItem(PRICE_STORAGE_KEY);
    const initialPrices = storedPrices ? new Map(Object.entries(JSON.parse(storedPrices))) : new Map();
    
    defaultPrices.forEach((price, item) => {
      if (!initialPrices.has(item)) {
        initialPrices.set(item, price);
      }
    });
    return initialPrices;
  });
  
  const [apiTimestamp, setApiTimestamp] = useState<string | null>(() => {
    return localStorage.getItem(API_TIMESTAMP_KEY) || null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // A função principal de atualização
  const updatePrices = useCallback(async (serverName: string) => {
    const serverId = serverName.toLowerCase();
    setError(null); 

    // 1. Verifica o Throttle de 24h
    if (isFetchThrottled(serverId)) {
      const storedPrices = localStorage.getItem(PRICE_STORAGE_KEY);
      const storedTimestamp = localStorage.getItem(API_TIMESTAMP_KEY);
      
      const newPrices = storedPrices ? new Map(Object.entries(JSON.parse(storedPrices))) : new Map();
      
      defaultPrices.forEach((price, item) => {
        if (!newPrices.has(item)) {
          newPrices.set(item, price);
        }
      });
      
      if (storedPrices) { setPrices(newPrices); }
      if (storedTimestamp) { setApiTimestamp(storedTimestamp); }
      return; 
    }

    // 2. Se NÃO estiver "throttled", faz o fetch
    setIsLoading(true);

    try {
      const response = await fetch(`https://nwmpdata.gaming.tools/auctions2/${serverId}.json`);
      if (!response.ok) throw new Error(`Servidor não encontrado (Erro: ${response.status})`);
      const data: ApiListing[] = await response.json();
      if (!data || data.length === 0) throw new Error("API não retornou dados.");

      // 3. Processa e Filtra os dados
      
      // --- CORREÇÃO DA LÓGICA DE CHAVE ---
      const minPrices = new Map<string, number>(defaultPrices);
      
      for (const listing of data) {
        if (priceItemSet.has(listing.item_name)) {
          const ptKey = enToPtItemMap.get(listing.item_name); 
          
          if (ptKey) {
            const price = listing.price / 100;
            const currentMin = minPrices.get(ptKey) || Infinity;

            if (price < currentMin) {
              minPrices.set(ptKey, price); // <-- Sobrescreve o default (ex: 0) com o preço da API
            }
          }
        }
      }
      // --- FIM DA CORREÇÃO ---

      // 4. Formata o Timestamp da API
      const newApiTimestamp = formatApiTimestamp(data[0].timestamp);
      
      // 5. Salva tudo no Estado e no LocalStorage
      setPrices(minPrices); // <-- 'minPrices' agora tem chaves PT
      setApiTimestamp(newApiTimestamp);
      
      // Salva no storage com chaves PT
      localStorage.setItem(PRICE_STORAGE_KEY, JSON.stringify(Object.fromEntries(minPrices)));
      localStorage.setItem(API_TIMESTAMP_KEY, newApiTimestamp);
      saveFetchTimestamp(serverId); 

    } catch (e: any) {
      console.error(e);
      setError(e.message || "Falha ao buscar preços.");
    } finally {
      setIsLoading(false);
    }
  }, []); // useCallback

  const value = {
    prices,
    apiTimestamp,
    isLoading,
    error,
    updatePrices,
  };

  return (
    <PriceContext.Provider value={value}>
      {children}
    </PriceContext.Provider>
  );
};

// --- O Hook de Consumo ---
export const usePrices = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error('usePrices deve ser usado dentro de um PriceProvider');
  }
  return context;
};