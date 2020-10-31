import * as Actions from './actions';
import initialState from '../store/initialState';

export const RecipeBotReducer = (state = initialState.results, action)  => {
    switch (action.type) {
        case Actions.ADD_BOT_RESULT_ACTION:
            return {
                ...state,
                list: [...action.payload]
            }

        // case Actions.FETCH_CALENDAR:
        //     return {
        //         ...state,
        //         list: [...action.payload] 
        //     }
        default:
            return state
    }
};

