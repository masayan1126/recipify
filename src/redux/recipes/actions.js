export const FETCH_RECOMMENDED_RECIPE = "FETCH_RECOMMENDED_RECIPE";
export const fetchRecommendedRecipeAction = (recipes) => {
    return {
        type: "FETCH_RECOMMENDED_RECIPE",
        payload: recipes,
    }
};

// export const FETCH_CALENDAR = "FETCH_CALENDAR";
// export const fetchCalendarAction = (calendar) => {
//     return {
//         type: "FETCH_CALENDAR",
//         payload: calendar,
//     }
// };

export const DELETE_RECOMMENDED_RECIPE = "DELETE_RECOMMENDED_RECIPE";
export const deleteRecommendedRecipeAction = (recipes) => {
    return {
        type: "DELETE_RECOMMENDED_RECIPE",
        payload: recipes,
    }
};
