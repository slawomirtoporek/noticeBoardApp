/* SELECTORS */
export const getUser = ({ user }) => user ? user.data : null;

/* ACTIONS */

// action name creator
const reducerName = 'auth';
const createActionName = name => `app/${reducerName}/${name}`;

/* INITIAL STATE */

const initialState = {
  data: [],
  requests: [],
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}