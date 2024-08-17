import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_USER,
  LOGOUT_SUCCESS,
} from "../actions/authActions";

const initialState = {
  isLoggedIn: false,
  error: null,
  user: {},
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoading: true, // Set loading to true when login starts
      };
    case "LOGIN_REQUEST_FINISH":
      return {
        ...state,
        isLoading: false, // Set loading to false after login completes
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        error: null, // Clear any error on successful login
        user: action.payload, // Store the user details
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: {}, // Clear user data on logout
        error: null, // Optionally clear any errors on logout
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload, // Store the error
        user: {}, // Clear user data on login failure
      };
    case LOAD_USER:
      return {
        ...state,
        isLoggedIn: true, // Mark as logged in if the user is loaded
        user: action.payload, // Store the user details from session
        error: null, // Clear any previous error
      };
    default:
      return state;
  }
};

export default authReducer;

// import {
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   LOAD_USER,
//   LOGOUT_SUCCESS,
// } from "../actions/authActions";

// const initialState = {
//   isLoggedIn: false,
//   error: null,
//   user:{},
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isLoggedIn: true,
//         error: null,
//         loggedinDetail: action.payload,
//       };
//     case LOGOUT_SUCCESS:
//       return {
//         ...state,
//         isLoggedIn: false,
//         loggedinDetail: {},
//       };
//     case LOGIN_FAILURE:
//       return {
//         ...state,
//         isLoggedIn: false,
//         error: action.payload,
//         loggedinDetail: {},
//       };
//     case LOAD_USER:
//       return {
//         ...state,
//         isLoggedIn: true,
//         loggedinDetail: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;
