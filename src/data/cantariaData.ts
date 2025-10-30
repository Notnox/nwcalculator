// src/data/cantariaData.ts

// --- Definições de Tipo ---
// Descreve um item em 'material_base' ou 'refinamentos'
export interface ItemInfo {
  item: string;
  imagem: string;
  backgroundColor: string; // Pode ser 'cinza', 'verde', 'laranja', etc.
}

// Descreve um ingrediente dentro de uma receita
export interface Ingredient {
  item: string;
  quantidade: number;
}

// Descreve um item em 'receitas'
export interface Recipe {
  item: string;
  chance_adicional: number;
  ingredientes: Ingredient[];
}

// Descreve a estrutura completa do nosso objeto principal
export interface CantariaData {
  material_base: ItemInfo[];
  refinamentos: ItemInfo[];
  receitas: Recipe[];
}

// --- Dados ---
// Agora, garantimos que 'cantariaData' SEGUE a estrutura que definimos
export const cantariaData: CantariaData = {
  material_base: [
    {item: "Pedra", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/stonet1.png", backgroundColor: "cinza"},
    {item: "Magnetita", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/stonet4.png", backgroundColor: "cinza"},
    {item: "Pó de Gema Poderoso", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/consumable/gemstonedustt5.png", backgroundColor: "cinza"},
    {item: "Lixa de Obsidiana", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/sandpapert5.png", backgroundColor: "verde"},
    {item: "Solvente Puro", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/solventt5.png", backgroundColor: "verde"},
    {item: "Magnetita Derretida", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonefiret1.png", backgroundColor: "verde"},
    {item: "Magnetita Congelante", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonewatert1.png", backgroundColor: "verde"},
    {item: "Magnetita Pútrida", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonedeatht1.png", backgroundColor: "verde"},
    {item: "Magnetita Cristalina", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonesoult1.png", backgroundColor: "verde"},
    {item: "Magnetita Argilosa", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestoneeartht1.png", backgroundColor: "verde"},
    {item: "Magnetita Chocante", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestoneairt1.png", backgroundColor: "verde"},
    {item: "Magnetita Reluzente", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonelifet1.png", backgroundColor: "verde"}
  ],
  refinamentos: [
    {item: "Bloco de Pedra", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt2.png", backgroundColor: "cinza"},
    {item: "Tijolo de Pedra", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt3.png", backgroundColor: "cinza"},
    {item: "Tijolo de Magnetita", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt4.png", backgroundColor: "cinza"},
    {item: "Pedra Imaterial Obsidiana", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt2.png", backgroundColor: "cinza"},
    {item: "Pedra Imaterial Rúnica", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt52.png", backgroundColor: "cinza"},
    {item: "Pedra Rúnica", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt51.png", backgroundColor: "laranja"},
    {item: "Bloco Prismático", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt53.png", backgroundColor: "cinza"},
  ],
  receitas:[
    {item: "Bloco de Pedra", chance_adicional: 30, ingredientes:[{item: "Pedra", quantidade: 4}]},
    {item: "Tijolo de Pedra", chance_adicional: 28, ingredientes:[{item: "Bloco de Pedra", quantidade: 4}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Tijolo de Magnetita", chance_adicional: 25, ingredientes:[{item: "Tijolo de Pedra", quantidade: 2}, {item: "Magnetita", quantidade: 6}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Pedra Imaterial Obsidiana", chance_adicional: 18, ingredientes:[{item: "Tijolo de Magnetita", quantidade: 8}, {item: "Magnetita", quantidade: 2}, {item: "Magnetita Derretida ou Magnetita Congelante ou Magnetita Pútrida ou Magnetita Cristalina ou Magnetita Argilosa ou Magnetita Chocante ou Magnetita Reluzente", quantidade: 1}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Pedra Imaterial Rúnica", chance_adicional: 10, ingredientes:[{item: "Pedra Imaterial Obsidiana", quantidade: 1}, {item: "Pó de Gema Poderoso", quantidade: 1}, {item: "Solvente Puro", quantidade: 4}]},
    {item: "Pedra Rúnica", chance_adicional: 5, ingredientes:[{item: "Pedra Imaterial Obsidiana", quantidade: 5}, {item: "Pó de Gema Poderoso", quantidade: 1}, {item: "Magnetita Derretida ou Magnetita Congelante ou Magnetita Pútrida ou Magnetita Cristalina ou Magnetita Argilosa ou Magnetita Chocante ou Magnetita Reluzente", quantidade: 1}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Bloco Prismático", chance_adicional: 0, ingredientes:[{item: "Pedra Rúnica", quantidade: 1}, {item: "Pedra Imaterial Rúnica", quantidade: 5}, {item: "Solvente Puro", quantidade: 4}]},
  ]
};

// --- Helper Maps (com tipagem) ---

// Map<string, Recipe> -> Um Map onde a chave é string e o valor é uma Recipe
export const recipeMap = new Map<string, Recipe>(
  cantariaData.receitas.map(recipe => [recipe.item, recipe])
);

// Map<string, ItemInfo> -> Chave string, valor é ItemInfo
const allItems: ItemInfo[] = [
  ...cantariaData.material_base,
  ...cantariaData.refinamentos,
];
export const itemInfoMap = new Map<string, ItemInfo>(
  allItems.map(item => [item.item, item])
);

// Adicionando item "virtual" (note que ele segue a interface ItemInfo)
itemInfoMap.set(
  "Magnetita Derretida ou Magnetita Congelante ou Magnetita Pútrida ou Magnetita Cristalina ou Magnetita Argilosa ou Magnetita Chocante ou Magnetita Reluzente",
  {
    item: "Magnetita Elemental (Qualquer)",
    imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonefiret1.png",
    backgroundColor: "verde"
  }
);