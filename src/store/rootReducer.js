import { applyMiddleware, combineReducers, compose } from 'redux'
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/user.reducer.js'
import { reservationReducer } from './reducers/reservation.reducer.js'

const rootReducer = combineReducers({
    userModule: userReducer,
    reservationModule: reservationReducer,
 })

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
 export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
