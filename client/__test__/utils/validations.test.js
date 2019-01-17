import moxios from 'moxios';
import expect from 'expect';
import fetchMock from 'fetch-mock';
import hammerjs, { Hammer } from 'hammerjs';
import { checkExisting, checkUser, getDetails } from '../../utils/validations';

const error = { response: { data: { message: 'Not found' } } };

describe('Validations', () => {
  beforeEach(() => {
    moxios.install();
    global.Materialize = { toast: jest.fn(() => Promise.resolve(1)) };
  });
  afterEach(() => moxios.uninstall());

  it('Should get userData from the database', () => {
    const expectedActions = {
      message: {
        id: 3,
        username: 'babadee',
        email: 'babadee@gmail.com',
        isAdmin: 0,
        membership: 'Gold'
      }
    };
    const { email } = expectedActions.message;
    (checkExisting({ searchTerm: 'babadee@gmail.com' }))
      .then((response) => {
        expect(response.email).toEqual(email);
      });
  });

  it('Should return null for non existing username', () => {
    const expectedActions = {
      message: null
    };
    checkUser('babadee')
      .then((data) => {
        expect(data).toEqual(expectedActions);
      })
      .catch(error);
  });
});
