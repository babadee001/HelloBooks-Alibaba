import expect from 'expect';
import hammerjs from 'hammerjs';
import { browserHistory } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import dotenv from 'dotenv';
import fetchMock from 'fetch-mock';
import mockData from '../../__mocks__/mockData';
import {
  userSigninRequest,
} from '../../../actions/AuthActions';
import { SET_CURRENT_USER,
} from '../../../actions/types';

dotenv.load();

browserHistory.push = jest.fn();

const { badUser } = mockData;

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

window.localStorage = {
  removeItem: () => {},
  setItem: () => {}
};


describe('Given userActions', () => {
  beforeEach(() => {
    global.Materialize = { toast: jest.fn(Promise.resolve(1)) };
    global.browserHistory = { push: jest.fn(Promise.resolve()) };
    moxios.install();
    global.Materialize = { toast: jest.fn(() => Promise.resolve(1)) };
  });
  afterEach(() => moxios.uninstall());
  describe('When I call the signup action ', () => {
    it('should dispatch error when not successful', () => {
      fetchMock.post('api/v1/users/signup',
        { status: 400,
          body: JSON.stringify(badUser)
        });

      const expectedActions = {
      };

      const store = mockStore({});
      store.dispatch(userSigninRequest(badUser))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .catch(error => error);
    });
  });
});
