import { createSelector } from "reselect";

const recipesSelector = (state) => state.recipes;
// const selectedIngredientsSelector = (state) => state.selectedIngredients;
// const calendarSelector = (state) => state.calendar;

export const getRecipes = createSelector(
    [recipesSelector],
    state => state.list
);

export const getSelectedIngredients = createSelector(
    [recipesSelector],
    state => state.selectedIngredients
);

export const getsearchRecipeList = createSelector(
    [recipesSelector],
    state => state.searchRecipeList
);

// export const getFavoriteRecipes = createSelector(
//     [favoriteRecipesSelector],
//     state => state.list
// );

// export const getCalendar = createSelector(
//     [calendarSelector],
//     state => state.list
// );

