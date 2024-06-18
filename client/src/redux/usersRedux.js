import { API_URL } from "../config";

/* SELECTORS */
export const getUser = ({ user }) => user ? user.data : null;

/* ACTIONS */

// action name creator
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

const LOG_IN = createActionName('LOG_IN');

export const logIn = payload => ({
  type: LOG_IN,
  payload
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
      };
    } catch (e) {
      console.log("error ", e);
    }
  };
};

/* REDUCER */

const usersReducer = (statePart = null, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    default:
      return statePart;
  }
};

export default usersReducer;