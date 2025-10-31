// src/utils/craftCalculator.ts
import { recipeMap, type Recipe } from '../data/cantariaData';

// --- NOVO: Interface para uma Etapa de Craft ---
export interface CraftingStep {
  itemName: string;      // O que estamos criando (ex: "Bloco de Pedra")
  craftsNeeded: number;  // O "Total de refino" (ex: 10)
  ingredients: { item: string, quantity: number }[]; // Materiais para ESTA etapa
}

// Interface de Requisitos atualizada
export interface Requirements {
  refined: Map<string, number>; // Lista de compras (agregada)
  base: Map<string, number>;    // Lista de compras (agregada)
  steps: CraftingStep[];      // A nova lista de "Modo de Preparo"
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
    
    // Calcula o "Total de refino" (craftsNeeded)
    const totalChance: number = recipe.chance_adicional + bonusChance;
    const avgYield: number = 1 + (totalChance / 100);
    const craftsNeeded: number = Math.ceil(neededQty / avgYield);

    // Adiciona na lista de compras "Itens Refinados" (a antiga)
    const currentQty: number = requirements.refined.get(itemName) || 0;
    requirements.refined.set(itemName, currentQty + neededQty);
    
    // Lista para os ingredientes *desta* etapa
    const stepIngredients: { item: string, quantity: number }[] = [];

    for (const ingredient of recipe.ingredientes) {
      const ingredientQtyNeeded: number = craftsNeeded * ingredient.quantidade;
      
      // Adiciona na lista de ingredientes da etapa
      stepIngredients.push({ 
        item: ingredient.item, 
        quantity: ingredientQtyNeeded 
      });
      
      // Chamada recursiva para os sub-itens
      processItem(ingredient.item, ingredientQtyNeeded, requirements, bonusChance);
    }
    
    // --- NOVO: Adiciona a etapa de craft na lista ---
    // Usamos .push() para garantir a ordem (T1 -> T2 -> T3)
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
  bonusChance: number 
): Requirements {
  
  // Inicializa o objeto de requisitos com o novo array 'steps'
  const requirements: Requirements = {
    refined: new Map<string, number>(),
    base: new Map<string, number>(),
    steps: [], // <-- NOVO
  };

  const targetRecipe: Recipe | undefined = recipeMap.get(targetItemName);
  if (!targetRecipe) {
    console.error(`Receita para ${targetItemName} não encontrada!`);
    return requirements;
  }

  // --- LÓGICA DO ITEM FINAL ---
  // Calcula o "Total de refino" para o item final (ex: Bloco Prismático)
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
    
    processItem(ingredient.item, ingredientQtyNeeded, requirements, bonusChance);
  }

  // --- NOVO: Adiciona a etapa final (ex: Etapa 5: Bloco Prismático) ---
  requirements.steps.push({
    itemName: targetItemName,
    craftsNeeded: targetCraftsNeeded,
    ingredients: targetIngredients,
  });

  return requirements;
}