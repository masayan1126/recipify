import React,{useCallback, useState, useEffect} from 'react';
import  { CalendarFlame } from "./index";
import { useSelector,useDispatch } from 'react-redux';
import { getCalendar } from '../../redux/calendar/selecotors';
import { fetchCalendar } from '../../redux/calendar/operations';
import { getUserId } from '../../redux/users/selecotors';
import {fetchRecommendedRecipe} from '../../redux/recipes/operations';
import {getRecipes} from '../../redux/recipes/selecotors';

const RecipeCalendar = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const calendar = getCalendar(selector);
    const uid = getUserId(selector);
    const recipes = getRecipes(selector);

    useEffect(() => {
        dispatch(fetchCalendar(uid))
        dispatch(fetchRecommendedRecipe(uid))
    }, [])

    return(
        <div>
            <h2>献立カレンダー</h2>
            <CalendarFlame calendar={calendar} recipes={recipes}/>
        </div>
    )
}
export default RecipeCalendar
