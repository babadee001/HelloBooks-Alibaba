import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { Logs, mapDispatchToProps, mapStateToProps } from '../../../components/admin/Logs'
import { getAllBorrowed, addCategoryAction } from '../../../actions/BooksActions';
import { getUsers } from '../../../actions/AuthActions';
import { NavigationBar } from '../../../components/NavigationBar';

configure({ adapter: new Adapter() });

jest.mock('../../../components/NavigationBar');


let props;

const setup = () => {
  props = {
    user: {
      username: 'test',
      id: 1,
      membership: 'Silver',
      email: 'babadee@gmail.com'
    },
      actions: {
        getAllBorrowed, 
        getUsers,
        addCategoryAction: jest.fn()
      },
      books: { 
        data: mockData.data,
        allTimeBorrowed: {},
       },
      auth: { data: {}}
  }
  return mount(<Logs {...props} />)
}

describe('Component: Logs', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(20);
  })

  it('should receive the user props', () => {
    const wrapper = setup();
    expect(wrapper.props().user.username).toBe('test');
    expect(wrapper.props().user.membership).toBe('Silver');
    expect(wrapper.props().user.email).toBe('babadee@gmail.com');
  })

  it('should render NavigationBar component', () => {
    const navWrapper = shallow(<NavigationBar />);
    expect(navWrapper).toBeDefined();
  });
  
it('should ensure mapDispatchToProps returns binded actions', () => {
  const dispatch = jest.fn();
  expect(mapDispatchToProps().actions.getUsers).toBeTruthy;
});

it('should ensure mapStateToProps returns prop from redux store', () => {
  const storeState = {
    auth: 'babadee'
  };
  expect(mapStateToProps(storeState).auth).toHaveLength(7);
});
})
