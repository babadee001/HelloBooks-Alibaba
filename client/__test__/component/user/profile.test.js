import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { Profile, mapDispatchToProps, mapStateToProps } from '../../../components/pages/Profile';
import { getBorrowed } from '../../../actions/BooksActions';
import { NavigationBar } from '../../../components/NavigationBar';

configure({ adapter: new Adapter() });

jest.mock('../../../components/includes/SideBar');
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
        getBorrowed: jest.fn()
      },
      books: mockData.allBooks
  }
  return mount(<Profile {...props} />)
}

describe('Component: Profile', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(4);
  })

  it('should receive the user props', () => {
    const wrapper = setup();
    expect(wrapper.props().user.username).toBe('test');
    expect(wrapper.props().user.membership).toBe('Silver');
    expect(wrapper.props().user.email).toBe('babadee@gmail.com');
  })

  it('should receive the action creators', () => {
    const wrapper = setup();

    expect(wrapper.props().actions.getBorrowed).toHaveBeenCalled();
    expect(wrapper.props().books.length).toBe(2);
    expect(wrapper.props().books[0].title).toBe('HarryPorterrrr');
    expect(wrapper.props().books[0].author).toBe('babadeewwww');
  })

  it('should render NavigationBar component', () => {
    const navWrapper = shallow(<NavigationBar />);
    expect(navWrapper).toBeDefined();
  });

it('should receive the book props', () => {
  const wrapper = setup();
  expect(wrapper.props().books.length).toBe(2);
  expect(wrapper.props().books[0].title).toBe('HarryPorterrrr');
  expect(wrapper.props().books[0].author).toBe('babadeewwww');
})
it('should ensure mapDispatchToProps returns binded actions', () => {
  const dispatch = jest.fn();
  expect(mapDispatchToProps().actions.getBorrowed).toBeTruthy;
});

it('should ensure mapStateToProps returns prop from redux store', () => {
  const storeState = {
    books:  { unreturnedCount: 1 },
    auth: { user: {currentUser: 'babadee' }, apiStatus: true }
  };
  expect(mapStateToProps(storeState).user).toHaveLength(7);
});
})
