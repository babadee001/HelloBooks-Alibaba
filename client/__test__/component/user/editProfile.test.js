import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { EditProfile } from '../../../components/Pages/EditProfile';
import { editProfileAction } from '../../../actions/AuthActions';
import { NavigationBar } from '../../../components/NavigationBar';

configure({ adapter: new Adapter() });

jest.mock('../../../components/includes/Books');
jest.mock('../../../components/includes/SideBar');
jest.mock('../../../components/NavigationBar');


let props;
const setup = () => {
	props = {
		onSubmit: jest.fn(() => Promise.resolve('hello')),
		user: {username: jest.fn()},
    newPassword: jest.fn(),
    oldPassword: jest.fn(),
    onChange: jest.fn()
	};
	return mount(<EditProfile {...props} />);
};

describe('Component: EditProfile', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(10);
    expect(wrapper.find('form').length).toBe(1);
  })

  it('should change email value as entered by user', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'email',
				value: 'babadee@gmail.com'
			}
		};
		action.onChange(event);
		expect(action.state.email).toEqual('babadee@gmail.com');
  });
  
  it('should change password value as entered by user', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'oldPassword',
				value: 'pass'
			}
		};
		action.onChange(event);
		expect(action.state.oldPassword).toEqual('pass');
  });
  
  it('should set usernameError for invalid input', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'username',
				value: 123
			}
		};
		action.onBlur(event);
    expect(action.state.usernameError)
    .toEqual('Invalid input, username cannot be letters only or empty');
  });
  
  it('should clear field when input box is targeted', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'username',
				value: 'testusername'
			}
		};
		action.onFocus(event);
		expect(action.state.usernameError).toEqual('');
  });
  it('should call handleSubmit when edit profile form is submitted', () => {
		const wrapper = setup();
		const action = wrapper.instance();

		const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
		action.handleSubmit({ preventDefault: () => 1 });
		expect(handleSubmit).toBeCalled();
  });
  
    it('should render NavigationBar component', () => {
    const navWrapper = shallow(<NavigationBar />);
    expect(navWrapper).toBeDefined();
  });
})
