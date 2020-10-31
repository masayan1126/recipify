export const FETCH_RECOMMENDED_RECIPE = "FETCH_RECOMMENDED_RECIPE";
export const fetchRecommendedRecipeAction = (recipes) => {
    return {
        type: "FETCH_RECOMMENDED_RECIPE",
        payload: recipes,
    }
};



export const ADD_BOT_RESULT_ACTION = "ADD_BOT_RESULT_ACTION";
export const addBotResultAction = (results) => {
    return {
        type: "ADD_BOT_RESULT_ACTION",
        payload: results,
    }
};

export const DELETE_RECOMMENDED_RECIPE = "DELETE_RECOMMENDED_RECIPE";
export const deleteRecommendedRecipeAction = (recipes) => {
    return {
        type: "DELETE_RECOMMENDED_RECIPE",
        payload: recipes,
    }
};
