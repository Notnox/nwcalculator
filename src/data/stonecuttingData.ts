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
  name: {pt_name: "Cantaria", en_name: "Stonecutting", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt53.png"},
  material_base: [
    {item: "Pedra", en_name: "Stone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/stonet1.png", backgroundColor: "cinza"},
    {item: "Magnetita", en_name: "Lodestone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/stonet4.png", backgroundColor: "cinza"},
    {item: "Pó de Gema Poderoso", en_name: "Powerful Gemstone Dust", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/consumable/gemstonedustt5.png", backgroundColor: "cinza"},
    {item: "Lixa de Obsidiana", en_name: "Obsidian Sandpaper", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/sandpapert5.png", backgroundColor: "verde"},
    {item: "Solvente Puro", en_name: "Pure Solvent", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/solventt5.png", backgroundColor: "verde"},
    {item: "Magnetita Derretida", en_name: "Molten Lodestone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonefiret1.png", backgroundColor: "verde"},
    {item: "Magnetita Congelante", en_name: "Freezing Lodestone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonewatert1.png", backgroundColor: "verde"},
    {item: "Magnetita Pútrida", en_name: "Putrid Lodestone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonedeatht1.png", backgroundColor: "verde"},
    {item: "Magnetita Cristalina", en_name: "Crystalline Lodestone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonesoult1.png", backgroundColor: "verde"},
    {item: "Magnetita Argilosa", en_name: "Loamy Lodestone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestoneeartht1.png", backgroundColor: "verde"},
    {item: "Magnetita Chocante", en_name: "Shocking Lodestone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestoneairt1.png", backgroundColor: "verde"},
    {item: "Magnetita Reluzente", en_name: "Gleaming Lodestone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/lodestonelifet1.png", backgroundColor: "verde"}
  ],
  refinamentos: [
    {item: "Bloco de Pedra", en_name: "Stone Block", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt2.png", backgroundColor: "cinza"},
    {item: "Tijolo de Pedra", en_name: "Stone Brick", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt3.png", backgroundColor: "cinza"},
    {item: "Tijolo de Magnetita", en_name: "Lodestone Brick", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt4.png", backgroundColor: "cinza"},
    {item: "Pedra Imaterial Obsidiana", en_name: "Obsidian Voidstone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt5.png", backgroundColor: "cinza"},
    {item: "Pedra Imaterial Rúnica", en_name: "Runic Voidstone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt52.png", backgroundColor: "cinza"},
    {item: "Pedra Rúnica", en_name: "Runestone", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt51.png", backgroundColor: "laranja"},
    {item: "Bloco Prismático", en_name: "Prismatic Block", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/blockt53.png", backgroundColor: "laranja"},
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
const recipeMap = new Map<string, Recipe[]>();
stonecuttingData.receitas.forEach(recipe => {
  if (!recipeMap.has(recipe.item)) {
    recipeMap.set(recipe.item, []);
  }
  recipeMap.get(recipe.item)!.push(recipe);
});
// --- FIM DO AJUSTE ---

const allItems: ItemInfo[] = [
  ...stonecuttingData.material_base,
  ...stonecuttingData.refinamentos,
];
const itemInfoMap = new Map<string, ItemInfo>(
  allItems.map(item => [item.item, item])
);

// Adicionando item "virtual"
itemInfoMap.set(
  "Magnetita Derretida ou Magnetita Congelante ou Magnetita Pútrida ou Magnetita Cristalina ou Magnetita Argilosa ou Magnetita Chocante ou Magnetita Reluzente",
  {
    item: "Magnetita Elemental (Qualquer)",
    en_name: "Elemental Lodestone (Any)",
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