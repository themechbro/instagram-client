import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_USER,
  LOGOUT_SUCCESS,
} from "../actions/authActions";

const initialState = {
  isLoggedIn: false,
  error: null,
  loggedinDetail: {},
};

const authReducer = (state = initialState, action) => {
  console.log("Reducer received action:", action);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: null,
        loggedinDetail: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        loggedinDetail: {},
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload,
        loggedinDetail: {},
      };
    case LOAD_USER:
      return {
        ...state,
        isLoggedIn: true,
        loggedinDetail: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
