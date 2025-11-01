import { 
  type ItemInfo, 
  type Recipe, 
  type CraftingData, 
  type CraftingModule 
} from '../types/craftingTypes';

const matrixData: CraftingData = {
  name: {pt_name: "Matrizes", en_name: "Matrices"},
  material_base: [
    {item: "Azoth", en_name: "Azoth", imagem: "https://nwdb.info/images/db/currency_azoth.png", backgroundColor: "cinza"},
    {item: "Alkahest Infusa", en_name: "Infused Alkahest", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/potionpurplet5.png", backgroundColor: "cinza", price: 0},
    {item: "Pó de Gema Poderoso", en_name: "Powerful Gemstone Dust", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/consumable/gemstonedustt5.png", backgroundColor: "cinza", price: 0},
    {item: "Orbe de Gipsita", en_name: "Gypsum Orb", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/gypsumorb.png", backgroundColor: "roxo"},
    {item: "Lingote Prismático", en_name: "Prismatic Ingot", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/ingott53.png", backgroundColor: "laranja", price: 0},
    {item: "Couro Prismático", en_name: "Prismatic Leather", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/leathert53.png", backgroundColor: "laranja", price: 0},
    {item: "Tábua Prismática", en_name: "Prismatic Wood", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/woodt53.png", backgroundColor: "laranja", price: 0},
    {item: "Tecido Prismático", en_name: "Prismatic Cloth", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/clotht53.png", backgroundColor: "laranja", price: 0},
    {item: "Bloco Pristmático", en_name: "Prismatic Block", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/prismaticblockt53.png", backgroundColor: "laranja", price: 0}
  ],
  refinamentos: [
    {item: "Rebites Abençoados", en_name: "Blessed Rivets", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/rivets-blessedt52.png", backgroundColor: "roxo", price: 0},
    {item: "Suporte Reforçado", en_name: "Reinforced Bracing", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/reinforcedbracing.png", backgroundColor: "roxo", price: 0},
    {item: "Cabo Encantado", en_name: "Enchanted Handle", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/enchantedhandle.png", backgroundColor: "roxo", price: 0},
    {item: "Molde Temperado", en_name: "Tempered Cast", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/tempered-castt52.png", backgroundColor: "roxo", price: 0},
    {item: "Ácido de Afiação", en_name: "Honing Acid", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/honingacid.png", backgroundColor: "roxo", price: 0},
    {item: "Matriz de Armas", en_name: "Weapon Matrix", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/matrix-weapont52.png", backgroundColor: "laranja", price: 0},
    {item: "Matriz de Armadura", en_name: "Armor Matrix", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/matrix-armort52.png", backgroundColor: "laranja", price: 0},
    {item: "Matriz de Joias", en_name: "Jewelry Matrix", imagem: "https://cdn.nwdb.info/db/images/live/v57/icons/items/resource/matrix-jewelryt52.png", backgroundColor: "laranja", price: 0},
  ],
  receitas:[
    {item: "Rebites Abençoados", chance_adicional: 0, ingredientes:[{item: "Azoth", quantidade: 250}, {item: "Lingote Prismático", quantidade: 2}, {item: "Bloco Pristmático", quantidade: 2}, {item: "Pó de Gema Poderoso", quantidade: 15}, {item: "Orbe de Gipsita", quantidade: 5}]},
    {item: "Suporte Reforçado", chance_adicional: 0, ingredientes:[{item: "Azoth", quantidade: 250}, {item: "Tábua Prismática", quantidade: 2}, {item: "Tecido Prismático", quantidade: 2}, {item: "Bloco Pristmático", quantidade: 2}, {item: "Orbe de Gipsita", quantidade: 5}]},
    {item: "Cabo Encantado", chance_adicional: 0, ingredientes:[{item: "Azoth", quantidade: 250}, {item: "Lingote Prismático", quantidade: 2}, {item: "Tábua Prismática", quantidade: 2}, {item: "Couro Prismático", quantidade: 2}, {item: "Orbe de Gipsita", quantidade: 5}]},
    {item: "Molde Temperado", chance_adicional: 0, ingredientes:[{item: "Azoth", quantidade: 250}, {item: "Lingote Prismático", quantidade: 2}, {item: "Tecido Prismático", quantidade: 2}, {item: "Couro Prismático", quantidade: 2}, {item: "Orbe de Gipsita", quantidade: 5}]},
    {item: "Ácido de Afiação", chance_adicional: 0, ingredientes:[{item: "Azoth", quantidade: 250}, {item: "Couro Prismático", quantidade: 2}, {item: "Bloco Pristmático", quantidade: 2}, {item: "Alkahest Infusa", quantidade: 25}, {item: "Orbe de Gipsita", quantidade: 5}]},
    {item: "Matriz de Armas", chance_adicional: 0, ingredientes:[{item: "Azoth", quantidade: 250}, {item: "Cabo Encantado", quantidade: 1}, {item: "Molde Temperado", quantidade: 1}], pt_trade_skill: "Forja de Armas", en_trade_skill: "Weaponsmithing", trade_skill_level: 250, trade_skill_icon: "https://br.nwdb.info/images/db/icons/filters/tradeskills/weaponsmithing.png"},
    {item: "Matriz de Armas", chance_adicional: 0, ingredientes:[{item: "Azoth", quantidade: 250}, {item: "Cabo Encantado", quantidade: 1}, {item: "Ácido de Afiação", quantidade: 1}], pt_trade_skill: "Engenharia", en_trade_skill: "Engineering", trade_skill_level: 250, trade_skill_icon: "https://br.nwdb.info/images/db/icons/filters/tradeskills/engineering.png"},
    {item: "Matriz de Armadura", chance_adicional: 0, ingredientes:[{item: "Azoth", quantidade: 250}, {item: "Rebites Abençoados", quantidade: 1}, {item: "Suporte Reforçado", quantidade: 1}], pt_trade_skill: "Armaria", en_trade_skill: "Armoring", trade_skill_level: 250, trade_skill_icon: "https://br.nwdb.info/images/db/icons/filters/tradeskills/armoring.png"},
    {item: "Matriz de Armadura", chance_adicional: 0, ingredientes:[{item: "Azoth", quantidade: 250}, {item: "Molde Temperado", quantidade: 1}, {item: "Ácido de Afiação", quantidade: 1}], pt_trade_skill: "Arcana", en_trade_skill: "Arcana", trade_skill_level: 250, trade_skill_icon: "https://br.nwdb.info/images/db/icons/filters/tradeskills/arcana.png"},
    {item: "Matriz de Joias", chance_adicional: 0, ingredientes:[{item: "Azoth", quantidade: 250}, {item: "Rebites Abençoados", quantidade: 1}, {item: "Ácido de Afiação", quantidade: 1}], pt_trade_skill: "Joalheria", en_trade_skill: "Jewelcrafting", trade_skill_level: 250, trade_skill_icon: "https://br.nwdb.info/images/db/icons/filters/tradeskills/jewelcrafting.png"},
  ]
};