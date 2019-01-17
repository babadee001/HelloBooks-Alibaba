import {
  GET_ALL_BOOKS,
  GET_UNRETURNED_BOOKS,
  RETURN_BOOK,
  GET_BORROWED_HISTORY,
  DELETE_BOOK,
  GET_ALL_TIME_BORROWED,
  EDIT_BOOK,
  GET_CATEGORY,
  ADD_CATEGORY,
  ADD_BOOK,
  SET_API_STATUS } from '../actions/types';

const INITIAL_STATE = {
  allTimeBorrowed: '',
  category: [],
  message: '',
  user: '',
  allBorrowedBooks: [],
  allUnreturnedBooks: [],
  data: [],
  returned: '',
  unreturnedCount: '',
  isFetching: false
};

/**
 * @description - Book reducer
 *
 * @param {Object} state - Object containing the default state
 *
 * @param {Object} action - Object containing dispatched data
 *
 * @returns {Object} - Object containing the store data
 */
export default function bookReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return { ...state, data: action.data };
    case GET_UNRETURNED_BOOKS:
      return {
        ...state,
        allUnreturnedBooks: action.data.message,
        unreturnedCount: action.data.count
      };
    case RETURN_BOOK: {
      const newData = [];
      state.allBorrowedBooks.map((book) => {
        if (book.bookId === action.data.id) {
          book.returned = true;
        }
        newData.push(book);
      });
      return { ...state, allBorrowedBooks: newData };
    }
    case GET_BORROWED_HISTORY:
      return { ...state, allBorrowedBooks: action.data };
    case DELETE_BOOK: {
      const newState = state.data.filter(book => book.id !== action.data);
      return { ...state, count: state.count - 1, data: newState };
    }
    case GET_ALL_TIME_BORROWED:
      return { ...state, allTimeBorrowed: action.data };
    case EDIT_BOOK: {
      const newData = [];
      state.data.map((book) => {
        if (book.id === action.data.id) {
          newData.push(action.data);
        } else {
          newData.push(book);
        }
      });
      return { ...state, data: newData };
    }
    case SET_API_STATUS:
      return { ...state, isFetching: action.isFetching };
    case GET_CATEGORY:
      return { ...state, category: action.data };
    case ADD_CATEGORY: {
      const newCategory = [action.data].concat(state.category);
      return { ...state, category: newCategory };
    }
    case ADD_BOOK:
      return {
        ...state,
        message: 'Book added Successfully',
        data: state.data.concat([action.book])
      };
    default:
      return state;
  }
}
