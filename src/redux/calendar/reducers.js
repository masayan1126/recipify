import * as Actions from './actions';
import initialState from '../store/initialState';

export const CalendarReducer = (state = initialState.calendar, action)  => {
    switch (action.type) {
        case Actions.FETCH_CALENDAR:
            return {
                ...state,
                list: [...action.payload] 
            }
        default:
            return state
    }
};