// src/types/craftingTypes.ts

// Movido de cantariaData.ts
export interface ItemInfo {
  item: string;
  imagem: string;
  backgroundColor: string;
}

// Movido de cantariaData.ts
export interface Ingredient {
  item: string;
  quantidade: number;
}

// Movido de cantariaData.ts
export interface Recipe {
  item: string;
  chance_adicional: number;
  ingredientes: Ingredient[];
}

// A estrutura de dados de uma profissão
export interface CraftingData {
  material_base: ItemInfo[];
  refinamentos: ItemInfo[];
  receitas: Recipe[];
}

// Este é o nosso "Módulo" completo!
export interface CraftingModule {
  id: string; // ex: "cantaria"
  title: string; // ex: "Cantaria"
  data: CraftingData;
  recipeMap: Map<string, Recipe>;
  itemInfoMap: Map<string, ItemInfo>;
}