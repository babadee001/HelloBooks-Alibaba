import {
  SET_CURRENT_USER, UNAUTH_USER, GET_ALL_USERS, SET_API_STATUS, EDIT_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  user: {},
  content: '',
  isFetching: false,
  authenticated: false,
  data: ''
};

/**
 * @description - User authentication reducer
 *
 * @param {Object} state - Default application state
 *
 * @param {Object} action - Response from the API
 *
 * @returns {Object} - Object containing new state
 */
function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNAUTH_USER:
      return {
        ...state, message: 'Successfully Logged Out', authenticated: false
      };
    case SET_CURRENT_USER:
      return { ...state, user: action.user, authenticated: true };
    case GET_ALL_USERS:
      return { ...state, data: action.data };
    case SET_API_STATUS:
      return { ...state, isFetching: action.isFetching };
    case EDIT_PROFILE:
      return { ...state, authenticated: false };
    default:
      return state;
  }
}

export default authReducer;

