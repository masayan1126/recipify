import { createSelector } from "reselect";

const ingredientsSelector = (state) => state.ingredients;

export const getIngredients = createSelector(
    [ingredientsSelector],
    state => state.list
);