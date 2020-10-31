import * as Actions from './actions';
import initialState from '../store/initialState';

export const RecipesReducer = (state = initialState.recipes, action)  => {
    switch (action.type) {
        case Actions.FETCH_RECOMMENDED_RECIPE:
            return {
                ...state,
                list: [...action.payload]
            }
        case Actions.DELETE_RECOMMENDED_RECIPE:
            return {
                ...state,
                list: [...action.payload]
            }
        case Actions.SEARCH_INGREDIENTS:
            return {
                ...state,
                selectedIngredients: [...action.payload] 
            }
        default:
            return state
    }
};

