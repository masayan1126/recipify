import React,{useCallback, useState, useEffect} from 'react';
import { RecipeCard } from './index';
import { Title } from '../../templates/index';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import '../../assets/styles/style.css';
import { useDispatch, useSelector } from 'react-redux';
import {fetchRecommendedRecipe} from '../../redux/recipes/operations';
import {getRecipes} from '../../redux/recipes/selecotors';
import { getUserId } from '../../redux/users/selecotors';
import { Recipe } from "./index";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

const recommendedRecipeList = [
    { recipeName: "サバのトマト煮", path: "/static/images/cards/サバのトマト煮.jpg" },
    { recipeName: "ホワイトシチュー", path: "/static/images/cards/ホワイトシチュー.jpeg" },
    { recipeName: "ぶり大根", path: "/static/images/cards/ぶり大根.jpg" },
    { recipeName: "フレンチトースト", path: "/static/images/cards/フレンチトースト.jpg" },
];

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


const RecommendedRecipe = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const recipes = getRecipes(selector);
    const uid = getUserId(selector);
    const [fade, setFade] = useState(false);
    

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
                <Recipe recipes={recipes}
            
            // onChange={handleChange} 
                />

            </CSSTransition>
        </div>
    )
}
export default RecommendedRecipe
