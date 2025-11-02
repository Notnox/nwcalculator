import { 
  type ItemInfo, 
  type Recipe, 
  type CraftingData, 
  type CraftingModule 
} from '../types/craftingTypes';

const woodworkingData: CraftingData = {
  name: {pt_name: "Carpintaria", en_name: "Woodworking", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert53.png"},
  material_base: [
    {item: "Madeira Verde", en_name: "Green Wood", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt1.png", backgroundColor: "cinza"},
    {item: "Madeira Envelhecida", en_name: "Aged Wood", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt2.png", backgroundColor: "cinza"},
    {item: "Urdeira", en_name: "Wyrdwood", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt4.png", backgroundColor: "cinza"},
    {item: "Jucá", en_name: "Ironwood", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt5.png", backgroundColor: "cinza"},
    {item: "Jacarandá", en_name: "Runewood", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt52.png", backgroundColor: "cinza"},
    {item: "Lixa de Obsidiana", en_name: "Obsidian Sandpaper", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/sandpapert5.png", backgroundColor: "verde"},
    {item: "Madeira Selvagem", en_name: "Wildwood", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/writhingvinest3.png", backgroundColor: "roxo"}
  ],
  refinamentos: [
    {item: "Tábua", en_name: "Timber", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert2.png", backgroundColor: "cinza"},
    {item: "Lenha", en_name: "Lumber", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert3.png", backgroundColor: "cinza"},
    {item: "Tábuas de Urdeira", en_name: "Wyrdwood Planks", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert4.png", backgroundColor: "cinza"},
    {item: "Tábuas de Jucá", en_name: "Ironwood Planks", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert5.png", backgroundColor: "cinza"},
    {item: "Tábuas de Jacarandá", en_name: "Runewood Planks", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert52.png", backgroundColor: "cinza"},
    {item: "Ébano Cintilante", en_name: "Glittering Ebony", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert51.png", backgroundColor: "laranja"},
    {item: "Tábuas Prismáticas", en_name: "Prismatic Planks", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/timbert53.png", backgroundColor: "laranja"},
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
const recipeMap = new Map<string, Recipe[]>();
woodworkingData.receitas.forEach(recipe => {
  if (!recipeMap.has(recipe.item)) {
    recipeMap.set(recipe.item, []);
  }
  recipeMap.get(recipe.item)!.push(recipe);
});
// --- FIM DO AJUSTE ---

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
  title: "Marcenaria", // O texto do link no Header
  data: woodworkingData,
  recipeMap: recipeMap,
  itemInfoMap: itemInfoMap,
};