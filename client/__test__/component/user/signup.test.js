import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  { Signup }  from '../../../components/users/Signup';
import NavigationBar from '../../../components/NavigationBar';


window.localStorage = {}

configure({ adapter: new Adapter() });
let props;

const setup = () => {
  props = {
    userSignupRequest: jest.fn(),
    userSignupRequest: jest.fn(),
    googleSignupRequest: jest.fn(),
  }
  return mount(<Signup {...props} />)
}

jest.mock('../../../components/NavigationBar');
jest.mock('../../../components/forms/SignupForm');


describe('Component: Signup', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
  })

  it('should render Footer component', () => {
    const footerWrapper = shallow(<NavigationBar />);
    expect(footerWrapper).toBeDefined();
  });

})

