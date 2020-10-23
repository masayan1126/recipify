export const FETCH_INGREDIENTS = "FETCH_INGREDIENTS";
export const fetchIngredientsAction = (ingredients) => {
    return {
        type: "FETCH_INGREDIENTS",
        payload: ingredients,
    }
};
