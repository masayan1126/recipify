import { createSelector } from "reselect";

const recipesSelector = (state) => state.recipes;
const favoriteRecipesSelector = (state) => state.favoriteRecipes;
// const calendarSelector = (state) => state.calendar;

export const getRecipes = createSelector(
    [recipesSelector],
    state => state.list
);

// export const getFavoriteRecipes = createSelector(
//     [favoriteRecipesSelector],
//     state => state.list
// );

// export const getCalendar = createSelector(
//     [calendarSelector],
//     state => state.list
// );

