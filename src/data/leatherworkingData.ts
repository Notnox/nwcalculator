import { 
  type ItemInfo, 
  type Recipe, 
  type CraftingData, 
  type CraftingModule 
} from '../types/craftingTypes';

const leatherworkingData: CraftingData = {
  name: {pt_name: "Curtume", en_name: "Leatherworking", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert53.png"},
  material_base: [
    {item: "Couro Cru", en_name: "Rawhide", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/rawhidet1.png", backgroundColor: "cinza"},
    {item: "Pele Grossa", en_name: "Thick Hide", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/rawhidet4.png", backgroundColor: "cinza"},
    {item: "Pele de Ferro", en_name: "Iron Hide", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/rawhidet5.png", backgroundColor: "cinza"},
    {item: "Pele Sombria", en_name: "Dark Hide", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/rawhidet52.png", backgroundColor: "cinza"},
    {item: "Tanino Envelhecido", en_name: "Aged Tannin", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/tannint5.png", backgroundColor: "verde"},
    {item: "Pele Cicatrizada", en_name: "Scarhide", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/mangyhidet3.png", backgroundColor: "roxo"}
  ],
  refinamentos: [
    {item: "Couro Grosseiro", en_name: "Coarse Leather", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert2.png", backgroundColor: "cinza"},
    {item: "Couro Rústico", en_name: "Rugged Leather", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert3.png", backgroundColor: "cinza"},
    {item: "Couro Reforçado", en_name: "Layered Leather", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert4.png", backgroundColor: "cinza"},
    {item: "Couro Infuso", en_name: "Infused Leather", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert5.png", backgroundColor: "cinza"},
    {item: "Couro Sombrio", en_name: "Dark Leather", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert52.png", backgroundColor: "cinza"},
    {item: "Couro Rúnico", en_name: "Runic Leather", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert51.png", backgroundColor: "laranja"},
    {item: "Couro Prismático", en_name: "Prismatic Leather", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert53.png", backgroundColor: "laranja"},

  ],
  receitas:[
    {item: "Couro Grosseiro", chance_adicional: 30, ingredientes:[{item: "Couro Cru", quantidade: 4}]},
    {item: "Couro Rústico", chance_adicional: 28, ingredientes:[{item: "Couro Grosseiro", quantidade: 4}, {item: "Tanino Envelhecido", quantidade: 1}]},
    {item: "Couro Reforçado", chance_adicional: 25, ingredientes:[{item: "Couro Rústico", quantidade: 2}, {item: "Pele Grossa", quantidade: 6}, {item: "Tanino Envelhecido", quantidade: 1}]},
    {item: "Couro Infuso", chance_adicional: 23, ingredientes:[{item: "Couro Reforçado", quantidade: 2}, {item: "Pele de Ferro", quantidade: 8}, {item: "Tanino Envelhecido", quantidade: 1}]},
    {item: "Couro Sombrio", chance_adicional: 10, ingredientes:[{item: "Couro Infuso", quantidade: 2}, {item: "Pele Sombria", quantidade: 16}, {item: "Tanino Envelhecido", quantidade: 1}]},
    {item: "Couro Rúnico", chance_adicional: 5, ingredientes:[{item: "Couro Infuso", quantidade: 5}, {item: "Pele Cicatrizada", quantidade: 2}, {item: "Tanino Envelhecido", quantidade: 1}]},
    {item: "Couro Prismático", chance_adicional: 0, ingredientes:[{item: "Couro Rúnico", quantidade: 1}, {item: "Couro Sombrio", quantidade: 12}, {item: "Tanino Envelhecido", quantidade: 4}]}
  ]
};

// --- Helpers (internos do módulo) ---
const recipeMap = new Map<string, Recipe[]>();
leatherworkingData.receitas.forEach(recipe => {
  if (!recipeMap.has(recipe.item)) {
    recipeMap.set(recipe.item, []);
  }
  recipeMap.get(recipe.item)!.push(recipe);
});
// --- FIM DO AJUSTE ---

const allItems: ItemInfo[] = [
  ...leatherworkingData.material_base,
  ...leatherworkingData.refinamentos,
];
const itemInfoMap = new Map<string, ItemInfo>(
  allItems.map(item => [item.item, item])
);

// --- Exportação Principal ---
export const leatherworkingModule: CraftingModule = {
  id: "couraria", // O 'path' da URL
  title: "Curtume", // O texto do link no Header
  data: leatherworkingData,
  recipeMap: recipeMap,
  itemInfoMap: itemInfoMap,
};