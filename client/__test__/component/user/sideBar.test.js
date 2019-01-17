import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  { SideBar } from '../../../components/includes/SideBar';

configure({ adapter: new Adapter() });

describe('Component: SideBar', () => {
  it('should render the component successfully', () => {
    const wrapper = mount(<SideBar />)
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('Link').length).toBe(3);
    expect(wrapper.find('ul').length).toBe(1);    
  })
})
