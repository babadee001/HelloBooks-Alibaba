import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  App from '../../../components/App';

configure({ adapter: new Adapter() });
const props = {
  auth: jest.fn(() => Promise.resolve(true)),
  logout: jest.fn(() => Promise.resolve(true))
}

describe('Component: App', () => {
  it('should render the component successfully', () => {
    const wrapper = mount(<App {...props} />)
    expect(wrapper.find('div').length).toBe(1);     
  })
})
