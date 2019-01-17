import React from 'react';
import expect from 'expect';
import { stub } from 'sinon';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import mockData from '../../__mocks__/mockData';
import { deleteBookAction, editBook, getCategoryAction} from '../../../actions/BooksActions';
import { AllBooks, mapDispatchToProps } from '../../../components/admin/AllBooks';

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
      editBook: jest.fn(() => Promise.resolve(1)),
      getCategoryAction: jest.fn(() => Promise.resolve(1))
    },
    getCategoryAction: jest.fn(),
    getAllBooksAction: jest.fn(),
    editBook: jest.fn(),
    deleteBookAction: jest.fn(() => Promise.resolve(1)),
    books: mockData.allBooks
  }
  return mount(<AllBooks {...props} />)
}

describe('Component: AllBooks', () => {
  it('should render the component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('.card').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
  })

  it('should receive the user props', () => {
    const wrapper = setup();
    expect(wrapper.props().user.username).toBe('test');
    expect(wrapper.props().user.membership).toBe('Silver');
    expect(wrapper.props().user.isAdmin).toBe(0);
  })

  it('should receive the action creators', () => {
    const wrapper = setup();
    const newState = wrapper.setState({ displayBook: true, edit: false });
    expect(wrapper.props().deleteBookAction).toBeTruthy;
    expect(wrapper.props().modifyBookAction).toBeTruthy;
    expect(wrapper.props().books.length).toBe(2);
    expect(wrapper.state().edit).toBeFalsy;
    expect(wrapper.state().displayBook).toBeTruthy;
    expect(wrapper.props().books[0].title).toBe('HarryPorterrrr');
    expect(wrapper.props().books[0].author).toBe('babadeewwww');
  })

it('should call handleClick to delete book', () => {
  const wrapper = setup();
  const action = wrapper.instance();

  wrapper.find('#delete_button').simulate('click');
  
  expect(action.handleClick).toBeTruthy()
});

it('should call changeView to change page view', () => {
  const wrapper = setup();
  const action = wrapper.instance();
  
  wrapper.find('#edit_button').simulate('click');
});

it('should change username value as entered by user', () => {
  const wrapper = setup();
  
  const action = wrapper.instance();
  
  const event = {
    target: {
      name: 'description',
      value: 'Test'
    }
  };
  action.onChange(event);
  expect(action.state.description)
    .toEqual('Test');
});
it('should ensure mapDispatchToProps returns binded actions', () => {
  const dispatch = jest.fn();
  expect(mapDispatchToProps().actions.editBook).toBeTruthy;
  expect(mapDispatchToProps().actions.deleteBookAction).toBeTruthy;
});

describe('Given an admin dashboard Page', () => {
    const shallowWrapper = setup();
    it('Then it should call the changeView method', () => {
      const componentWillMountSpy = jest.spyOn(
        shallowWrapper.instance(),
        'changeView'
      );
      shallowWrapper.instance().changeView();
      expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    });
  });
  it('should edit book when form is submitted', () => {
		const wrapper = setup();
		const save = jest.spyOn(wrapper.instance(), 'handleFormSubmit');
		wrapper.instance().handleFormSubmit({ preventDefault: () => 1 });
		expect(props.onSubmit).toBeTruthy;
  });
  it('should delete book when button is clicked', () => {
		const wrapper = setup();
		const erase = jest.spyOn(wrapper.instance(), 'handleClick');
		wrapper.instance().handleClick({ preventDefault: () => 1 });
		expect(props.onSubmit).toBeTruthy;
	});
});
