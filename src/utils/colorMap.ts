// src/utils/colorMap.ts

/**
 * Mapeamento centralizado de 'backgroundColor' para cores hexadecimais.
 * Usado por todos os componentes que exibem avatares de itens.
 */
export const colorMap: Record<string, string> = {
  // Cores originais
  cinza: '#9e9e9e',   // Padrão para T2-T4
  verde: '#4caf50',   // Refinamentos T5 (Lixa, Solvente, Fundente)
  laranja: '#ff9800', // Itens T5 Lendários (Rúnica, Asmódeo)
  
  // --- NOVO ---
  // Roxo para itens Épicos T5 (Cinábrio), 
  // baseado na cor de fundo do item "Epic"
  roxo: '#512888',  
  
  // Fallback
  default: '#000',
};