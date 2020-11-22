import React,{useCallback, useState, useEffect} from 'react';
import { FavoriteRecipe } from './index';
import { useSelector,useDispatch } from 'react-redux';
import '../../assets/styles/style.css';
import {CSSTransition } from 'react-transition-group';
import {fetchRecommendedRecipe} from '../../redux/recipes/operations';
import {getRecipes} from '../../redux/recipes/selecotors';
import { getUserId } from '../../redux/users/selecotors';
  
const FavoriteRecipes = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const recipes = getRecipes(selector);
    const uid = getUserId(selector);
    const [fade, setFade] = useState(false);
    const favoriteRecipes = recipes.filter((recipe) => {
        return recipe.favorite == true;
    })

    useEffect(() => {
        dispatch(fetchRecommendedRecipe(uid))
        setFade(true);
    }, [])

    return(
        <section>
            <h3 className="title">お気に入りレシピ一覧</h3>
            <FavoriteRecipe 
                favoriteRecipes = {favoriteRecipes} 
                
            />

        </section>
    )
}
export default FavoriteRecipes