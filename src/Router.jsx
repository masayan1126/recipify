import React from 'react';
import {Route, Switch} from "react-router";
import { SignIn, SignUp, Reset, RecipeDetail, UserProfile, UserProfileEdit, Contact } from "./templates";
import App from './App';
import Auth from './Auth';
import { RecipeVideos, RecipeCalendar, RecipeEdit, RecipeList, FavoriteRecipes,AutoMakeRecipeCalendar, RecipeFromIngredients } from './components/recipes/index';
import { RecipeBot, AiRecommendedRecipe } from './components/recipes/bot/index';
import { IngredientsList, IngredientsEdit, SearchIngredientsList } from './components/ingredients/index';
// import Auth from "./Auth";


const Router = () => {
    return(
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signin/reset"} component={Reset} />
            <Auth>
                <Route exact path={"/ingredients/list"} component={IngredientsList} />
                <Route exact path={"/recipe/search/ingredients"} component={SearchIngredientsList} />
                {/* <Route exact path={"/ingredients/search"} component={SearchIngredientsList} /> */}
                <Route path={"/ingredients/edit(/:id)?"} component={IngredientsEdit} />
                
                <Route exact path={"(/)?"} component={RecipeList} />
                <Route exact path={"/profile"} component={UserProfile} />
                <Route path={"/recipe/calendar(/:id)?"} component={RecipeCalendar} />
                <Route exact path={"/recipe/auto"} component={AutoMakeRecipeCalendar} />
                <Route exact path={"/recipe/video"} component={RecipeVideos} />
                <Route path={"/recipe/edit(/:id)?"} component={RecipeEdit} />
                <Route exact path={"/recipe/favorite"} component={FavoriteRecipes} />
                <Route exact path={"/recipe/bot"} component={RecipeBot} />
                <Route exact path={"/recipe/bot/recommend"} component={AiRecommendedRecipe} />
                <Route exact path={"/recipe/search/ingredients/result"} component={RecipeFromIngredients} />
                <Route path={"/recipe/detail(/:id)?"} component={RecipeDetail} />
                <Route exact path={"/contact"} component={Contact} />
            </Auth>
        </Switch>
    )
}
export default Router