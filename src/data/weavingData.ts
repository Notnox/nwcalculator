import { 
  type ItemInfo, 
  type Recipe, 
  type CraftingData, 
  type CraftingModule 
} from '../types/craftingTypes';

// --- Dados ---
// Agora, garantimos que 'cantariaData' SEGUE a estrutura que definimos
const weavingData: CraftingData = {
  material_base: [
    {item: "Fibra", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/fibert1.png", backgroundColor: "cinza"},
    {item: "Fios de Seda", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/fibert4.png", backgroundColor: "cinza"},
    {item: "Fibra-de-fio", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/fibert5.png", backgroundColor: "cinza"},
    {item: "Fibra Cruzada", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/fibert52.png", backgroundColor: "cinza"},
    {item: "Trança de Fio", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/clothweavet5.png", backgroundColor: "verde"},
    {item: "Tecido de Escama", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/mi_cloak.png", backgroundColor: "roxo"},
  ],
  refinamentos: [
    {item: "Linho", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/clotht2.png", backgroundColor: "cinza"},
    {item: "Cetim", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/clotht3.png", backgroundColor: "cinza"},
    {item: "Seda", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/clotht4.png", backgroundColor: "cinza"},
    {item: "Seda Infusa", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/clotht5.png", backgroundColor: "cinza"},
    {item: "Tecido Cruzado", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/clotht52.png", backgroundColor: "cinza"},
    {item: "Fio de Fênix", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/clotht51.png", backgroundColor: "laranja"},
    {item: "Tecido Prismático", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/clotht53.png", backgroundColor: "laranja"},
  ],
  receitas:[
    {item: "Linho", chance_adicional: 30, ingredientes:[{item: "Fibra", quantidade: 4}]},
    {item: "Cetim", chance_adicional: 28, ingredientes:[{item: "Linho", quantidade: 4}, {item: "Trança de Fio", quantidade: 1}]},
    {item: "Seda", chance_adicional: 25, ingredientes:[{item: "Cetim", quantidade: 2}, {item: "Fios de Seda", quantidade: 6}, {item: "Trança de Fio", quantidade: 1}]},
    {item: "Seda Infusa", chance_adicional: 23, ingredientes:[{item: "Seda", quantidade: 2}, {item: "Fibra-de-fio", quantidade: 8}, {item: "Trança de Fio", quantidade: 1}]},
    {item: "Tecido Cruzado", chance_adicional: 10, ingredientes:[{item: "Seda Infusa", quantidade: 2}, {item: "Fibra Cruzada", quantidade: 12}, {item: "Trança de Fio", quantidade: 1}]},
    {item: "Fio de Fênix", chance_adicional: 5, ingredientes:[{item: "Seda Infusa", quantidade: 5}, {item: "Tecido de Escama", quantidade: 2}, {item: "Trança de Fio", quantidade: 1}]},
    {item: "Tecido Prismático", chance_adicional: 0, ingredientes:[{item: "Fio de Fênix", quantidade: 1}, {item: "Tecido Cruzado", quantidade: 10}, {item: "Trança de Fio", quantidade: 4}]}
  ]
};

const recipeMap = new Map<string, Recipe>(
  weavingData.receitas.map(recipe => [recipe.item, recipe])
);

const allItems: ItemInfo[] = [
  ...weavingData.material_base,
  ...weavingData.refinamentos,
];
const itemInfoMap = new Map<string, ItemInfo>(
  allItems.map(item => [item.item, item])
);

// --- Exportação Principal ---
export const weavingModule: CraftingModule = {
  id: "tecelagem", // O 'path' da URL
  title: "Tecelagem", // O texto do link no Header
  data: weavingData,
  recipeMap: recipeMap,
  itemInfoMap: itemInfoMap,
};