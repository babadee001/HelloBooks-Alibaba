import axios from 'axios';
import dotenv from 'dotenv';
import swal from 'sweetalert';
import 'whatwg-fetch';
import { browserHistory } from 'react-router';
import notifyNetworkError from '../utils/notifyNetworkError';

import {
  GET_ALL_BOOKS,
  DELETE_BOOK,
  EDIT_BOOK,
  ADD_BOOK,
  RETURN_BOOK,
  GET_BORROWED_HISTORY,
  GET_ALL_TIME_BORROWED,
  ADD_CATEGORY,
  GET_CATEGORY
} from './types';
import { isFetching } from './AuthActions';

dotenv.load();


export const deleteBook = bookId =>
  ({
    type: DELETE_BOOK,
    data: bookId
  });

export const borrowAlert = bookId =>
  ({
    type: DELETE_BOOK,
    data: bookId
  });


/**
 * @description - Get all books action
 *
 * @returns { Object } - Object containing book data
 */
export const getBooks = () => async (dispatch) => {
  dispatch(isFetching(true));
  const serverResponse = await fetch('/api/v1/books', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      xaccesstoken: localStorage.token
    },
  }).catch((error) => {
    if (error.data) {
      swal(error.data.message);
    } else {
      notifyNetworkError(error);
    }
  });
  const jsonServerResponse = await serverResponse.json()
    .then(jsonData => jsonData);
  if (serverResponse.status === 200) {
    dispatch({
      type: GET_ALL_BOOKS,
      data: jsonServerResponse
    });
    dispatch(isFetching(false));
    return jsonServerResponse;
  }
};


/**
 * @description - Get borrowed history action
 *
 * @param {  Number } userId - User ID
 *
 * @returns { Object } - Object of all books borrowed, returned & unreturned
 */
export const getHistory = userId => async (dispatch) => {
  dispatch(isFetching(true));
  const serverResponse = await fetch(`/api/v1/users/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      xaccesstoken: localStorage.token
    },
  }).catch((error) => {
    if (error.data) {
      swal(error.data.message);
    } else {
      notifyNetworkError(error);
    }
  });
  const jsonServerResponse = await serverResponse.json()
    .then(jsonData => jsonData);
  if (serverResponse.status === 200) {
    dispatch({
      type: GET_BORROWED_HISTORY,
      data: jsonServerResponse
    });
    dispatch(isFetching(false));
    return jsonServerResponse;
  }
};

/**
 * @description - Modify book action
 *
 * @param {Object} details - Object containing details of the book
 * @param {bookId} bookId - ID of book to be modified
 *
 * @returns { String } - Message from API
 */
export function editBook(details, bookId) {
  return async (dispatch) => {
    const serverResponse = await fetch(`/api/v1/books/${bookId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        xaccesstoken: localStorage.token
      },
      body: JSON.stringify(details)
    }).catch((error) => {
      if (error.data) {
        swal(error.data.message);
      } else {
        notifyNetworkError(error);
      }
    });
    const jsonServerResponse = await serverResponse.json()
      .then(jsonData => jsonData);
    if (serverResponse.status === 200) {
      dispatch({
        type: EDIT_BOOK,
        data: jsonServerResponse.book
      });
      return jsonServerResponse.message;
    }
    swal(jsonServerResponse.message);
  };
}

/**
 * @description - Borrow book action
 *
 * @param { Number } userId - ID of user to borrow book
 * @param { Number } bookId - ID of book to be borrowed
 *
 * @returns { String } - String
 */
export function borrowBook(userId, bookId) {
  const currentDate = new Date(),
    after30days = currentDate.setDate(currentDate.getDate() + 20),
    deadline = new Date(after30days);
  swal({
    title: 'Are you sure?',
    text: `You are required to return this book on or before ${deadline}`,
    icon: 'warning',
    buttons: true,
    dangerMode: true
  }).then((willBorrow) => {
    if (willBorrow) {
      return axios.post(`api/v1/users/${userId}/books/${bookId.bookId}`)
        .then((res) => {
          const message = res.data.message;
          if (res) {
            swal(message, { icon: 'success' });
          }
        }).catch((error) => {
          if (error.data) {
            swal(error.data.message);
          } else {
            notifyNetworkError(error);
            throw error;
          }
        });
    }
  });
}

/**
 * @description - Return books action
 *
 * @param {  Number } userId - ID of user to return book
 * @param { Number } bookId - ID of book to be returned
 *
 * @returns { Object } - Object containing rented books
 */
export function returnBook(userId, bookId) {
  return async (dispatch) => {
    const serverResponse = await
      fetch(`/api/v1/users/${userId}/books/${bookId.bookId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          xaccesstoken: localStorage.token
        },
      }).catch((error) => {
        if (error.data) {
          swal(error.data.message);
        } else {
          notifyNetworkError(error);
        }
      });
    const jsonServerResponse = await serverResponse.json()
      .then(jsonData => jsonData);
    if (serverResponse.status === 201) {
      console.log(jsonServerResponse);
      dispatch({
        type: RETURN_BOOK,
        data: jsonServerResponse.book
      });
      swal(jsonServerResponse.message, { icon: 'success' });
    } else {
      swal(jsonServerResponse.message);
    }
  };
}

/**
 * @description - Add new book action
 *
 * @param {Object} bookDetails - Object containing book data
 *
 * @returns { Object } - Redux action to be dispatched to the store
 */
export function addBookAction(bookDetails) {
  return async (dispatch) => {
    const serverResponse = await fetch('/api/v1/books', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        xaccesstoken: localStorage.token
      },
      body: JSON.stringify(bookDetails)
    }).catch((error) => {
      if (error.data) {
        swal(error.data.message);
      } else {
        notifyNetworkError(error);
      }
    });
    const jsonServerResponse = await serverResponse.json()
      .then(jsonData => jsonData);
    if (serverResponse.status === 201) {
      dispatch({
        type: ADD_BOOK,
        message: jsonServerResponse.message
      });
      browserHistory.push('/admin');
      Materialize.toast('Book added Successfully', 2000, 'teal');
    } else {
      swal(jsonServerResponse.message);
    }
  };
}


/**
 * @description - Delete book action
 *
 * @param {Number} bookId - Book ID
 *
 * @returns { String } - string containing API message
 */
export function deleteBookAction(bookId) {
  return async (dispatch) => {
    const serverResponse = await fetch(`/api/v1/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        xaccesstoken: localStorage.token
      }
    }).catch((error) => {
      if (error.data) {
        Materialize.toast(error.data.message,
          4000,
          'red');
      } else {
        notifyNetworkError(error);
        dispatch(isFetching(false));
      }
    });
    const jsonServerResponse = await serverResponse.json()
      .then(jsonData => jsonData);
    if (serverResponse.status === 200) {
      dispatch(deleteBook(Number(jsonServerResponse.id)));
    }
    Materialize.toast(jsonServerResponse.message, 1000);
  };
}


/**
 * @description - Get all borrowed books in the application action
 *
 * @returns { Object } - Object of all time borrowed books,returned & unreturned
 */
export function getAllBorrowed() {
  return dispatch => axios.get('api/v1/books/borrowed')
    .then((res) => {
      dispatch({
        type: GET_ALL_TIME_BORROWED,
        data: res.data
      });
      return res.data;
    })
    .catch((error) => {
      if (error.data) {
        swal(error.data.message);
      } else {
        notifyNetworkError(error);
      }
    });
}

/**
 * @description - Add category action
 *
 * @param { Object } data - New category data
 *
 * @returns { String } - Message from the API
 */
export function addCategoryAction(data) {
  return async (dispatch) => {
    const serverResponse = await fetch('/api/v1/books/category', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        xaccesstoken: localStorage.token
      },
      body: JSON.stringify(data)
    }).catch((error) => {
      if (error.data) {
        swal(error.data.message);
      } else {
        notifyNetworkError(error);
      }
    });
    const jsonServerResponse = await serverResponse.json()
      .then(jsonData => jsonData);
    if (serverResponse.status === 201) {
      dispatch({
        type: ADD_CATEGORY,
        data: jsonServerResponse.newCategory
      });
      Materialize.toast('Category added successfully', 2000, 'teal');
    } else {
      swal(jsonServerResponse.message);
    }
  };
}

/**
 * @description - Get all category action
 *
 * @returns { Object } - Object containg all categories
 */
export function getCategoryAction() {
  return async (dispatch) => {
    const serverResponse = await fetch('/api/v1/books/category', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        xaccesstoken: localStorage.token
      },
    }).catch((error) => {
      if (error.data) {
        swal(error.data.message);
      } else {
        notifyNetworkError(error);
      }
    });
    const jsonServerResponse = await serverResponse.json()
      .then(jsonData => jsonData);
    if (serverResponse.status === 200) {
      dispatch({
        type: GET_CATEGORY,
        data: jsonServerResponse
      });
      return jsonServerResponse.message;
    }
  };
}
