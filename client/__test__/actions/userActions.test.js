import expect from 'expect';
import hammerjs from 'hammerjs';
import { browserHistory } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import dotenv from 'dotenv';
import fetchMock from 'fetch-mock';
import mockData from '../__mocks__/mockData';
import {
  userSignupRequest,
  editProfileAction,
  userSigninRequest,
  googleSigninRequest,
  logout
} from '../../actions/AuthActions';
import { SET_CURRENT_USER,
  EDIT_PROFILE,
  UNAUTH_USER
} from '../../actions/types';

dotenv.load();

browserHistory.push = jest.fn();

const { googleUser, updated, user } = mockData;

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
  describe('When I call the signin action ', () => {
    it('should dispatch SET_CURRENT_USER when successful', () => {
      fetchMock.post('api/v1/users/signin',
        { status: 200,
          body: JSON.stringify(user)
        });

      const expectedActions = {
        type: SET_CURRENT_USER,
        user
      };

      const store = mockStore({});
      store.dispatch(userSigninRequest(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .catch(error => error);
    });
  });
  describe('When I call googleSigninRequest action', () => {
    it('should dispatch SET_CURRENT_USER on success ',
      () => {
        const store = mockStore({});
        store.dispatch(googleSigninRequest(process.env.googleToken));
        expect(store.getActions()).toEqual(googleUser);
      });
  });
  describe('When I call the logout action', () => {
    it('should dispatch UNAUTH_USER', () => {
      const expectedActions = [{
        type: UNAUTH_USER,
        user: { },
        authenticated: false
      }];

      const store = mockStore({});
      store.dispatch(logout());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  describe('When I call the signup action', () => {
    it('should dispatch SET_CURRENT_USER when successful', () => {
      fetchMock.post('api/v1/users/signup',
        { status: 201,
          body: JSON.stringify(user)
        });

      const expectedActions = {
        type: SET_CURRENT_USER,
        user
      };

      const store = mockStore({});
      store.dispatch(userSignupRequest(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .catch(error => error);
    });
  });
  describe('When i call the edit action', () => {
    it('should dispatch EDIT_PROFILE when successful', () => {
      moxios.stubRequest('/api/v1/users/edit/1', {
        status: 200,
        response: {
          updated
        }

      });

      const expectedActions = {
        type: EDIT_PROFILE,
        updated
      };

      const store = mockStore({});
      store.dispatch(editProfileAction({ username: 'myusername' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .catch(error => error);
    });
  });
});
