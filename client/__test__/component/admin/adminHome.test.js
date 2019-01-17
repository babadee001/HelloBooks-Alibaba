import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { NavigationBar } from '../../../components/NavigationBar';
import { SideBar } from '../../../components/includes/SideBar';
import mockData from '../../__mocks__/mockData';

import { AdminHome, 
  mapDispatchToProps,
mapStateToProps } from '../../../components/admin/AdminHome';
import { getBooks, deleteBook } from '../../../actions/BooksActions';
import { getUsers, logout } from '../../../actions/AuthActions';
import { mapSeries } from 'bluebird';
import { Promise } from 'firebase';

configure({ adapter: new Adapter() });

jest.mock('../../../components/includes/SideBar');
jest.mock('../../../components/NavigationBar');
jest.mock('../../../components/admin/AllBooks');

let props;

const setup = () => {
	props = {
    count: 12,
		user: {
			username: 'test',
			id: 1,
			membership: 'Silver',
			isAdmin: 0
		},
		actions: {
      getBooks, getUsers, logout, deleteBook: jest.fn()
		},
		books: mockData.allBooks
	};
	return shallow(<AdminHome {...props} />);
};

describe('Component: AdminHome', () => {
	it('should render the component successfully', () => {
		const wrapper = setup();
		expect(wrapper.instance().props.user.username).toBe('test');
		expect(wrapper.instance().props.user.membership).toBe('Silver');
		expect(wrapper.instance().props.user.isAdmin).toBe(0);
	});


	it('should render NavigationBar component', () => {
		const navWrapper = shallow(<NavigationBar />);
		expect(navWrapper).toBeDefined();
  });
  
  it('should render SideBar component', () => {
		const sideWrapper = shallow(<SideBar />);
		expect(sideWrapper).toBeDefined();
	});

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps().actions.getBooks).toBeTruthy;
    expect(mapDispatchToProps().actions.logout).toBeTruthy;
  });
  it('should call renderBooks when hit', () => {
		const wrapper = setup();
		const action = wrapper.instance();

		const renderBooks = jest.spyOn(wrapper.instance(), 'renderBooks');
		action.renderBooks({ preventDefault: () => 1 });
		expect(renderBooks).toBeCalled();
  });
  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      books:  { unreturnedCount: 1 },
      auth: { user: {currentUser: 'babadee' }, apiStatus: true }
    };
    expect(mapStateToProps(storeState).user.currentUser).toHaveLength(7);
  });
});
