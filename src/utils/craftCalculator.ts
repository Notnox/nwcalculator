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

/**
 * Função recursiva para processar os requisitos de um item.
 */
function processItem(
  itemName: string,
  neededQty: number,
  requirements: Requirements,
  bonusChance: number,
  recipeMap: Map<string, Recipe[]> // <-- TIPO ATUALIZADO
): void {
  
  // --- CORREÇÃO AQUI ---
  // Pega o array de receitas
  const recipes = recipeMap.get(itemName);
  // Pega a primeira (e única) receita de refino
  const recipe: Recipe | undefined = recipes ? recipes[0] : undefined; 
  // --- FIM DA CORREÇÃO ---

  if (recipe) {
    // --- É UM ITEM REFINADO ---
    const totalChance: number = recipe.chance_adicional + bonusChance;
    const avgYield: number = 1 + (totalChance / 100);
    const craftsNeeded: number = Math.ceil(neededQty / avgYield);

    const currentQty: number = requirements.refined.get(itemName) || 0;
    requirements.refined.set(itemName, currentQty + neededQty);
    
    const stepIngredients: { item: string, quantity: number }[] = [];

    for (const ingredient of recipe.ingredientes) {
      // (O nome da prop 'quantidade' já estava correto aqui)
      const ingredientQtyNeeded: number = craftsNeeded * ingredient.quantidade;
      
      stepIngredients.push({ 
        item: ingredient.item, 
        quantity: ingredientQtyNeeded 
      });
      
      // Passa o recipeMap (o Map<string, Recipe[]>) para a recursão
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
  recipeMap: Map<string, Recipe[]> // <-- TIPO ATUALIZADO
): Requirements {
  
  const requirements: Requirements = {
    refined: new Map<string, number>(),
    base: new Map<string, number>(),
    steps: [],
  };
  
  // --- CORREÇÃO AQUI ---
  // Pega o array de receitas
  const targetRecipes = recipeMap.get(targetItemName);
  // Pega a primeira (e única) receita de refino
  const targetRecipe: Recipe | undefined = targetRecipes ? targetRecipes[0] : undefined;
  // --- FIM DA CORREÇÃO ---

  if (!targetRecipe) {
    console.error(`Receita para ${targetItemName} não encontrada!`);
    return requirements;
  }

  // --- LÓGICA DO ITEM FINAL ---
  const totalChance: number = targetRecipe.chance_adicional + bonusChance;
  const avgYield: number = 1 + (totalChance / 100);
  const targetCraftsNeeded: number = Math.ceil(targetQuantity / avgYield);
  
  const targetIngredients: { item: string, quantity: number }[] = [];

  // Chama a recursão para os ingredientes do item final
  for (const ingredient of targetRecipe.ingredientes) {
    const ingredientQtyNeeded: number = targetCraftsNeeded * ingredient.quantidade;
    
    targetIngredients.push({
      item: ingredient.item,
      quantity: ingredientQtyNeeded
    });
    
    processItem(ingredient.item, ingredientQtyNeeded, requirements, bonusChance, recipeMap);
  }

  // Adiciona a etapa final
  requirements.steps.push({
    itemName: targetItemName,
    craftsNeeded: targetCraftsNeeded,
    ingredients: targetIngredients, // Usa os ingredientes já calculados
  });

  return requirements;
}