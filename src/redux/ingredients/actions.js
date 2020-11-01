export const FETCH_INGREDIENTS = "FETCH_INGREDIENTS";
export const fetchIngredientsAction = (ingredientsList) => {
    return {
        type: "FETCH_INGREDIENTS",
        payload: ingredientsList,
    }
};

export const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";
export const deleteIngredientsAction = (nextIngredients) => {
    return {
        type: "DELETE_INGREDIENTS",
        payload: nextIngredients,
    }
};
