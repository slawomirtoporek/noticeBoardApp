import { API_URL } from "../config";

/* SELECTORS */
export const getUser = ({ user }) => user ? user.data : null;
export const getUserError = ({ user }) => user.error;

/* ACTIONS */

// action name creator
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');
const SET_ERROR = createActionName("SET_ERROR");

export const logIn = payload => ({
  type: LOG_IN,
  payload
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const setError = (payload) => ({ type: SET_ERROR, payload });

/* THUNKS */

export const checkLoggedUser = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/auth/user`, {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(logIn({ login: data.login }));
      } else {
        dispatch(logOut());
      };
    } catch (e) {
      console.log("error ", e);
      dispatch(logOut());
    }
  };
};

/* REDUCER */

const usersReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...statePart, data: action.payload, error: null };
      case LOG_OUT:
        return { ...statePart, data: null, error: null };
      case SET_ERROR:
        return { ...statePart, error: action.payload };
    default:
      return statePart;
  }
};

export default usersReducer;