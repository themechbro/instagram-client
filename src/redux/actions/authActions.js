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
      console.log("Attempting to log in", { username, password });
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          username: username,
          password,
        },
        { withCredentials: true }
      );

      console.log("Login response:", response);

      if (response.status === 200) {
        const { username, email, id } = response.data.user;
        const { token } = response.data;
        localStorage.setItem("token", token);
        dispatch(loginSuccess(username, id, email));
      } else {
        dispatch(loginFailure("Login failed"));
      }
    } catch (error) {
      console.error("Error during login:", error);
      dispatch(loginFailure(error.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
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
        const response = await axios.get("http://localhost:3001/verifyToken", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const { username } = response.data;
          dispatch(loadUser({ username }));
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
      }
    }
  };
};
