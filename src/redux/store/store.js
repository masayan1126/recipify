import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
// import { createLogger } from 'redux-logger'
// import thunk from 'redux-thunk';
import {connectRouter, routerMiddleware} from 'connected-react-router'

import {UsersReducer} from '../users/reducers';
import {RecipesReducer } from '../recipes/reducers';
import {IngredientsReducer} from '../ingredients/reducers';
import {CalendarReducer} from '../calendar/reducers';
import thunk from 'redux-thunk';

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            calendar: CalendarReducer,
            recipes: RecipesReducer,
            ingredients: IngredientsReducer,
            router: connectRouter(history),
            users: UsersReducer,
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}
