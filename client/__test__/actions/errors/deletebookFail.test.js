import { expect } from 'expect';
import hammerjs from 'hammerjs';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';
import {
  deleteBookAction,
} from '../../../actions/BooksActions';

import {
  DELETE_BOOK,
} from '../../../actions/types';

dotenv.load();
const middleware = [thunk];

const mockStore = configureMockStore(middleware);

window.localStorage = {};

describe('Book actions', () => {
  it('should create DELETE_BOOK when a book is successfully deleted', () => {
    fetchMock.deleteOnce('/api/v1/books/1',
      { status: 400, body: JSON.stringify({ id: 1 }) });
    const expectedActions = [
      {
        type: DELETE_BOOK,
        data: 1,
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
