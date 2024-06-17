/* ACTIONS */

// action name creator
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

/* REDUCER */

const adsReducer = (statePart = null, action) => {
  switch (action.type) {
    default:
      return statePart;
  }
};

export default adsReducer;