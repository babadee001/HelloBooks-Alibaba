import { combineReducers } from 'redux';
import books from './booksReducer';
import auth from './authReducer';

export default combineReducers({
  books,
  auth,
});
