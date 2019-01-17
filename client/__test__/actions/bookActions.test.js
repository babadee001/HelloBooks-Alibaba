import { expect } from 'expect';
import hammerjs from 'hammerjs';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import dotenv from 'dotenv';
import mockData from '../__mocks__/mockData';

import {
  addBookAction,
  getBooks,
  deleteBookAction,
  editBook,
  getCategoryAction,
  returnBook,
  addCategoryAction,
  getAllBorrowed,
  getHistory
} from '../../actions/BooksActions';


import {
  ADD_BOOK,
  GET_ALL_BOOKS,
  DELETE_BOOK,
  EDIT_BOOK,
  RETURN_BOOK,
  ADD_CATEGORY,
  GET_CATEGORY,
  GET_ALL_TIME_BORROWED,
  GET_BORROWED_HISTORY
} from '../../actions/types';

dotenv.load();
jest.mock('react-router');
const middleware = [thunk];

const mockStore = configureMockStore(middleware);
const {
  bookData,
  allBooks,
  modifiedBook,
  allCategory,
  returnedBook,
  history,
  allTimeBorrowed
} = mockData;

window.localStorage = {};

describe('Given book actions', () => {
  describe('When I call the add book action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('Then it should dispatch an action to add book', () => {
      fetchMock.post('/api/v1/books',
        { status: 201,
          body: JSON.stringify({
            message: 'Book added Successfully',
            newBook: bookData
          })
        });
      const expectedActions = [
        {
          type: ADD_BOOK,
          message: 'Book added Successfully',
          newBook: bookData
        }
      ];
      const store = mockStore({});
      store.dispatch(addBookAction(bookData))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });
  });
  describe('When I call the get all books action', () => {
    it('Then it should dispatch an action that get all books', () => {
      fetchMock.get('/api/v1/books',
        {
          status: 200,
          body: JSON.stringify(
            allBooks
          ) });

      const expectedActions = [{
        type: GET_ALL_BOOKS,
        data: allBooks
      }];

      const store = mockStore({});
      store.dispatch(getBooks())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });
  });
  describe('When I call the edit book action', () => {
    it('Then it should dispatch an action that edits a book', () => {
      fetchMock.put('/api/v1/books/1',
        { status: 200,
          body: JSON.stringify({
            book: modifiedBook,
            message: modifiedBook.message
          })
        });

      const expectedActions = [{
        type: EDIT_BOOK,
        book: modifiedBook
      }];

      const store = mockStore({});
      store.dispatch(editBook(bookData, 1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });
  });
  describe('When I call the add category action', () => {
    it('should dispatch ADD_CATEGORY', () => {
      fetchMock.post('/api/v1/books/category',
        { status: 201,
          body: JSON.stringify({
            name: 'drama',
            description: 'Badass'
          }) });
      const expectedActions = [{
        type: ADD_CATEGORY,
        data: {
          name: 'science',
          description: 'Hello world'
        }
      }];

      const store = mockStore({});
      store.dispatch(addCategoryAction({
        name: 'science',
        description: 'Hello world'
      }))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });
  });
  it('should dispatch GET_CATEGORY when getting all category', () => {
    fetchMock.get('/api/v1/books/category',
      { status: 200,
        body: JSON.stringify({
          data: allCategory
        }) });

    const expectedActions = [{
      type: GET_CATEGORY,
      data: allCategory
    }];

    const store = mockStore({});
    store.dispatch(getCategoryAction())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });
  describe('when I call the return book action', () => {
    it('should dispatch RETURN_BOOK when returning a book', () => {
      fetchMock.put('/api/v1/users/1/books/1',
        {
          status: 201,
          body: JSON.stringify({
            book: returnedBook
          })
        });

      const expectedActions = [{
        type: RETURN_BOOK,
        book: returnedBook
      }];
      const bookId = { bookId: 1 };
      const store = mockStore({});
      store.dispatch(returnBook(1, bookId))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });
  });
  describe('when I call the getAllBorrowed book action', () => {
    it('should dispatch GET_ALL_TIME_BORROWED',
      () => {
        fetchMock.get('api/v1/books/borrowed',
          { status: 200
          });

        const expectedActions = [{
          type: GET_ALL_TIME_BORROWED,
          data: allTimeBorrowed
        }];

        const store = mockStore({});
        store.dispatch(getAllBorrowed())
          .then(() => {
            expect(store.getActions()).to.eql(expectedActions);
          })
          .catch(error => error);
      });
  });
  describe('when I call the getHistory action', () => {
    it('should dispatch GET_BORROWED_HISTORY', () => {
      fetchMock.get('/api/v1/users/1',
        { status: 200,
          body: JSON.stringify(history)
        });

      const expectedActions = [{
        type: GET_BORROWED_HISTORY,
        data: history
      }];

      const store = mockStore({});
      store.dispatch(getHistory(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });
  });
  describe('When I call the deleteBookAction', () => {
    it('should dispatch DELETE_BOOK', () => {
      fetchMock.deleteOnce('/api/v1/books/1',
        {
          status: 200,
          body: JSON.stringify({ id: 1 }) });
      const expectedActions = [
        {
          type: DELETE_BOOK,
          id: 1,
        }
      ];
      const store = mockStore({});
      store.dispatch(deleteBookAction(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });
  });
});
