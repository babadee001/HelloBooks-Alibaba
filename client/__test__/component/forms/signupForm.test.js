import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import SignupForm from '../../../components/forms/SignupForm';

window.localStorage = { getItem: () => process.env.testToken };

configure({ adapter: new Adapter() });

let props;
const setup = () => {
	props = {
		onSubmit: jest.fn(() => Promise.resolve('hello')),
		username: jest.fn(),
    password: jest.fn(),
    userSignupRequest: jest.fn()
	};
	return shallow(<SignupForm {...props} />);
};

describe('Component: SignupForm', () => {
  it('should render the component successfully', () => {
    const wrapper = shallow(<SignupForm {...props} />)
    expect(wrapper.find('div').length).toBe(11);
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
  
  it('should signup user when form is submitted', () => {
		const wrapper = setup();
		const action = wrapper.instance();
		const signUp = jest.spyOn(wrapper.instance(), 'onSubmit');
		action.onSubmit({ preventDefault: () => 1 });
		expect(signUp).toBeCalled();
  });
})
