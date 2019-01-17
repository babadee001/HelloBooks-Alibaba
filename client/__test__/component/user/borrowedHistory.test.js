import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import hammerjs from 'hammerjs';
import Adapter from 'enzyme-adapter-react-15';
import  { BorrowedHistory, mapDispatchToProps, 
        mapStateToProps } from '../../../components/pages/BorrowedHistory';
import mockData from '../../__mocks__/mockData';

configure({ adapter: new Adapter() });
jest.mock('../../../components/includes/SideBar')
jest.mock('../../../components/NavigationBar');

let props;
const setup = () => {
  props = {
    user: {
      username: 'Test',
      membership: 'Silver',
      isAdmin: 0
    },
    actions: {
      getHistory: jest.fn(),
      returnBook: jest.fn(),
    },
    borrowedBooks: null
  }
  return mount(<BorrowedHistory {...props} />)
}
 props = {
  user: {
    username: 'Test',
    membership: 'Silver',
    isAdmin: 0
  },
  actions: {
    getHistory: jest.fn(),
    returnBook: jest.fn(),
  },
  borrowedBooks: mockData.allBorrowedBooks
}

describe('Component: Borrowed Books Page', () => {
  it('should render the component successfully', () => {
    const wrapper = mount(<BorrowedHistory {...props}/>)
    expect(wrapper.find('div').length).toBe(19);
  })

  it('should receive props', () => {
    const wrapper = mount(<BorrowedHistory {...props}/>)
    expect(wrapper.props().user.username).toBe('Test');
    expect(wrapper.props().user.membership).toBe('Silver');
    expect(wrapper.props().user.isAdmin).toBe(0);
  })

  it('should called getHistory Action when component is rendered', () => {
    const wrapper = mount(<BorrowedHistory {...props}/>)
    expect(wrapper.props().actions.getHistory).toHaveBeenCalled();
    expect(wrapper.props().user).toBeTruthy();
  })

  it('Should receive the action creators', () => {
    const wrapper = shallow(<BorrowedHistory {...props}/>)
    
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick');
    wrapper.instance().handleClick();

    expect(wrapper.instance().handleClick).toHaveBeenCalled;
  })

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps().actions.getHistory).toBeTruthy;
    expect(mapDispatchToProps().actions.returnBook).toBeTruthy;
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      books:  { allBorrowedBooks: mockData.allBorrowedBooks },
      auth: { user: {currentUser: 'babadee' }, apiStatus: true }
    };
    expect(mapStateToProps(storeState).user).toHaveLength(7);
    expect(mapStateToProps(storeState).borrowedBooks).toHaveLength(2);
  });
  it('Should return no borrow book message when borrowed book is null', () => {
    const wrapper = setup()
    
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'renderHistory');
    wrapper.instance().renderHistory();

    expect(wrapper.instance().renderHistory).toHaveBeenCalled;
  })
  
})
