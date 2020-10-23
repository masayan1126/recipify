import React, { useEffect } from 'react';
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
  }));


const RecommendedRecipe = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const recipes = getRecipes(selector);
    const uid = getUserId(selector);

    console.log(uid)

    useEffect(() => {
        dispatch(fetchRecommendedRecipe(uid))
    },[]);

    const pageTitle = 'オススメのレシピ一覧'

    return(
        <div className={classes.root}>
            <Title pageTitle={pageTitle} />
            <Grid container spacing={2}>
                {recipes.length > 0 && (
                    recipes.map(recipe => (
                        <Grid item xs={6}>
                            <RecipeCard key={recipe.id} recommendedRecipe={recipe} />
                        </Grid>
                    ))
                )}
                    
            </Grid>
        </div>
    )
}
export default RecommendedRecipe
