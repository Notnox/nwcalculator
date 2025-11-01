import { 
  type ItemInfo, 
  type Recipe, 
  type CraftingData, 
  type CraftingModule 
} from '../types/craftingTypes';

const leatherworkingData: CraftingData = {
  material_base: [
    {item: "Couro Cru", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/rawhidet1.png", backgroundColor: "cinza"},
    {item: "Pele Grossa", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/rawhidet4.png", backgroundColor: "cinza"},
    {item: "Pele de Ferro", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/rawhidet5.png", backgroundColor: "cinza"},
    {item: "Pele Sombria", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/rawhidet52.png", backgroundColor: "cinza"},
    {item: "Tanino Envelhecido", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/tannint5.png", backgroundColor: "verde"},
    {item: "Pele Cicatrizada", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/mangyhidet3.png", backgroundColor: "roxo"}
  ],
  refinamentos: [
    {item: "Couro Grosseiro", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert2.png", backgroundColor: "cinza"},
    {item: "Couro Rústico", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert3.png", backgroundColor: "cinza"},
    {item: "Couro Reforçado", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert4.png", backgroundColor: "cinza"},
    {item: "Couro Infuso", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert5.png", backgroundColor: "cinza"},
    {item: "Couro Sombrio", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert52.png", backgroundColor: "cinza"},
    {item: "Couro Rúnico", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert51.png", backgroundColor: "laranja"},
    {item: "Couro Prismático", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert53.png", backgroundColor: "laranja"},

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
const recipeMap = new Map<string, Recipe>(
  leatherworkingData.receitas.map(recipe => [recipe.item, recipe])
);

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