import { API_URL } from "../config";

/* ACTIONS */
export const getUser = (state) => state.user ? state.user.data : null;
export const getAdById = ({ ads }, id) => 
  ads && Array.isArray(ads.data)
  ? ads.data.find((ad) => ad._id === id)
  : null;

// action name creator
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

export const LOAD_ADS = createActionName("LOAD_ADS");
export const ADD_AD = createActionName("ADD_AD");
export const EDIT_AD = createActionName("EDIT_AD");
export const ERROR = createActionName("ERROR");

export const loadAds = (payload) => ({ type: LOAD_ADS, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const setError = (payload) => ({ type: ERROR, payload });

/* THUNKS */

export const fetchAds = () => async (dispatch) => {

  const options = {
    method: 'GET'
  };

  try {
    const response = await fetch(`${API_URL}/api/ads`, options);

    if (response.ok) {
      const res = await response.json();
      dispatch(loadAds(res.data));
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData.message || 'Failed to load ads'));
    }
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const addAdRequest = (ad) => async (dispatch) => {

  const options = {
    method: 'POST',
    body: ad
  };

  try {
    const response = await fetch(`${API_URL}/api/ads`, options);

    if (response.ok) {
      dispatch(fetchAds());
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData.message || 'Failed to create ad'));
    }
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const editAdRequest = (ad, id) => async (dispatch) => {

  const options = {
    method: 'PUT',
    body: ad
  };

  try {
    const response = await fetch(`${API_URL}/api/ads/${id}`, options);
    if (response.ok) {
      dispatch(fetchAds());
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData.message || 'Failed to update ad'));
    }
  } catch (e) {
    dispatch(setError(e.message));
  }
};


/* REDUCER */

const initialState = {
  data: [],
  error: null
};

const adsReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case ADD_AD:
      return { ...statePart, data: [...statePart.data, action.payload], error: null };
    case EDIT_AD:
      return { ...statePart, data: statePart.data.map(ad => ad._id === action.payload._id ? action.payload : ad)};
    case LOAD_ADS:
      return { ...statePart, data: action.payload, error: null };
    case ERROR:
      return { ...statePart, error: action.payload };
    default:
      return statePart;
  }
};

export default adsReducer;