import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  { Signin }  from '../../../components/users/Signin';
import NavigationBar from '../../../components/NavigationBar';


window.localStorage = {}

configure({ adapter: new Adapter() });
let props;

const setup = () => {
  props = {
    userSigninRequest: jest.fn(),
    userSignupRequest: jest.fn(),
    googleSigninRequest: jest.fn(),
  }
  return mount(<Signin {...props} />)
}

jest.mock('../../../components/NavigationBar');
jest.mock('../../../components/forms/SigninForm');


describe('Component: Signin', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
  })

  it('should render Footer component', () => {
    const footerWrapper = shallow(<NavigationBar />);
    expect(footerWrapper).toBeDefined();
  });

})

