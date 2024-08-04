import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./redux/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;
