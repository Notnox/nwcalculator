import { 
  type ItemInfo, 
  type Recipe, 
  type CraftingData, 
  type CraftingModule 
} from '../types/craftingTypes';

const woodworkingData: CraftingData = {
  material_base: [
    {item: "Madeira Verde", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt1.png", backgroundColor: "cinza"},
    {item: "Madeira Envelhecida", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt2.png", backgroundColor: "cinza"},
    {item: "Urdeira", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt4.png", backgroundColor: "cinza"},
    {item: "Jucá", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt5.png", backgroundColor: "cinza"},
    {item: "Jacarandá", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt52.png", backgroundColor: "cinza"},
    {item: "Lixa de Obsidiana", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/sandpapert5.png", backgroundColor: "verde"},
    {item: "Madeira Selvagem", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/writhingvinest3.png", backgroundColor: "roxo"}
  ],
  refinamentos: [
    {item: "Tábua", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert2.png", backgroundColor: "cinza"},
    {item: "Lenha", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert3.png", backgroundColor: "cinza"},
    {item: "Tábuas de Urdeira", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert4.png", backgroundColor: "cinza"},
    {item: "Tábuas de Jucá", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert5.png", backgroundColor: "cinza"},
    {item: "Tábuas de Jacarandá", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert52.png", backgroundColor: "cinza"},
    {item: "Ébano Cintilante", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert51.png", backgroundColor: "laranja"},
    {item: "Tábuas Prismáticas", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert53.png", backgroundColor: "laranja"},
  ],
  receitas:[
    {item: "Tábua", chance_adicional: 30, ingredientes:[{item: "Madeira Verde", quantidade: 4}]},
    {item: "Lenha", chance_adicional: 28, ingredientes:[{item: "Tábua", quantidade: 2}, {item: "Madeira Envelhecida", quantidade: 4}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Tábuas de Urdeira", chance_adicional: 25, ingredientes:[{item: "Lenha", quantidade: 2}, {item: "Urdeira", quantidade: 6}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Tábuas de Jucá", chance_adicional: 23, ingredientes:[{item: "Tábuas de Urdeira", quantidade: 2}, {item: "Jucá", quantidade: 8}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Tábuas de Jacarandá", chance_adicional: 10, ingredientes:[{item: "Tábuas de Jucá", quantidade: 2}, {item: "Jacarandá", quantidade: 12}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Ébano Cintilante", chance_adicional: 5, ingredientes:[{item: "Tábuas de Jucá", quantidade: 5}, {item: "Madeira Selvagem", quantidade: 2}, {item: "Lixa de Obsidiana", quantidade: 1}]},
    {item: "Tábuas Prismáticas", chance_adicional: 0, ingredientes:[{item: "Ébano Cintilante", quantidade: 1}, {item: "Tábuas de Jacarandá", quantidade: 10}, {item: "Lixa de Obsidiana", quantidade: 4}]}
  ]
};

// --- Helpers (internos do módulo) ---
const recipeMap = new Map<string, Recipe>(
  woodworkingData.receitas.map(recipe => [recipe.item, recipe])
);

const allItems: ItemInfo[] = [
  ...woodworkingData.material_base,
  ...woodworkingData.refinamentos,
];
const itemInfoMap = new Map<string, ItemInfo>(
  allItems.map(item => [item.item, item])
);

// --- Exportação Principal ---
export const woodworkingModule: CraftingModule = {
  id: "carpintaria", // O 'path' da URL
  title: "Carpintaria", // O texto do link no Header
  data: woodworkingData,
  recipeMap: recipeMap,
  itemInfoMap: itemInfoMap,
};