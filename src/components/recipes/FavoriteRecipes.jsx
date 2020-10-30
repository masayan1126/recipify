import React,{useCallback, useState, useEffect} from 'react';
import { FavoriteRecipe } from './index';
import { useSelector,useDispatch } from 'react-redux';
import { signInAction, signOutAction } from '../../redux/users/actions';
import { signOut } from '../../redux/users/operations';
import '../../assets/styles/style.css';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import {fetchRecommendedRecipe} from '../../redux/recipes/operations';
import {getRecipes} from '../../redux/recipes/selecotors';
import { getUserId } from '../../redux/users/selecotors';
  

const favoriteRecipes = [
    { recipeName: "サバのトマト煮", path: "/static/images/cards/サバのトマト煮.jpg" },
    { recipeName: "ホワイトシチュー", path: "/static/images/cards/ホワイトシチュー.jpeg" },
    { recipeName: "ぶり大根", path: "/static/images/cards/ぶり大根.jpg" },
    { recipeName: "フレンチトースト", path: "/static/images/cards/フレンチトースト.jpg" },
];


const FavoriteRecipes = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const [fade, setFade] = useState(false);
    const recipes = getRecipes(selector);
    const uid = getUserId(selector);
    const favoriteRecipes = recipes.filter((favoriteRecipe) => {
        return favoriteRecipe.favorite == true;
    })

    

useEffect(() => {
    dispatch(fetchRecommendedRecipe(uid))
    setFade(true);
}, [])

    return(
        <>
            <h3 className="title">お気に入りレシピ一覧</h3>
            <CSSTransition
                in={fade}
                timeout={1000}
                classNames="fade"
            >
                
                <FavoriteRecipe favoriteRecipes = {favoriteRecipes} />


            </CSSTransition>
        </>
    )
}
export default FavoriteRecipes