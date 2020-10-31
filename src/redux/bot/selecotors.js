import { createSelector } from "reselect";

const botRecipeSelector = (state) => state.results;

export const getBotResult = createSelector(
    [botRecipeSelector],
    state => state.list
);

