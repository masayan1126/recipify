export const FETCH_RECOMMENDED_RECIPE = "FETCH_RECOMMENDED_RECIPE";
export const fetchRecommendedRecipeAction = (recipes) => {
    return {
        type: "FETCH_RECOMMENDED_RECIPE",
        payload: recipes,
    }
};

export const FETCH_SEARCH_RECIPE = "FETCH_SEARCH_RECIPE";
export const fetchSearchRecipeAction = (recipes) => {
    return {
        type: "FETCH_SEARCH_RECIPE",
        payload: recipes,
    }
};



export const SEARCH_INGREDIENTS = "SEARCH_INGREDIENTS";
export const searchFromIngredientsAction = (selectedIngredients) => {
    
    return {
        type: "SEARCH_INGREDIENTS",
        payload: selectedIngredients,
    }
};

export const DELETE_RECOMMENDED_RECIPE = "DELETE_RECOMMENDED_RECIPE";
export const deleteRecommendedRecipeAction = (recipes) => {
    return {
        type: "DELETE_RECOMMENDED_RECIPE",
        payload: recipes,
    }
};
