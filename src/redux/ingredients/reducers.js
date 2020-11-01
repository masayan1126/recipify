import * as Actions from './actions';
import initialState from '../store/initialState';

export const IngredientsReducer = (state = initialState.ingredients, action)  => {
    switch (action.type) {
        case Actions.FETCH_INGREDIENTS:
            return {
                ...state,
                list: [...action.payload]
            }
        case Actions.DELETE_INGREDIENTS:
            return {
                ...state,
                list: [...action.payload]
            }
        default:
            return state
    }
};