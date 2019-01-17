import expect from 'expect';
import AuthReducer from '../../reducers/authReducer';
import { SET_CURRENT_USER,
  UNAUTH_USER,
  GET_ALL_USERS,
  SET_API_STATUS,
  EDIT_PROFILE
} from '../../actions/types';

describe('Auth Reducer', () => {
  it('should set the current user when passed with SET_CURRENT_USER', () => {
    const initialState = {
      user: { }
    };
    const user = {
      currentUser: {
        userName: 'babadee',
        id: '1',
        email: 'babadee@gmail.com'
      }
    };
    const action = {
      type: SET_CURRENT_USER,
      user,
      authenticated: true
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(true);
    expect(newState.user.currentUser.userName).toEqual('babadee');
    expect(newState.user.currentUser.email).toEqual('babadee@gmail.com');
  });
  it('should return initial state for invalid action type', () => {
    const initialState = {
      authenticated: false,
      user: {
        currentUser: {
          userName: '',
          fullName: ''
        }
      }
    };
    const user = {
      currentUser: {
        userName: 'babadee',
        id: '1',
        email: 'babadee@gmail.com'
      }
    };
    const action = {
      type: 'TEST',
      user
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
    expect(newState.user.currentUser.userName).toEqual('');
  });
  it('Should return logged out successful for logged out user', () => {
    const initialState = {
      message: '',
    };
    const action = {
      type: UNAUTH_USER,
      authenticated: false
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
    expect(newState.message).toEqual('Successfully Logged Out');
  });
  it('Should return all users for GET_ALL_USERS', () => {
    const data = { name: 'babadee' };
    const initialState = {
      data: 'babadee',
    };
    const action = {
      type: GET_ALL_USERS,
      data
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.data.name).toEqual('babadee');
  });
  it('Should set isFetching for SET_API_STATUS', () => {
    const initialState = {
      isFetching: 'true',
    };
    const action = {
      type: SET_API_STATUS,
      isFetching: 'false'
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.isFetching).toEqual('false');
  });
  it('Should edit current user when passed with EDIT_PROFILE', () => {
    const initialState = {
    };
    const action = {
      type: EDIT_PROFILE,
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
  });
});
