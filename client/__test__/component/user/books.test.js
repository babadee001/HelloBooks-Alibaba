import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import { borrowBook } from '../../../actions/BooksActions';
import Books from '../../../components/includes/Books';

configure({ adapter: new Adapter() });

// jest.mock('../../../components/admin/includes/AdminSideBar');


let props;
let state;

const setup = () => {
  props = {
    user: {
      username: 'test',
      id: 1,
      membership: 'Silver',
      isAdmin: 0
    },
    actions: {
      borrowBook: jest.fn()
    },
  }
  return mount(<Books {...props} />)
}

describe('Component: Books', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('.card').length).toBe(1);
    expect(wrapper.find('span').length).toBe(2);
  })

  it('should receive the user props', () => {
    const wrapper = setup();
    expect(wrapper.props().user.username).toBe('test');
    expect(wrapper.props().user.membership).toBe('Silver');
    expect(wrapper.props().user.isAdmin).toBe(0);
  })


it('should call handleClick to borrow book', () => {
  const wrapper = setup();
  const action = wrapper.instance();

  wrapper.find('#borrow_button').simulate('click');
  
  expect(action.handleClick).toBeTruthy()
});
})
