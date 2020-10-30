import React from 'react';
import {Route, Switch} from "react-router";
import { SignIn, SignUp, Reset, RecipeDetail } from "./templates";
import App from './App';
import Auth from './Auth';
import { RecipeVideos, RecipeCalendar, RecipeEdit, RecommendedRecipe, FavoriteRecipes,AutoMakeRecipeCalendar } from './components/recipes/index';
import { IngredientsList, IngredientsEdit } from './components/ingredients/index';
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
                <Route path={"/recipe/detail(/:id)?"} component={RecipeDetail} />
                <Route exact path={"/ingredients/list"} component={IngredientsList} />
                <Route path={"/ingredients/edit(/:id)?"} component={IngredientsEdit} />
            </Auth> 
        </Switch>
    )
}
export default Router