import axios from 'axios';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
import setAuthorizationToken from '../utils/setAuthorization';
import notifyNetworkError from '../utils/notifyNetworkError';
import {
  SET_CURRENT_USER,
  UNAUTH_USER,
  GET_ALL_USERS,
  SET_API_STATUS,
  EDIT_PROFILE,
  GET_ALL_BOOKS
} from './types';

/**
 * @description -  Sets API status
 *
 * @export { Function } - Set API Progress
 *
 * @param { Boolean } status - User object
 *
 * @returns {  Object } - Action
 */
export function isFetching(status) {
  return {
    type: SET_API_STATUS,
    isFetching: status
  };
}

/**
 * @description - Set current user
 *
 * @param {Object} currentUser - Decoded JWT Token
 *
 * @returns {Object} - redux action to be dispatched
 */
export function setCurrentUser(currentUser) {
  return {
    type: SET_CURRENT_USER,
    user: currentUser,
    authenticated: true
  };
}

/**
 *
 * @description - Register new user action
 *
 * @param {Object} userData - Object containing user details
 *
 * @returns { Object } - Dispatches user object to the store
 */
export const userSignupRequest = userData => async (dispatch) => {
  dispatch(isFetching(true));
  const serverResponse = await fetch('api/v1/users/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      xaccesstoken: localStorage.token
    },
    body: JSON.stringify(userData)
  }).catch((error) => {
    if (error.response) {
      Materialize.toast(error.response.data.message);
    } else {
      notifyNetworkError(error);
      dispatch(isFetching(false));
      throw error;
    }
  });
  const jsonServerResponse = await serverResponse.json()
    .then(jsonData => jsonData);
  dispatch(isFetching(false));
  if (serverResponse.status === 201) {
    localStorage.setItem('token', jsonServerResponse.Token);
    setAuthorizationToken(jsonServerResponse.Token);
    const decoded = jwt.decode(jsonServerResponse.Token);
    dispatch(setCurrentUser(decoded));
    if (decoded.currentUser.isAdmin === 1) {
      Materialize.toast('Signed up Successfully', 1000,
        'teal',
        () => {
          browserHistory.push('/admin');
        }
      );
    } else {
      Materialize.toast('Signed up Successfully', 1000,
        'teal',
        () => {
          browserHistory.push('/dashboard');
        }
      );
    }
  } else {
    Materialize.toast(jsonServerResponse.message, 4000, 'red');
  }
};


/**
 * @description - Signin user action
 *
 * @param {Object} userData - Object containing user details
 *
 * @returns { Object } - Dispatches user object to the store
 */
export const userSigninRequest = userData => async (dispatch) => {
  dispatch(isFetching(true));
  const serverResponse = await fetch('api/v1/users/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      xaccesstoken: localStorage.token
    },
    body: JSON.stringify(userData)
  }).catch((error) => {
    if (error.response) {
      Materialize.toast(error.response.data.message);
    } else {
      notifyNetworkError(error);
      dispatch(isFetching(false));
      throw error;
    }
  });
  const jsonServerResponse = await serverResponse.json()
    .then(jsonData => jsonData);
  dispatch(isFetching(false));
  if (serverResponse.status === 200) {
    localStorage.setItem('token', jsonServerResponse.Token);
    setAuthorizationToken(jsonServerResponse.Token);
    const decoded = jwt.decode(jsonServerResponse.Token);
    dispatch(setCurrentUser(decoded));
    if (decoded.currentUser.isAdmin === 1) {
      Materialize.toast('Logged In Successfully', 1000,
        'teal',
        () => {
          browserHistory.push('/admin');
        }
      );
    } else {
      Materialize.toast('Logged In Successfully', 1000,
        'teal',
        () => {
          browserHistory.push('/dashboard');
        }
      );
    }
  } else {
    Materialize.toast(jsonServerResponse.message, 4000, 'red');
  }
};

/**
 * @description - Unauthenticate user action
 *
 * @returns { Object } - Dispatches user object to the store
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch({
      type: UNAUTH_USER,
      user: {},
      authenticated: false
    });
    browserHistory.push('/');
  };
}

/**
 *
 * @description - Get all users action
 *
 * @returns { Object } - Dispatches user object to the store
 */
export function getUsers() {
  return dispatch => axios.get('api/v1/users')
    .then((res) => {
      dispatch({
        type: GET_ALL_USERS,
        data: res.data
      });
      return res.data;
    })
    .catch(error => (error.response ?
      error.response.data.message :
      notifyNetworkError(error)));
}

/**
 *
 * @description -Authenticate users through google action
 *
 * @param {Object} token - token containing user details
 *
 * @returns { Object } - Dispatches user object to the store
 */
export const googleSigninRequest = token => (dispatch) => {
  localStorage.setItem('token', token);
  setAuthorizationToken(token);
  const decoded = jwt.decode(token);
  dispatch(setCurrentUser(decoded));
  Materialize.toast('Logged In Successfully', 1000,
    'teal',
    () => {
      browserHistory.push('/dashboard');
    }
  );
};

/**
 * @description - Edit profile action
 *
 * @param {Number} userId - User ID
 *
 * @param {Object} userData - User data object
 *
 * @returns { String } - JWT Token
 */
export function editProfileAction(userId, userData) {
  return dispatch => axios.put(`api/v1/users/edit/${userId}`, userData)
    .then((response) => {
      dispatch({
        type: EDIT_PROFILE
      });
      Materialize.toast(
        response.data.message,
        1000, 'teal', () => {
          localStorage.removeItem('token');
          setAuthorizationToken(false);
          browserHistory.push('/signin');
        }
      );
      return response.data.message;
    })
    .catch((error) => {
      dispatch(isFetching(false));
      notifyNetworkError(error);
    });
}
