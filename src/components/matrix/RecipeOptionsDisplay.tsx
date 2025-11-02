import React, { useMemo } from 'react';
import { 
  Box, Paper, Typography, Avatar, TableContainer, 
  Table, TableBody, TableRow, TableCell, Stack 
} from '@mui/material';
import { itemInfoMap, recipeMap } from '../../data/matrixData';
import { colorMap } from '../../utils/colorMap';
import { type Recipe } from '../../types/craftingTypes';
import { useSettings } from '../../contexts/SettingsContext';

interface RecipeOptionsDisplayProps {
  recipes: Recipe[];
}

const RecipeOptionsDisplay: React.FC<RecipeOptionsDisplayProps> = ({ recipes }) => {
  
  const { language } = useSettings();
  
  const t = language === 'pt' ? {
      ingredients: "Ingredientes Necessários:",
      via: "Via",
      summary: "Resumo de Matérias-Primas:",
  } : {
      ingredients: "Required Ingredients:",
      via: "Via",
      summary: "Raw Materials Summary:",
  };

  /**
   * Varre a árvore de receitas e calcula o resumo
   * de materiais base (itens sem receita no matrixData).
   */
  const aggregateBaseMaterials = (recipe: Recipe): Map<string, number> => {
    const summaryMap = new Map<string, number>();

    const findBase = (itemName: string, quantity: number) => {
      const subRecipes = recipeMap.get(itemName);
      
      if (subRecipes && subRecipes.length > 0) {
        const subRecipe = subRecipes[0];
        for (const ing of subRecipe.ingredientes) {
          findBase(ing.item, ing.quantidade * quantity);
        }
      } else {
        const currentQty = summaryMap.get(itemName) || 0;
        summaryMap.set(itemName, currentQty + quantity);
      }
    };

    for (const ing of recipe.ingredientes) {
      findBase(ing.item, ing.quantidade);
    }
    
    return summaryMap;
  };

  return (
    <Stack spacing={3}>
      {recipes.map((recipe, index) => {
          const info = itemInfoMap.get(recipe.item);
          const skillName = language === 'pt' ? recipe.pt_trade_skill : recipe.en_trade_skill;
          const skillIcon = recipe.trade_skill_icon;

          const summaryMap = useMemo(() => aggregateBaseMaterials(recipe), [recipe]);
          const summaryArray = Array.from(summaryMap.entries());

          return (
            <Paper key={index} elevation={0} variant="outlined" sx={{ p: { xs: 1, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Avatar src={skillIcon} sx={{ backgroundColor: colorMap[info?.backgroundColor || 'default'] }} />
                  <Typography variant="h5">{`${t.via} ${skillName}`}</Typography>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>{t.ingredients}</Typography>
              <TableContainer component={Paper} elevation={0} variant="outlined">
                  <Table size="small">
                      <TableBody>
                          {recipe.ingredientes.map((ing) => {
                              const ingInfo = itemInfoMap.get(ing.item);
                              const name = language === 'pt' ? ingInfo?.item : (ingInfo?.en_name || ingInfo?.item);
                              const subRecipe = recipeMap.get(ing.item)?.[0];

                              return (
                                <React.Fragment key={ing.item}>
                                  <TableRow>
                                      <TableCell sx={{ width: '50px' }}>
                                          <Avatar src={ingInfo?.imagem} sx={{ width: 24, height: 24, backgroundColor: colorMap[ingInfo?.backgroundColor || 'default'] }} />
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="body1">
                                          {name}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="right">{`${ing.quantidade.toLocaleString('pt-BR')} un`}</TableCell>
                                  </TableRow>
                                  
                                  {subRecipe && subRecipe.ingredientes.map(subIng => {
                                    const subIngInfo = itemInfoMap.get(subIng.item);
                                    const subName = language === 'pt' ? subIngInfo?.item : (subIngInfo?.en_name || subIngInfo?.item);
                                    
                                    return (
                                      <TableRow key={subIng.item}>
                                        <TableCell sx={{ pl: 4 }}>
                                          <Avatar src={subIngInfo?.imagem} sx={{ width: 20, height: 20, backgroundColor: colorMap[subIngInfo?.backgroundColor || 'default'] }} />
                                        </TableCell>
                                        <TableCell>
                                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {subName}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="right" sx={{ color: 'text.secondary' }}>
                                          {`${subIng.quantidade.toLocaleString('pt-BR')} un`}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </React.Fragment>
                              );
                          })}
                      </TableBody>
                  </Table>
              </TableContainer>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                {t.summary}
              </Typography>
              <TableContainer component={Paper} elevation={0} variant="outlined">
                <Table size="small">
                  <TableBody>
                    {summaryArray.map(([itemName, quantity]) => {
                      const info = itemInfoMap.get(itemName);
                      const name = language === 'pt' ? info?.item : (info?.en_name || info?.item);
                      return (
                        <TableRow key={itemName}>
                          <TableCell sx={{ width: '50px' }}>
                            <Avatar src={info?.imagem} sx={{ width: 24, height: 24, backgroundColor: colorMap[info?.backgroundColor || 'default'] }} />
                          </TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell align="right">
                            <strong>{`${quantity.toLocaleString('pt-BR')} un`}</strong>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          );
      })}
    </Stack>
  );
};

export default RecipeOptionsDisplay;