import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import SigninForm from '../../../components/forms/SigninForm';

window.localStorage = { getItem: () => process.env.response };
const token = {'Zi':
	{ id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2YzAxOGIyMzNmZTJlZWY0N2ZlZGJiZGQ5Mzk4MTcwZmM5YjI5ZDgifQ.eyJhenAiOiI1NTU0MTEwODc2NjItNmpkZmlzbHBhM2JoMGw1YWxhNmM5M2h0MWpydXY1c3EuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NTU0MTEwODc2NjItNmpkZmlzbHBhM2JoMGw1YWxhNmM5M2h0MWpydXY1c3EuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTIyNTU4OTEyNzg3NTcxMTQ4NjMiLCJlbWFpbCI6ImJhYmFkZWVub25pQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiMUxyZWl1WDNvTTcwZ2M4aGwyZVd3ZyIsImV4cCI6MTUxNzI2NTAwNSwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImp0aSI6IjE5ZDhkMmQxZWEzYjEzMTQwZmVhNTkwMDhiYzRjZjcyZWZhMWY3ZTciLCJpYXQiOjE1MTcyNjE0MDUsIm5hbWUiOiJiYWJhZGVlIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tZVhHcmdzb0U0NkEvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUE2WlBUNEdTVERmMkNnSTFicGxGa2p5MUF5ejVPMXVZZy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiYmFiYWRlZSIsImxvY2FsZSI6ImVuIn0.PBfFtKYQ-wEoeeNaOK68NPh6x2s4hcG277d7JrdyNIrVPA-xgm0zud67BuQ_6GC7ytbJ_i73sTwnQ0zMOT3XzgwNDk5uShpdPPBzl-Fp6OX0WLsB4-KEGG3VSwy2gBPw5tCjQvj6e-ksvn1lP3sBe1lPsE-S9DS3Yb_01dADTNLgfHcqFYivbngpLN-50pEV0GEmTeogvDdGIFsnXDsoWhSnPonRP8HZIrbfuRxOURQN6ozkJXhPBngEqNuzP1o7NWDpjnIKqo4mpXqFqdizh6riRpPx19PjBybrMBIzkNjnTHAWCwkdZ28HicDrohWfwt1QNbI4tfHFSCKvGBvA5w"}}
configure({ adapter: new Adapter() });

let props;
const setup = () => {
	props = {
		onSubmit: jest.fn(() => Promise.resolve('hello')),
		username: jest.fn(),
    password: jest.fn(),
    userSigninRequest: jest.fn()
	};
	return shallow(<SigninForm {...props} />);
};

describe('Component: SigninForm', () => {
  it('should render the component successfully', () => {
    const wrapper = shallow(<SigninForm {...props} />)
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('Link').length).toBe(1);    
  });

  it('should set username value in the localState when value changes', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'username',
				value: 'babadee'
			}
		};
		action.onChange(event);
		expect(action.state.username).toEqual('babadee');
  });

  it('should set password value in the localState when value changes', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'password',
				value: 'babadee'
			}
		};
		action.onChange(event);
		expect(action.state.password).toEqual('babadee');
	});
  
  it('should login user when form is submitted', () => {
		const wrapper = setup();
		const action = wrapper.instance();
		const signin = jest.spyOn(wrapper.instance(), 'onSubmit');
		action.onSubmit({ preventDefault: () => 1 });
		expect(signin).toBeCalled();
	});
	it('should login user via google', () => {
		const wrapper = setup();
		const action = wrapper.instance();
		const signin = jest.spyOn(wrapper.instance(), 'responseGoogle');
		action.responseGoogle(token);
		expect(signin).toBeCalled();
  });
})
