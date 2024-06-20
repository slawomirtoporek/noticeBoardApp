import { API_URL } from "../config";

/* SELECTORS */
export const getUser = ({ user }) => user ? user.data : null;

/* ACTIONS */

// action name creator
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

export const logIn = payload => ({
  type: LOG_IN,
  payload
});

export const logOut = () => ({
  type: LOG_OUT,
});

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
        dispatch(logIn({ id: data._id, login: data.login }));
      }  else {
        dispatch(logOut());
      };
    } catch (e) {
      console.log("error ", e);
    }
  };
};

/* REDUCER */

const usersReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...statePart, data: action.payload };
    case LOG_OUT:
      return { ...statePart, data: null };
    default:
      return statePart;
  }
};

export default usersReducer;