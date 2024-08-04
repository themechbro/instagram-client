import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
});

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// export default rootReducer;
