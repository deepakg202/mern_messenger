import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { sessionReducer } from "../reducers/sessionReducers";

let initialstate = {}

const reducer = combineReducers({
  session: sessionReducer,
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialstate,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
