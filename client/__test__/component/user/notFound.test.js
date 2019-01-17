import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  NotFound from '../../../components/Pages/NotFound';
import { NavigationBar } from '../../../components/NavigationBar';

configure({ adapter: new Adapter() });
jest.mock('../../../components/NavigationBar');

describe('Component: NotFound', () => {
  it('should render the component successfully', () => {
    const wrapper = mount(<NotFound />)
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('Link').length).toBe(1);    
  });

  it('should render NavigationBar component', () => {
    const navWrapper = shallow(<NavigationBar />);
    expect(navWrapper).toBeDefined();
  });
})
