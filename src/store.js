import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";

import { userReducer } from "./ducks/userReducer";

const root = combineReducers({
  user: userReducer
});

export default createStore(root, applyMiddleware(promise));
