// src/data/cantariaData.ts

import { 
  type ItemInfo, 
  type Recipe, 
  type CraftingData, 
  type CraftingModule 
} from '../types/craftingTypes';

// --- Dados ---
// Agora, garantimos que 'cantariaData' SEGUE a estrutura que definimos
const stonecuttingData: CraftingData = {
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
    {item: "Pedra Imaterial Obsidiana", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt5.png", backgroundColor: "cinza"},
    {item: "Pedra Imaterial Rúnica", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt52.png", backgroundColor: "cinza"},
    {item: "Pedra Rúnica", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt51.png", backgroundColor: "laranja"},
    {item: "Bloco Prismático", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt53.png", backgroundColor: "laranja"},
  ],
  receitas:[
    {item: "Bloco de Pedra", chance_adicional: 30, ingredientes:[{item: "Pedra", quantidade: 4}]},
    {item: "Tijolo de Pedra", chance_adicional: 28, ingredientes:[{item: "Bloco de Pedra", quantidade: 4}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Tijolo de Magnetita", chance_adicional: 25, ingredientes:[{item: "Tijolo de Pedra", quantidade: 2}, {item: "Magnetita", quantidade: 6}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Pedra Imaterial Obsidiana", chance_adicional: 18, ingredientes:[{item: "Tijolo de Magnetita", quantidade: 8}, {item: "Magnetita", quantidade: 2}, {item: "Magnetita Derretida ou Magnetita Congelante ou Magnetita Pútrida ou Magnetita Cristalina ou Magnetita Argilosa ou Magnetita Chocante ou Magnetita Reluzente", quantidade: 1}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Pedra Imaterial Rúnica", chance_adicional: 10, ingredientes:[{item: "Pedra Imaterial Obsidiana", quantidade: 1}, {item: "Pó de Gema Poderoso", quantidade: 1}, {item: "Solvente Puro", quantidade: 4}]},
    {item: "Pedra Rúnica", chance_adicional: 5, ingredientes:[{item: "Pedra Imaterial Obsidiana", quantidade: 5}, {item: "Magnetita Derretida ou Magnetita Congelante ou Magnetita Pútrida ou Magnetita Cristalina ou Magnetita Argilosa ou Magnetita Chocante ou Magnetita Reluzente", quantidade: 1}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Bloco Prismático", chance_adicional: 0, ingredientes:[{item: "Pedra Rúnica", quantidade: 1}, {item: "Pedra Imaterial Rúnica", quantidade: 5}, {item: "Solvente Puro", quantidade: 4}]},
  ]
};

// --- Helper Maps (com tipagem) ---

// Map<string, Recipe> -> Um Map onde a chave é string e o valor é uma Recipe
const recipeMap = new Map<string, Recipe>(
  stonecuttingData.receitas.map(recipe => [recipe.item, recipe])
);

const allItems: ItemInfo[] = [
  ...stonecuttingData.material_base,
  ...stonecuttingData.refinamentos,
];
const itemInfoMap = new Map<string, ItemInfo>(
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

export const stonecuttingModule: CraftingModule = {
  id: "cantaria",
  title: "Cantaria",
  data: stonecuttingData,
  recipeMap: recipeMap,
  itemInfoMap: itemInfoMap,
};