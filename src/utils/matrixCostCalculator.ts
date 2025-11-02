// src/utils/matrixCostCalculator.ts
import { type Recipe } from '../types/craftingTypes';
// Importa os dados diretamente do arquivo de dados da matriz
import { recipeMap, priceableItems } from '../data/matrixData'; 

interface CostResult {
  cost: number;
  // 'buy' = Comprar pronto é mais barato
  // 'craft' = Fabricar é mais barato
  // 'free' = Item não precificável (Azoth, Orbe)
  // 'unavailable' = Não tem preço e não tem receita
  method: 'buy' | 'craft' | 'free' | 'unavailable';
}

export interface CostOption {
  name: string;
  cost: number;
  recipe: Recipe | null;
  totalCost: number; 
  itemName: string;
}

export interface AnalysisResult {
  bestOption: CostOption;
  allOptions: CostOption[];
}

// Criamos um Set para buscas rápidas
const priceableItemSet = new Set(priceableItems.map(item => item.item));

// --- FUNÇÃO RECURSIVA (INTERNA) ---
function findDependencies(
  itemName: string,
  dependencySet: Set<string>
): void {
  if (dependencySet.has(itemName)) {
    return;
  }
  
  dependencySet.add(itemName);

  const recipes = recipeMap.get(itemName);
  
  if (!recipes) {
    return;
  }

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredientes) {
      findDependencies(ingredient.item, dependencySet);
    }
  }
}

/**
 * --- CORREÇÃO AQUI ---
 * Adicionamos a palavra-chave 'export'
 */
export function getDependencyTree(targetItemName: string): Set<string> {
  const dependencySet = new Set<string>();
  findDependencies(targetItemName, dependencySet);
  return dependencySet;
}
// --- FIM DA CORREÇÃO ---


/**
 * Calcula o custo de fabricação de UM item, de forma recursiva.
 */
export function getCraftCost(
  itemName: string,
  prices: Map<string, number>
): CostResult {
  const recipes = recipeMap.get(itemName);
  
  const isPriceable = priceableItemSet.has(itemName);
  const marketPrice = prices.get(itemName) || Infinity;

  // 1. O item tem receita? (Ex: "Matriz de Armas")
  if (recipes && recipes.length > 0) {
    let minCraftCost = Infinity;

    // Itera sobre todas as receitas possíveis
    for (const recipe of recipes) {
      let currentRecipeCost = 0;
      for (const ingredient of recipe.ingredientes) {
        
        // --- ATUALIZADO: 'getCraftCost' agora retorna um objeto ---
        const ingredientCostResult = getCraftCost(ingredient.item, prices);
        
        if (ingredientCostResult.cost === Infinity) {
          currentRecipeCost = Infinity;
          break;
        }
        // Usamos '.cost' e '.quantidade'
        currentRecipeCost += ingredientCostResult.cost * ingredient.quantidade;
      }
      minCraftCost = Math.min(minCraftCost, currentRecipeCost);
    }
    
    // Se é precificável (Ex: "Rebites Abençoados"),
    // o custo é o MÍNIMO entre fabricar e comprar.
    if (isPriceable) {
      // --- ATUALIZADO: Compara custos e retorna o objeto completo ---
      if (marketPrice < minCraftCost) {
        return { cost: marketPrice, method: 'buy' };
      }
    }
    
    // Se o craft for a melhor opção (ou a única)
    if (minCraftCost !== Infinity) {
      return { cost: minCraftCost, method: 'craft' };
    }
    
    // Se tudo falhou
    return { cost: Infinity, method: 'unavailable' };

  } else {
    // 2. Se NÃO tem receita (Ex: "Azoth" ou "Lingote Prismático")
    
    if (isPriceable) {
      // Se é precificável (Ex: "Lingote Prismático")
      if (marketPrice !== Infinity) {
        return { cost: marketPrice, method: 'buy' }; // Única opção é comprar
      }
      return { cost: Infinity, method: 'unavailable' };
    }
    
    // Se NÃO é precificável (Ex: "Azoth", "Orbe de Gipsita"),
    // seu custo é 0.
    return { cost: 0, method: 'free' };
  }
}

/**
 * Analisa as melhores opções para a matriz selecionada.
 */
export function analyzeMatrix(
  selectedMatrix: string,
  prices: Map<string, number>,
  language: 'pt' | 'en'
): AnalysisResult {
  
  const allOptions: CostOption[] = [];
  const recipes = recipeMap.get(selectedMatrix) || [];

  // 1. Calcular o custo de cada receita de fabricação
  for (const recipe of recipes) {
    let craftCost = 0;
    for (const ingredient of recipe.ingredientes) {
      const ingredientCostResult = getCraftCost(ingredient.item, prices);
      
      if (ingredientCostResult.cost === Infinity) {
        craftCost = Infinity; 
        break; 
      }
      craftCost += ingredientCostResult.cost * ingredient.quantidade;
    }
    
    const skillName = language === 'pt' ? recipe.pt_trade_skill : recipe.en_trade_skill;
    
    allOptions.push({
      name: `Craft (${skillName})`,
      cost: craftCost,
      recipe: recipe,
      totalCost: craftCost,
      itemName: selectedMatrix,
    });
  }

  // 2. Adicionar "Comprar Pronto"
  const marketPrice = prices.get(selectedMatrix);
  if (marketPrice !== undefined && marketPrice > 0) {
    allOptions.push({
      name: language === 'pt' ? 'Comprar Pronto' : 'Buy Directly',
      cost: marketPrice,
      recipe: null,
      totalCost: marketPrice,
      itemName: selectedMatrix,
    });
  }

  // 3. Encontrar a melhor opção
  const validOptions = allOptions.filter(opt => opt.totalCost !== Infinity);
  
  if (validOptions.length === 0) {
    const fallbackName = language === 'pt' ? 'Preços Insuficientes' : 'Insufficient Prices';
    return {
      bestOption: { name: fallbackName, cost: 0, recipe: null, totalCost: 0, itemName: selectedMatrix },
      allOptions: allOptions, 
    };
  }

  validOptions.sort((a, b) => a.totalCost - b.totalCost);

  return {
    bestOption: validOptions[0],
    allOptions: allOptions,
  };
}