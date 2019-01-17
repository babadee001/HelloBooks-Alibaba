import expect from 'expect';
import bookReducer from '../../reducers/booksReducer';
import mockData from '../__mocks__/mockData';
import { GET_ALL_BOOKS,
  DELETE_BOOK,
  ADD_BOOK,
  GET_BORROWED_HISTORY,
  EDIT_BOOK,
  RETURN_BOOK,
  GET_ALL_TIME_BORROWED,
  ADD_CATEGORY,
  GET_CATEGORY,
  SET_API_STATUS
} from '../../actions/types';

describe('Book Reducer:', () => {
  it('Should return list of books for GET_ALL_BOOKS', () => {
    const data = mockData.allBooks;
    const initialState = {
      data: []
    };
    const action = {
      type: GET_ALL_BOOKS,
      data: mockData.allBooks
    };
    const newState = bookReducer(initialState, action);
    expect(newState.data).toEqual(data);
  });

  it('Should return all borrowed books for GET_ALL_TIME_BORROWED', () => {
    const data = { name: 'babadee', membership: 'Gold' };
    const initialState = {
      data: { name: 'babadee', membership: 'Silver' }
    };
    const action = {
      type: GET_ALL_TIME_BORROWED,
      data
    };
    const newState = bookReducer(initialState, action);
    expect(newState.allTimeBorrowed.membership).toEqual('Gold');
  });

  it('should return new categories list for ADD_CATEGORY', () => {
    const initialCategory = [{ name: 'drama', description: 'test' }];
    const category = [{ name: 'new', description: 'test2' }];
    const initialState = { data: initialCategory };

    const action = {
      type: ADD_CATEGORY,
      data: category
    };
    const state = bookReducer(initialState, action);
    expect(state.data).toEqual([{ name: 'drama', description: 'test' }]);
  });

  it('should return list of categories for GET_CATEGORY', () => {
    const categoryData = { name: 'action', description: 'Make sense' };
    const newCategory = { name: 'Drama', description: 'boring' };
    const initialState = {
      category: categoryData
    };
    const action = {
      type: GET_CATEGORY,
      data: newCategory
    };
    const newState = bookReducer(initialState, action);
    expect(newState.category).toEqual(newCategory);
  });

  it('should completely delete a book', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: book };

    const action = {
      type: DELETE_BOOK,
      data: book[0].id,
    };
    const deleteState = bookReducer(initialState, action);
    expect(deleteState.data.length).toEqual(1);
  });

  it('should return success message for ADD_BOOK', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: book };

    const action = {
      type: ADD_BOOK,
      message: 'Book added successfully',
    };
    const state = bookReducer(initialState, action);
    expect(state.message).toEqual('Book added Successfully');
  });


  it('should return list of books for GET_BORROWED_HISTORY', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: [] };

    const action = {
      type: GET_BORROWED_HISTORY,
      data: book,
    };
    const state = bookReducer(initialState, action);
    expect(state.allBorrowedBooks).toEqual(book);
    expect(state.allBorrowedBooks[0].title).toEqual('test');
  });

  it('should return a rented book with RETURN_BOOKS', () => {
    const book = [{ bookId: 1, title: 'test', returned: false },
      { bookId: 2, title: 'game', returned: false }];
    const initialState = { allBorrowedBooks: book };
    const returnedBook = { id: 1, title: 'test', returned: true };

    const action = {
      type: RETURN_BOOK,
      data: returnedBook,
    };
    const state = bookReducer(initialState, action);
    expect(state.allBorrowedBooks).toEqual(book);
    expect(state.allBorrowedBooks[0].title).toEqual('test');
    expect(state.allBorrowedBooks[0].returned).toEqual(true);
    expect(state.allBorrowedBooks.length).toEqual(2);
  });

  it('should return edited book details with EDIT_BOOK', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: book };
    const editedBook = { id: 1, title: 'test me' };

    const action = {
      type: EDIT_BOOK,
      data: editedBook,
    };
    const state = bookReducer(initialState, action);
    expect(state.data[0].title).toEqual('test me');
  });
  it('Should set isFetching for SET_API_STATUS', () => {
    const initialState = {
      isFetching: 'true',
    };
    const action = {
      type: SET_API_STATUS,
      isFetching: 'false'
    };
    const newState = bookReducer(initialState, action);
    expect(newState.isFetching).toEqual('false');
  });
});
