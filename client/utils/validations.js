import axios from 'axios';
import notifyNetworkError from './notifyNetworkError';

/**
 * @description - Check if user details exists
 *
 * @param {object} userData - user details
 *
 * @returns {object} - String
 */
export function checkExisting(userData) {
  return axios
    .post('api/v1/users/existing', userData)
    .then((response) => {
      if (response.data.message !== null) {
        return response.data.message;
      }
      return 'Not found';
    })
    .catch(error => (error.response ?
      error.response.data.message :
      notifyNetworkError(error)));
}

/**
 * @description - Check if username exists
 *
 * @param {object} userData - user details
 *
 * @returns {object} - String
 */
export function checkUser(userData) {
  return axios
    .post('api/v1/users/checkuser', userData)
    .then((response) => {
      if (response.data.message && response.data.message.username !== userData.searchTerm) {
        return 'Existing username';
      }
      return 'Not found';
    })
    .catch(error => (error.response ?
      error.response.data.message :
      notifyNetworkError(error)));
}

/**
* @description - Destructure API response from google to retrieve necessary data
*
* @param {Object} obj - Object from Google API
*
* @returns {Object} - string
*/
export function getDetails(obj) {
  const mainUserObject = {
    currentUser: {}
  };
  const username = obj.name.toLowerCase()
    .replace(/[\s]/, '_') + Math.round(Math.random(1998) * 56);
  mainUserObject.currentUser.username = username;
  mainUserObject.currentUser.membership = 'googleSilver';
  mainUserObject.currentUser.password = username;
  mainUserObject.currentUser.email = obj.email;
  return mainUserObject;
}

