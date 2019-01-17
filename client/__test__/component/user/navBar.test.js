import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  { NavigationBar, mapStateToProps } from '../../../components/NavigationBar';

configure({ adapter: new Adapter() });
const props = {
  auth: jest.fn(() => Promise.resolve(true)),
  logout: jest.fn(() => Promise.resolve(true))
}

describe('Component: NavigationBar', () => {
  it('should render the component successfully', () => {
    const wrapper = mount(<NavigationBar {...props} />)
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('Link').length).toBe(5);
    expect(wrapper.find('nav').length).toBe(1);  
    expect(wrapper.find('NavItem').length).toBe(6);    
  })
  it('should ensure mapStateToProps returns prop from redux store', () => {

    const storeState = {
      auth: { user: {currentUser: 'babadee' }, apiStatus: true }
    };
    expect(mapStateToProps(storeState).auth).toEqual({ user: {currentUser: 'babadee' }, apiStatus: true });
  });
  it('should call logout when hit', () => {
		const wrapper = mount(<NavigationBar {...props} />)
		const action = wrapper.instance();

		const logout = jest.spyOn(wrapper.instance(), 'logout');
		action.logout({ preventDefault: () => 1 });
		expect(logout).toBeCalled();
  });
})
