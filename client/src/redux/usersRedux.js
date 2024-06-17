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