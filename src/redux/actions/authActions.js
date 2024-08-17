import axios from "axios";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOAD_USER = "LOAD_USER";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const loginSuccess = (userDetails) => ({
  type: LOGIN_SUCCESS,
  payload: userDetails,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const loadUser = (userDetails) => ({
  type: LOAD_USER,
  payload: userDetails,
});

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" }); // Set loading state

      const response = await axios.post(
        "http://localhost:3001/login",
        {
          username: username,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { id, username, email } = response.data.user;

        // Dispatch login success with user details
        dispatch(loginSuccess({ username, id, email }));
        const { token } = response.data;
        localStorage.setItem("token", token);

        // Stop loading
        dispatch({ type: "LOGIN_REQUEST_FINISH" });
      } else {
        dispatch(loginFailure("Login failed"));
        dispatch({ type: "LOGIN_REQUEST_FINISH" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      dispatch(loginFailure(error.message));
      dispatch({ type: "LOGIN_REQUEST_FINISH" });
    }
  };
};

// export const loginUser = (username, password) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/login",
//         {
//           username: username,
//           password,
//         },
//         { withCredentials: true }
//       );

//       if (response.status === 200) {
//         const { id, username, email } = response.data.user;

//         dispatch(loginSuccess(username, id, email));
//         const { token } = response.data;
//         localStorage.setItem("token", token);
//       } else {
//         dispatch(loginFailure("Login failed"));
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       dispatch(loginFailure(error.message));
//     }
//   };
// };

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const checkAuthStatus = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Check the session status using the stored token
        const response = await axios.get(
          "http://localhost:3001/check-session",
          {
            headers: { Authorization: `Bearer ${token}` }, // Pass token in the request header
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const { username, email, id } = response.data.user;
          dispatch(loadUser({ username, email, id }));
        } else {
          // If session is invalid, remove token and log out
          localStorage.removeItem("token");
          dispatch(logoutSuccess());
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        localStorage.removeItem("token"); // Clear token on error
        dispatch(logoutSuccess());
      }
    } else {
      dispatch(logoutSuccess()); // No token, so log out
    }
  };
};

// export const checkAuthStatus = () => {
//   return async (dispatch) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/check-session",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         if (response.status === 200) {
//           const { username, email, id } = response.data.user;
//           dispatch(loadUser({ username, email, id }));
//         }
//       } catch (error) {
//         console.error("Error verifying token:", error);
//         localStorage.removeItem("token");
//       }
//     }
//   };
// };
