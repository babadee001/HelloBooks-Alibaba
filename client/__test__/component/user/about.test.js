import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  About from '../../../components/Pages/About';
import { NavigationBar } from '../../../components/NavigationBar';

configure({ adapter: new Adapter() });
jest.mock('../../../components/NavigationBar');
const props = {
  auth: jest.fn(() => Promise.resolve(true)),
  logout: jest.fn(() => Promise.resolve(true))
}

describe('Component: About', () => {
  it('should render the component successfully', () => {
    const wrapper = shallow(<About />)
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('p').length).toBe(1);    
  });

  it('should render NavigationBar component', () => {
    const navWrapper = shallow(<NavigationBar />);
    expect(navWrapper).toBeDefined();
  });
})
