import React from 'react';
import {Route, Switch} from "react-router";
import { SignIn, SignUp, Reset, RecipeDetail } from "./templates";
import App from './App';
import Auth from './Auth';
import { RecipeVideos, RecipeCalendar, RecipeEdit, RecommendedRecipe, FavoriteRecipes,AutoMakeRecipeCalendar, RecipeFromIngredients } from './components/recipes/index';
import { RecipeBot, AiRecommendedRecipe } from './components/recipes/bot/index';
import { IngredientsList, IngredientsEdit, SearchIngredients } from './components/ingredients/index';
// import Auth from "./Auth";


const Router = () => {
    return(
        <Switch>
            {/* <Route exact path="/signin/reset" component={Reset} /> */}
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signin/reset"} component={Reset} />
            <Auth>
                <Route exact path={"(/)?"} component={RecommendedRecipe} />
                <Route path={"/recipe/calendar(/:id)?"} component={RecipeCalendar} />
                <Route exact path={"/recipe/auto"} component={AutoMakeRecipeCalendar} />
                <Route exact path={"/recipe/video"} component={RecipeVideos} />
                <Route path={"/recipe/edit(/:id)?"} component={RecipeEdit} />
                <Route exact path={"/recipe/favorite"} component={FavoriteRecipes} />
                <Route exact path={"/recipe/bot"} component={RecipeBot} />
                <Route exact path={"/recipe/bot/recommend"} component={AiRecommendedRecipe} />
                <Route exact path={"/recipe/search/ingredients"} component={SearchIngredients} />
                <Route exact path={"/recipe/search/ingredients/result"} component={RecipeFromIngredients} />
                <Route path={"/recipe/detail(/:id)?"} component={RecipeDetail} />
                <Route exact path={"/ingredients/list"} component={IngredientsList} />
                <Route exact path={"/ingredients/search"} component={SearchIngredients} />
                <Route path={"/ingredients/edit(/:id)?"} component={IngredientsEdit} />
            </Auth> 
        </Switch>
    )
}
export default Router