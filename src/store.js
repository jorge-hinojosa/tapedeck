import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";

import { userReducer } from "./ducks/userReducer";
import { projectReducer } from "./ducks/projectReducer";

const root = combineReducers({
  user: userReducer,
  projects: projectReducer
});

export default createStore(root, applyMiddleware(promise));
