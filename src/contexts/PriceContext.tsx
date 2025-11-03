import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { enToPtItemMap, defaultPrices } from '../data/matrixData';
import { priceItemSet } from '../data/priceData';

interface ApiListing {
  timestamp: string;
  item_name: string;
  price: number;
}
type FetchTimestamps = Record<string, string>;

type PriceMap = Map<string, number>;
type ServerPriceData = {
  prices: Record<string, number>; 
  timestamp: string; 
};
type PriceStorage = Record<string, ServerPriceData>; 

interface PriceContextType {
  isLoading: boolean;
  error: string | null;
  updatePrices: (serverName: string) => Promise<PriceMap | null>;
  loadPricesFromServer: (serverName: string) => PriceMap;
  getApiTimestamp: (serverName: string) => string | null;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);
const PRICE_STORAGE_KEY = 'nw_matrix_prices_v2'; 
const FETCH_THROTTLE_KEY = 'nw_fetch_timestamps';

function formatApiTimestamp(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
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

export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFullPriceStorage = (): PriceStorage => {
    const stored = localStorage.getItem(PRICE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  };

  /**
   * CARREGA os preços de um servidor específico do storage
   */
  const loadPricesFromServer = useCallback((serverName: string): PriceMap => {
    const serverId = serverName.toLowerCase();
    const storage = getFullPriceStorage();
    
    // Pega os dados do servidor (ex: storage.devaloka)
    const serverData = storage[serverId];
    const pricesMap = new Map<string, number>(defaultPrices); // Começa com os defaults

    if (serverData) {
      // Mescla os preços salvos com os defaults
      const savedPrices = new Map(Object.entries(serverData.prices));
      savedPrices.forEach((price, item) => {
        pricesMap.set(item, price);
      });
    }
    
    return pricesMap;
  }, []);

  /**
   * PEGA o timestamp de um servidor específico do storage
   */
  const getApiTimestamp = useCallback((serverName: string): string | null => {
    const serverId = serverName.toLowerCase();
    const storage = getFullPriceStorage();
    return storage[serverId]?.timestamp || null;
  }, []);


  /**
   * ATUALIZA (Fetch ou Load) os preços de um servidor
   */
  const updatePrices = useCallback(async (serverName: string): Promise<PriceMap | null> => {
    const serverId = serverName.toLowerCase();
    setError(null); 

    // 1. Verifica o Throttle de 24h
    if (isFetchThrottled(serverId)) {
      console.log(`[PriceContext] Throttle ativo para ${serverId}. Carregando do storage.`);
      // Carrega silenciosamente do storage (agora da chave correta)
      return loadPricesFromServer(serverId);
    }

    // 2. Se NÃO estiver "throttled", faz o fetch
    setIsLoading(true);

    try {
      const response = await fetch(`https://nwmpdata.gaming.tools/auctions2/${serverId}.json`);
      if (!response.ok) throw new Error(`Servidor não encontrado (Erro: ${response.status})`);
      const data: ApiListing[] = await response.json();
      if (!data || data.length === 0) throw new Error("API não retornou dados.");

      // 3. Processa e Filtra os dados
      const minPrices = new Map<string, number>(defaultPrices);
      for (const listing of data) {
        if (priceItemSet.has(listing.item_name)) {
          const ptKey = enToPtItemMap.get(listing.item_name); 
          if (ptKey) {
            const price = listing.price / 100;
            const currentMin = minPrices.get(ptKey) || Infinity;
            if (price < currentMin) {
              minPrices.set(ptKey, price);
            }
          }
        }
      }

      // 4. Formata o Timestamp da API
      const newApiTimestamp = formatApiTimestamp(data[0].timestamp);
      
      // 5. Salva no LocalStorage ANINHADO
      const storage = getFullPriceStorage();
      storage[serverId] = {
        prices: Object.fromEntries(minPrices),
        timestamp: newApiTimestamp,
      };
      localStorage.setItem(PRICE_STORAGE_KEY, JSON.stringify(storage));
      
      saveFetchTimestamp(serverId); // Salva o novo timestamp do throttle
      
      return minPrices; // Retorna o novo Map de preços

    } catch (e: any) {
      console.error(e);
      setError(e.message || "Falha ao buscar preços.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [loadPricesFromServer]); // useCallback

  const value = {
    isLoading,
    error,
    updatePrices,
    loadPricesFromServer,
    getApiTimestamp,
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