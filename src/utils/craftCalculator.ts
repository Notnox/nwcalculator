// src/utils/craftCalculator.ts
import { type Recipe } from '../types/craftingTypes';

// (As interfaces CraftingStep e Requirements não mudam)
export interface CraftingStep {
  itemName: string;
  craftsNeeded: number;
  ingredients: { item: string, quantity: number }[];
}

export interface Requirements {
  refined: Map<string, number>;
  base: Map<string, number>;
  steps: CraftingStep[];
}

// --- FUNÇÃO ANTIGA (REMOVIDA) ---
// function getDynamicSafetyFactor(totalChance: number): number { ... }

// --- NOVA FUNÇÃO DE CÁLCULO DE CHANCE ---
/**
 * Aplica uma lógica pessimista à chance de bônus.
 * Para itens com chance base <= 10%, ignoramos bônus externos (muito volátil).
 * Para outros, aplicamos um fator de segurança (ex: 90% de confiança).
 */
function getSafeChance(baseChance: number, bonusChance: number): number {
  
  // Limite de segurança: se a chance base é 10% ou menos
  const LOW_CHANCE_THRESHOLD = 10;
  
  // Fator de segurança para chances "normais"
  const STANDARD_SAFETY_FACTOR = 0.9; // 90% de confiança

  let safeChance = 0;

  if (baseChance <= LOW_CHANCE_THRESHOLD) {
    // LÓGICA PESSIMISTA: Ignora o bônus de roupa/forte
    // Usa apenas a chance base.
    safeChance = baseChance;
  } else {
    // LÓGICA PADRÃO: Confia em 90% da chance total
    const totalChance = baseChance + bonusChance;
    safeChance = totalChance * STANDARD_SAFETY_FACTOR;
  }
  
  return Math.max(0, safeChance); // Garante que nunca seja negativo
}
// --- FIM DA NOVA FUNÇÃO ---


/**
 * Função recursiva para processar os requisitos de um item.
 */
function processItem(
  itemName: string,
  neededQty: number,
  requirements: Requirements,
  bonusChance: number,
  recipeMap: Map<string, Recipe[]>
): void {
  
  const recipes = recipeMap.get(itemName);
  const recipe: Recipe | undefined = recipes ? recipes[0] : undefined; 

  if (recipe) {
    // --- É UM ITEM REFINADO ---
    
    // --- LÓGICA DE CÁLCULO ATUALIZADA ---
    
    // 1. Calcula a chance "segura"
    const safeChance: number = getSafeChance(recipe.chance_adicional, bonusChance); 
    
    // 2. Calcula o rendimento pessimista
    const safeAvgYield: number = 1 + (safeChance / 100);
    const craftsNeeded: number = Math.ceil(neededQty / safeAvgYield);
    // --- FIM DA ATUALIZAÇÃO ---

    const currentQty: number = requirements.refined.get(itemName) || 0;
    requirements.refined.set(itemName, currentQty + neededQty);
    
    const stepIngredients: { item: string, quantity: number }[] = [];

    for (const ingredient of recipe.ingredientes) {
      const ingredientQtyNeeded: number = craftsNeeded * ingredient.quantidade;
      stepIngredients.push({ item: ingredient.item, quantity: ingredientQtyNeeded });
      processItem(ingredient.item, ingredientQtyNeeded, requirements, bonusChance, recipeMap);
    }
    
    requirements.steps.push({
      itemName: itemName,
      craftsNeeded: craftsNeeded,
      ingredients: stepIngredients,
    });

  } else {
    // --- É UM MATERIAL BASE ---
    const currentQty: number = requirements.base.get(itemName) || 0;
    requirements.base.set(itemName, currentQty + neededQty);
  }
}

/**
 * Calcula todos os materiais base e refinados necessários.
 */
export function calculateRequirements(
  targetItemName: string,
  targetQuantity: number,
  bonusChance: number,
  recipeMap: Map<string, Recipe[]>
): Requirements {
  
  const requirements: Requirements = {
    refined: new Map<string, number>(),
    base: new Map<string, number>(),
    steps: [],
  };
  
  const targetRecipes = recipeMap.get(targetItemName);
  const targetRecipe: Recipe | undefined = targetRecipes ? targetRecipes[0] : undefined;

  if (!targetRecipe) {
    console.error(`Receita para ${targetItemName} não encontrada!`);
    return requirements;
  }

  // --- LÓGICA DO ITEM FINAL (ATUALIZADA) ---
  
  // 1. Calcula a chance "segura"
  const safeChance: number = getSafeChance(targetRecipe.chance_adicional, bonusChance);

  // 2. Aplica
  const safeAvgYield: number = 1 + (safeChance / 100);
  const targetCraftsNeeded: number = Math.ceil(targetQuantity / safeAvgYield);
  // --- FIM DA ATUALIZAÇÃO ---
  
  const targetIngredients: { item: string, quantity: number }[] = [];

  for (const ingredient of targetRecipe.ingredientes) {
    const ingredientQtyNeeded: number = targetCraftsNeeded * ingredient.quantidade;
    targetIngredients.push({ item: ingredient.item, quantity: ingredientQtyNeeded });
    processItem(ingredient.item, ingredientQtyNeeded, requirements, bonusChance, recipeMap);
  }

  requirements.steps.push({
    itemName: targetItemName,
    craftsNeeded: targetCraftsNeeded,
    ingredients: targetIngredients,
  });

  return requirements;
}