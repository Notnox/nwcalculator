// src/utils/craftCalculator.ts
import { recipeMap, type Recipe, type Ingredient } from '../data/cantariaData';

// Interface para descrever o objeto de 'requirements'
export interface Requirements {
  refined: Map<string, number>;
  base: Map<string, number>;
}

/**
 * Função recursiva para processar os requisitos de um item.
 */
function processItem(
  itemName: string,
  neededQty: number,
  requirements: Requirements,
  bonusChance: number 
): void {
  const recipe: Recipe | undefined = recipeMap.get(itemName);

  if (recipe) {
    // --- É UM ITEM REFINADO ---
    const currentQty: number = requirements.refined.get(itemName) || 0;
    requirements.refined.set(itemName, currentQty + neededQty);

    const totalChance: number = recipe.chance_adicional + bonusChance;
    const avgYield: number = 1 + (totalChance / 100);
    
    // --- ALTERADO ---
    // Arredondamos para CIMA o número de criações necessárias.
    // Se a média diz 7.69, forçamos a 8.
    // Isso cria a margem de erro que você pediu.
    const craftsNeeded: number = Math.ceil(neededQty / avgYield);
    
    for (const ingredient of recipe.ingredientes) {
      const ingredientQtyNeeded: number = craftsNeeded * ingredient.quantidade;
      processItem(ingredient.item, ingredientQtyNeeded, requirements, bonusChance);
    }
  } else {
    // --- É UM MATERIAL BASE ---
    const currentQty: number = requirements.base.get(itemName) || 0;
    requirements.base.set(itemName, currentQty + neededQty);
  }
}

/**
 * Calcula todos os materiais base e refinados necessários para criar um item final.
 */
export function calculateRequirements(
  targetItemName: string,
  targetQuantity: number,
  bonusChance: number 
): Requirements {
  
  const requirements: Requirements = {
    refined: new Map<string, number>(),
    base: new Map<string, number>(),
  };

  const targetRecipe: Recipe | undefined = recipeMap.get(targetItemName);
  if (!targetRecipe) {
    console.error(`Receita para ${targetItemName} não encontrada!`);
    return requirements;
  }

  const totalChance: number = targetRecipe.chance_adicional + bonusChance;
  const avgYield: number = 1 + (totalChance / 100);

  // --- ALTERADO ---
  // Aplicamos o mesmo arredondamento para o item final.
  const craftsNeeded: number = Math.ceil(targetQuantity / avgYield);

  for (const ingredient of targetRecipe.ingredientes) {
    const ingredientQtyNeeded: number = craftsNeeded * ingredient.quantidade;
    processItem(ingredient.item, ingredientQtyNeeded, requirements, bonusChance);
  }

  return requirements;
}