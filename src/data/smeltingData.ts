import { 
  type ItemInfo, 
  type Recipe, 
  type CraftingData, 
  type CraftingModule 
} from '../types/craftingTypes';

const smeltingData: CraftingData = {
  material_base: [
    {item: "Minério de Ferro", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/oret1.png", backgroundColor: "cinza"},
    {item: "Minério de Estelaço", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/oret4.png", backgroundColor: "cinza"},
    {item: "Minério de Oricalco", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/oret5.png", backgroundColor: "cinza"},
    {item: "Minério de Mythril", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/oret52.png", backgroundColor: "cinza"},
    {item: "Carvão", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/charcoalt1.png", backgroundColor: "cinza"},
    {item: "Fundente de Obsidiana", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/fluxt5.png", backgroundColor: "verde"},
    {item: "Cinábrio", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/mi_corruptedmoss.png", backgroundColor: "roxo"}
  ],
  refinamentos: [
    {item: "Lingote de Ferro", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott2.png", backgroundColor: "cinza"},
    {item: "Lingote de Aço", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott3.png", backgroundColor: "cinza"},
    {item: "Lingote de Estelaço", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott4.png", backgroundColor: "cinza"},
    {item: "Lingote de Oricalco", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott5.png", backgroundColor: "cinza"},
    {item: "Lingote de Mythril", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott52.png", backgroundColor: "cinza"},
    {item: "Asmódeo", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott51.png", backgroundColor: "laranja"},
    {item: "Lingote Prismático", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott53.png", backgroundColor: "laranja"},

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

const recipeMap = new Map<string, Recipe>(
  smeltingData.receitas.map(recipe => [recipe.item, recipe])
);

const allItems: ItemInfo[] = [
  ...smeltingData.material_base,
  ...smeltingData.refinamentos,
];
const itemInfoMap = new Map<string, ItemInfo>(
  allItems.map(item => [item.item, item])
);

// Nota: Este módulo não parece ter ingredientes "virtuais" ou "OU",
// então não precisamos adicionar nenhum item extra ao itemInfoMap.

// --- Exportação Principal ---
// Exportamos um único objeto que contém TUDO que a página precisa
export const smeltingModule: CraftingModule = {
  id: "fundicao", // O 'path' da URL
  title: "Fundição", // O texto do link no Header
  data: smeltingData,
  recipeMap: recipeMap,
  itemInfoMap: itemInfoMap,
};