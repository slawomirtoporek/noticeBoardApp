import { API_URL } from "../config";

/* ACTIONS */
export const getAds = ({ ads }) => ads.data;
export const getAdById = ({ ads }, id) => 
  ads && Array.isArray(ads.data)
  ? ads.data.find((ad) => ad._id === id)
  : null;
export const getAdsError = ({ ads }) => ads.error;

// action name creator
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

export const LOAD_ADS = createActionName("LOAD_ADS");
export const ADD_AD = createActionName("ADD_AD");
export const EDIT_AD = createActionName("EDIT_AD");
export const DELETE_AD = createActionName("DELETE_AD");
export const ERROR = createActionName("ERROR");

export const loadAds = (payload) => ({ type: LOAD_ADS, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const deleteAdAction = (id) => ({ type: DELETE_AD, payload: id });
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

      if (Array.isArray(res)) {
        dispatch(loadAds(res));
      } else if (res.data && Array.isArray(res.data)) {
        dispatch(loadAds(res.data));
      } else {
        dispatch(setError('Unexpected response structure'));
      }
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData.message || 'Failed to load ads'));
    }
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const getAdByIdDetails = (id) => async (dispatch) => {

  const options = {
    method: 'GET'
  };

  try {
    const response = await fetch(`${API_URL}/api/ads/${id}`, options);

    if (response.ok) {
      dispatch(deleteAdAction(id));
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData.message || 'Failed to load ads'));
    }
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const deleteAd = (id) => async (dispatch) => {

  const options = {
    method: 'DELETE'
  };

  try {
    const response = await fetch(`${API_URL}/api/ads/${id}`, options);

    if (response.ok) {
      const data = await response.json();
      dispatch(loadAds(data));
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
    body: ad,
    credentials: 'include'
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
    body: ad,
    credentials: 'include'
  };

  try {
    const response = await fetch(`${API_URL}/api/ads/${id}`, options);
    if (response.ok) {
      const data = await response.json();
      dispatch(editAd(data));
      dispatch(fetchAds());
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData.message || 'Failed to update ad'));
    }
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const getAdsBySearch = (searchPhrase) => async (dispatch) => {
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(`${API_URL}/api/ads/search/${encodeURIComponent(searchPhrase)}`, options);

    if (response.ok) {
      const data = await response.json();
      dispatch(loadAds(data));
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData.message || 'Failed to fetch ads'));
    }
  } catch (e) {
    dispatch(setError(e.message));
  }
};

/* REDUCER */

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_AD:
      return { ...statePart, data: [...statePart.data, action.payload], error: null };
    case EDIT_AD:
      return { ...statePart, data: statePart.data.map(ad => ad._id === action.payload._id ? action.payload : ad), error: null };
    case LOAD_ADS:
      return { ...statePart, data: action.payload, error: null };
    case DELETE_AD:
      return { ...statePart, data: statePart.data.filter(ad => ad._id !== action.payload), error: null };
    case ERROR:
      return { ...statePart, error: action.payload };
    default:
      return statePart;
  }
};

export default adsReducer;