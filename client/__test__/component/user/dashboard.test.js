import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import  { Dashboard, mapStateToProps, mapDispatchToProps } from '../../../components/pages/Dashboard';
import { getBooks } from '../../../actions/BooksActions';
import { NavigationBar } from '../../../components/NavigationBar';

configure({ adapter: new Adapter() });

jest.mock('../../../components/includes/Books');
jest.mock('../../../components/includes/SideBar');
jest.mock('../../../components/NavigationBar');


let props;
const set = () => {
  props = {
    user: {
      username: 'test',
      id: 1,
      membership: 'Silver',
      isAdmin: 0
    },
      actions: {
        getBooks: jest.fn()
      },
      books: mockData.allBooks
  }
  return mount(<Dashboard {...props} />)
}
const setup = () => {
  props = {
    user: {
      username: 'test',
      id: 1,
      membership: 'Silver',
      isAdmin: 0
    },
      actions: {
        getBooks: jest.fn()
      },
      books: mockData.allBooks,
      isFetching: true
  }
  return mount(<Dashboard {...props} />)
}

describe('Component: Dashboard', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(5);
  })

  it('should receive the user props', () => {
    const wrapper = setup();
    expect(wrapper.props().user.username).toBe('test');
    expect(wrapper.props().user.membership).toBe('Silver');
    expect(wrapper.props().user.isAdmin).toBe(0);
  })

  it('should receive the action creators', () => {
    const wrapper = setup();

    expect(wrapper.props().actions.getBooks).toHaveBeenCalled();
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
  expect(mapDispatchToProps().actions.getBooks).toBeTruthy;
});

it('should ensure mapStateToProps returns prop from redux store', () => {
  const storeState = {
    books:  { unreturnedCount: 1 },
    auth: { user: {currentUser: 'babadee' }, apiStatus: true }
  };
  expect(mapStateToProps(storeState).user).toHaveLength(7);
});
it('Should receive the class instances', () => {
  const wrapper = shallow(<Dashboard {...props}/>)
  
  const handleClickSpy = jest.spyOn(wrapper.instance(), 'renderBooks');
  wrapper.instance().renderBooks();

  expect(wrapper.instance().renderBooks()).toHaveBeenCalled;
  })
  it('Should return no book message when books is null', () => {
    const wrapper = set()
    
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'renderBooks');
    wrapper.instance().renderBooks();

    expect(wrapper.instance().renderBooks).toHaveBeenCalled;
  })
})
