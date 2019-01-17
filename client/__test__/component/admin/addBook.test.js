import React from 'react';
import expect from 'expect';
import hammerjs from 'hammerjs';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import firebase from 'firebase';
import { AddBook, mapStateToProps, mapDispatchToProps } from '../../../components/includes/AddBook';

window.localStorage = {};

jest.mock('firebase');
firebase.storage = jest.fn(() => ({ref: jest.fn()}));


configure({ adapter: new Adapter() });


let props;
const setup = () => {
	props = {
    add: jest.fn(() => Promise.resolve(1)),
		actions: {
			getCategoryAction: jest.fn(),
			add: jest.fn(() => Promise.resolve(1))
		},
		onSubmit: jest.fn(() => Promise.resolve(1)),
		storageRef: {
			firebase: {
				storage: jest.fn()
			}
		}
	};
	return mount(<AddBook {...props} />);
};

describe('Component: AddBook', () => {
	it('should render the component successfully', () => {
		const wrapper = setup();
		const action = wrapper.instance();

		expect(wrapper.find('div').length).toBe(18);
		expect(wrapper.find('form').length).toBe(1);
		expect(wrapper.find('input').length).toBe(5);
		expect(wrapper.find('button').length).toBe(1);
		expect(action.renderCategory).toBeTruthy();
  });
  it('Should receive the class instances', () => {
    const wrapper = setup();
    
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'renderCategory');
    wrapper.instance().renderCategory();
  
    expect(wrapper.instance().renderCategory()).toHaveBeenCalled;
    })
  it('should ensure mapStateToProps returns prop from redux store', () => {
		const storeState = {
			books: {
				category: [ { name: 'test' } ]
			}
		};
		expect(mapStateToProps(storeState).category).toHaveLength(1);
  });
  it('should ensure mapDispatchToProps returns binded actions', () => {
		const dispatch = jest.fn();
		expect(mapDispatchToProps(dispatch).actions.getCategoryAction).toBeTruthy;
	});
	it('should set book title in local state', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'title',
				value: 'This is a test'
			}
		};
		action.onChange(event);
		expect(action.state.title).toEqual('This is a test');
	});

	it('should set book isbn in local state', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'isbn',
				value: '123-isbn-book'
			}
		};
		action.onChange(event);
		expect(action.state.isbn).toEqual('123-isbn-book');
	});

	it('should change isbn value as entered by user', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const event = {
			target: {
				name: 'isbn',
				value: 'isbn-123-test'
			}
		};
		action.onChange(event);
		expect(action.state.isbn).toEqual('isbn-123-test');
	});

	it('should add book when form is submitted', () => {
		const wrapper = setup();
		wrapper.instance().state.cover = 'http://example.com/file.jpg';
		const saveCategory = jest.spyOn(wrapper.instance(), 'handleSubmit');
		wrapper.instance().handleSubmit({ preventDefault: () => 1 });
		expect(props.onSubmit).toBeTruthy;
	});


	it('Should set upload error when book cover upload fails', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const handleUploadError = jest.spyOn(wrapper.instance(), 'handleUploadError');

		wrapper.instance().handleUploadError({});

		expect(action.state.isUploading).toBeFalsy;
  });
  

	it('Should set upload progress when cover upload starts', () => {
		const wrapper = setup();

		const action = wrapper.instance();

		const handleProgress = jest.spyOn(wrapper.instance(), 'handleProgress');

		wrapper.instance().handleProgress(50);

		expect(action.state.progress).toEqual(50);
  });
  
  it('Should set isUploading to true when cover upload starts', () => {

		const wrapper = setup();

		const action = wrapper.instance();

		const handleUploadStart = jest.spyOn(wrapper.instance(), 'handleUploadStart');

		wrapper.instance().handleUploadStart();

    expect(action.state.isUploading).toBeTruthy;
    expect(action.state.progress).toEqual(0);
	});

});
