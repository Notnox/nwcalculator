import { 
  type ItemInfo, 
  type Recipe, 
  type CraftingData, 
  type CraftingModule 
} from '../types/craftingTypes';

const smeltingData: CraftingData = {
  name: {pt_name: "Fundição", en_name: "Smelting", imagem: "https://br.nwdb.info/images/db/icons/filters/tradeskills/smelting.png"},
  material_base: [
    {item: "Minério de Ferro", en_name: "Iron Ore", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/oret1.png", backgroundColor: "cinza"},
    {item: "Minério de Estelaço", en_name: "Starmetal Ore", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/oret4.png", backgroundColor: "cinza"},
    {item: "Minério de Oricalco", en_name: "Orichalcum Ore", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/oret5.png", backgroundColor: "cinza"},
    {item: "Minério de Mythril", en_name: "Mythril Ore", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/oret52.png", backgroundColor: "cinza"},
    {item: "Carvão", en_name: "Charcoal", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/charcoalt1.png", backgroundColor: "cinza"},
    {item: "Fundente de Obsidiana", en_name: "Obsidian Flux", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/fluxt5.png", backgroundColor: "verde"},
    {item: "Cinábrio", en_name: "Cinnabar", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/mi_corruptedmoss.png", backgroundColor: "roxo"}
  ],
  refinamentos: [
    {item: "Lingote de Ferro", en_name: "Iron Ingot", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott2.png", backgroundColor: "cinza"},
    {item: "Lingote de Aço", en_name: "Steel Ingot", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott3.png", backgroundColor: "cinza"},
    {item: "Lingote de Estelaço", en_name: "Starmetal Ingot", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott4.png", backgroundColor: "cinza"},
    {item: "Lingote de Oricalco", en_name: "Orichalcum Ingot", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott5.png", backgroundColor: "cinza"},
    {item: "Lingote de Mythril", en_name: "Mythril Ingot", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott52.png", backgroundColor: "cinza"},
    {item: "Asmódeo", en_name: "Asmodeum", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott51.png", backgroundColor: "laranja"},
    {item: "Lingote Prismático", en_name: "Prismatic Ingot", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott53.png", backgroundColor: "laranja"},

  ],
  receitas:[
    {item: "Lingote de Ferro", chance_adicional: 30, ingredientes:[{item: "Minério de Ferro", quantidade: 4}]},
    {item: "Lingote de Aço", chance_adicional: 28, ingredientes:[{item: "Lingote de Ferro", quantidade: 3}, {item: "Fundente de Obsidiana", quantidade: 1}, {item: "Carvão", quantidade: 2}]},
    {item: "Lingote de Estelaço", chance_adicional: 25, ingredientes:[{item: "Lingote de Aço", quantidade: 2}, {item: "Minério de Estelaço", quantidade: 6}, {item: "Fundente de Obsidiana", quantidade: 1}, {item: "Carvão", quantidade: 2}]},
    {item: "Lingote de Oricalco", chance_adicional: 23, ingredientes:[{item: "Lingote de Estelaço", quantidade: 2}, {item: "Minério de Oricalco", quantidade: 8}, {item: "Fundente de Obsidiana", quantidade: 1}, {item: "Carvão", quantidade: 2}]},
    {item: "Lingote de Mythril", chance_adicional: 10, ingredientes:[{item: "Lingote de Oricalco", quantidade: 2}, {item: "Minério de Mythril", quantidade: 12}, {item: "Fundente de Obsidiana", quantidade: 1}, {item: "Carvão", quantidade: 2}]},
    {item: "Asmódeo", chance_adicional: 5, ingredientes:[{item: "Lingote de Oricalco", quantidade: 5}, {item: "Cinábrio", quantidade: 2}, {item: "Fundente de Obsidiana", quantidade: 1}, {item: "Carvão", quantidade: 2}]},
    {item: "Lingote Prismático", chance_adicional: 0, ingredientes:[{item: "Asmódeo", quantidade: 1}, {item: "Lingote de Mythril", quantidade: 10}, {item: "Fundente de Obsidiana", quantidade: 4}, {item: "Carvão", quantidade: 4}]}
  ]
};

const recipeMap = new Map<string, Recipe[]>();
smeltingData.receitas.forEach(recipe => {
  if (!recipeMap.has(recipe.item)) {
    recipeMap.set(recipe.item, []);
  }
  recipeMap.get(recipe.item)!.push(recipe);
});
// --- FIM DO AJUSTE ---

const allItems: ItemInfo[] = [
  ...smeltingData.material_base,
  ...smeltingData.refinamentos,
];
const itemInfoMap = new Map<string, ItemInfo>(
  allItems.map(item => [item.item, item])
);

// --- Exportação Principal ---
export const smeltingModule: CraftingModule = {
  id: "fundicao", // O 'path' da URL
  title: "Fundição", // O texto do link no Header
  data: smeltingData,
  recipeMap: recipeMap,
  itemInfoMap: itemInfoMap,
};