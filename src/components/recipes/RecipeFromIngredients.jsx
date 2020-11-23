import React,{useCallback, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {fetchRecommendedRecipe} from '../../redux/recipes/operations';
import { getSelectedIngredients, getRecipes } from '../../redux/recipes/selecotors';
import { getUserId } from '../../redux/users/selecotors';
import { Recipes } from "./index";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import { Ingredients } from '../ingredients';
import { NoData } from "../../templates/index";
import {push} from 'connected-react-router'

const RecipeFromIngredients = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const recipes = getRecipes(selector);
    const [fade, setFade] = useState(false);
    const selectedIngredients = getSelectedIngredients(selector);

    console.log(selectedIngredients);
    console.log(recipes);
    const vegs = selectedIngredients.filter((ingredients) => {
        return ingredients.category == "野菜";
    })

    const meats = selectedIngredients.filter((ingredients) => {
        return ingredients.category == "肉";
    })

    const fishes = selectedIngredients.filter((ingredients) => {
        return ingredients.category == "魚";
    })

    const cereals = selectedIngredients.filter((ingredients) => {
        return ingredients.category == "穀類";
    })

    const others = selectedIngredients.filter((ingredients) => {
        return ingredients.category == "その他";
    })

    // 食材のどれかが一致（部分一致であれば、表示する）
    const targetRecipes = recipes.filter((recipe) => {
        return recipe.necessaryIngredientsOne　== vegs[0].name || recipe.necessaryIngredientsTwo　== meats[0].name ||
               recipe.necessaryIngredientsThree　== fishes[0].name || recipe.necessaryIngredientsFour　== cereals[0].name ||
               recipe.necessaryIngredientsFive　== others[0].name
    })

    const message = "該当するレシピはありませんでした"

    useEffect(() => {
        dispatch(fetchRecommendedRecipe(uid))
        setFade(true);
    },[]);

    return(
        <div>
            {targetRecipes.length == 0 ? 
                <NoData 
                    message={"検索条件に一致するレシピはありませんでした!!"}
                    linkMenu={"＞条件を変更して再度検索する"}
                    onClick={() => dispatch(push("/recipe/search/ingredients"))}
                />
                :
                <Recipes 
                    recipes={targetRecipes} message = {message} 
                    
                />
            }

        </div>
    )
}
export default RecipeFromIngredients
