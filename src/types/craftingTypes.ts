export interface ItemInfo {
  item: string;
  en_name: string;
  imagem: string;
  backgroundColor: string;
  price?: number;
}
export interface Ingredient {
  item: string;
  quantidade: number;
}
export interface Recipe {
  item: string;
  chance_adicional: number;
  ingredientes: Ingredient[];
  pt_trade_skill?: string;
  en_trade_skill?: string;
  trade_skill_level?: number;
  trade_skill_icon?: string;
}
export interface CraftingData {
  name: {pt_name: string; en_name: string; imagem?: string};
  material_base: ItemInfo[];
  refinamentos: ItemInfo[];
  receitas: Recipe[];
}
export interface CraftingModule {
  id: string;
  title: string;
  data: CraftingData;
  recipeMap: Map<string, Recipe[]>;
  itemInfoMap: Map<string, ItemInfo>;
}