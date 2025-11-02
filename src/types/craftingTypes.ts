// src/types/craftingTypes.ts

// Movido de cantariaData.ts
export interface ItemInfo {
  item: string;
  en_name: string;
  imagem: string;
  backgroundColor: string;
  price?: number;
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
  pt_trade_skill?: string;
  en_trade_skill?: string;
  trade_skill_level?: number;
  trade_skill_icon?: string;
}

// A estrutura de dados de uma profissão
export interface CraftingData {
  name: {pt_name: string; en_name: string; imagem?: string};
  material_base: ItemInfo[];
  refinamentos: ItemInfo[];
  receitas: Recipe[];
}

// Este é o nosso "Módulo" completo!
export interface CraftingModule {
  id: string; // ex: "cantaria"
  title: string; // ex: "Cantaria"
  data: CraftingData;
  recipeMap: Map<string, Recipe[]>;
  itemInfoMap: Map<string, ItemInfo>;
}