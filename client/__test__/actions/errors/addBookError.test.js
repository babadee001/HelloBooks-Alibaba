import { expect } from 'expect';
import hammerjs from 'hammerjs';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';
import mockData from '../../__mocks__/mockData';
import {
  addBookAction,
} from '../../../actions/BooksActions';

import {
  ADD_BOOK,
} from '../../../actions/types';

dotenv.load();
const middleware = [thunk];

const mockStore = configureMockStore(middleware);

window.localStorage = {};

describe('Book actions', () => {
  it('should create ADD_BOOK when a new book is added', () => {
    fetchMock.post('/api/v1/books',
      { status: 400,
        body: JSON.stringify({ message: 'Book added Successfully' })
      });
    const expectedActions = [
      {
        type: ADD_BOOK,
        message: 'book added successfully',
        newBook: mockData.bookData

      }
    ];
    const store = mockStore({});
    store.dispatch(addBookAction(mockData.bookData))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });
});
