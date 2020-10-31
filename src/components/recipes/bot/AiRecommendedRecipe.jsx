import React,{useCallback, useState, useEffect} from 'react';
import { RecipeCard } from '../index';
import { Title } from '../../../templates/index';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import '../../assets/styles/style.css';
import { useDispatch, useSelector } from 'react-redux';
import {fetchRecommendedRecipe} from '../../../redux/recipes/operations';
import {getBotResult} from '../../../redux/bot/selecotors';
import {getRecipes} from '../../../redux/recipes/selecotors';
import { getUserId } from '../../../redux/users/selecotors';
import { Recipe } from "../index";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

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
    const [fade, setFade] = useState(false);
    
    const botResult = getBotResult(selector);

    // 和食等
    const answerOne = botResult[0].answer
    // 肉料理等
    const answerTwo = botResult[1].answer
    // 調理時間
    let answerThree = botResult[2].answer

    switch (answerThree) {
        case "あまり時間がない":
            answerThree = "簡単にできる"
            break;
        case "普通":
            answerThree = "普通"
            break;
        case "かなり時間がある":
            answerThree = "手間がかかる"
            break;
        // default:
        //     return answerThree
    } 

    const recipes = getRecipes(selector);
    const aiRecipes = recipes.filter((recipe) => {
        return recipe.recipeCategory == answerOne
        &&  recipe.recipeGenre == answerTwo
        &&  recipe.cookingTime == answerThree

    })

    const message = "該当するレシピはありませんでした"

    // useEffect(() => {
          
      
    //   }, [])

    useEffect(() => {
        dispatch(fetchRecommendedRecipe(uid))
        setFade(true);
    },[]);

    return(
        <div>
            {/* <h2 className="title">レシピ一覧</h2> */}
            {/* <Grid container spacing={2}>
                {recipes.length > 0 && (
                    recipes.map(recipe => (
                        <Grid item xs={6} sm={4} md={3} lg={2}>
                            <RecipeCard key={recipe.id} recommendedRecipe={recipe} />
                        </Grid>
                    ))
                )}
                    
            </Grid> */}

            <CSSTransition
                in={fade}
                timeout={1000}
                classNames="fade"
            >
                <Recipe recipes={aiRecipes} message = {message}
            
            // onChange={handleChange} 
                />

            </CSSTransition>
        </div>
    )
}
export default AiRecommendedRecipe
