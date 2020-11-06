import React,{useCallback, useState, useEffect} from 'react';
import { RecipeCard } from './index';
import { Title } from '../../templates/index';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import '../../assets/styles/style.css';
import { useDispatch, useSelector } from 'react-redux';
import {fetchRecommendedRecipe} from '../../redux/recipes/operations';
import {getBotResult} from '../../redux/bot/selecotors';
import { getSelectedIngredients, getRecipes } from '../../redux/recipes/selecotors';
import { getUserId } from '../../redux/users/selecotors';
import { Recipes } from "./index";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import { Ingredients } from '../ingredients';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    //   justifyContent: 'center',
    //   flexDirection: 'row',
    },
    max_width: {
        maxWidth: "200",
    },
  }));


const AiRecommendedRecipe = () => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const recipes = getRecipes(selector);
    const [fade, setFade] = useState(false);
    
    const selectedIngredients = getSelectedIngredients(selector);

    
    
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

    const potatoes_starches_beans_mushrooms = selectedIngredients.filter((ingredients) => {
        return ingredients.category == "その他";
    })

    
    const targetRecipes = recipes.filter((recipe) => {
        return recipe.necessaryIngredientsOne　== vegs[0].name || recipe.necessaryIngredientsTwo　== meats[0].name ||
               recipe.necessaryIngredientsThree　== fishes[0].name || recipe.necessaryIngredientsFour　== cereals[0].name ||
               recipe.necessaryIngredientsFive　== potatoes_starches_beans_mushrooms[0].name
    })

    console.log(targetRecipes);

    // const arr = recipes.map((recipe) => recipe.necessaryIngredientsFive, recipe.necessaryIngredientsOne)

    // { id:"shimeji_mushroom", name: "しめじ" },
    // { id:"maitake", name: "まいたけ" },
    // { id:"mushroom", name: "マシュルーム" },

    // recipes.

    // const targetIngredients = selectedIngredients.map((ingredients) => ingredients.name)
    // const targetRecipes = recipes
    
    // const targetIngredients = []
    // selectedIngredients.forEach(ingredients => {
    //     if (ingredients.name) {

    //     }
    // });
    

    // switch (answerThree) {
    //     case "あまり時間がない":
    //         answerThree = "簡単にできる"
    //         break;
    //     case "普通":
    //         answerThree = "普通"
    //         break;
    //     case "かなり時間がある":
    //         answerThree = "手間がかかる"
    //         break;
    //     default:
    //         return answerThree
    // } 


    // const recipes = getRecipes(selector);
    // const aiRecipes = recipes.filter((recipe) => {
    //     return recipe.recipeCategory == answerOne
    //     &&  recipe.recipeGenre == answerTwo
    //     &&  recipe.cookingTime == answerThree

    // })

    const message = "該当するレシピはありませんでした"

    // useEffect(() => {
          
      
    //   }, [])

    useEffect(() => {
        dispatch(fetchRecommendedRecipe(uid))
        setFade(true);
    },[]);

    return(
        <div>
            <CSSTransition
                in={fade}
                timeout={1000}
                classNames="fade"
            >
                <Recipes recipes={targetRecipes} message = {message}
            
            // onChange={handleChange} 
                />

            </CSSTransition>
        </div>
    )
}
export default AiRecommendedRecipe
