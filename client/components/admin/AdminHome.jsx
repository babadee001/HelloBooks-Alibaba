import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import AllBooks from './AllBooks';
import { getBooks, deleteBook } from '../../actions/BooksActions';
import { logout, getUsers } from '../../actions/AuthActions';
import AdminSideBar from '../includes/SideBar';
import Navbar from '../NavigationBar';

/**
 * AdminHome component
 * 
 * @export { Object }
 * 
 * @class AdminHome
 * 
 * @extends {Component}
 */
export class AdminHome extends Component {

  /**
	 * @description - Creates an instance of AdminHome.
	 * 
	 * @param {Object} props - Componnet props data
	 * 
	 * @memberOf AdminHome
	 */
  constructor(props) {
    super(props);
    this.renderBooks = this
      .renderBooks
      .bind(this);
    this.logout = this
      .logout
      .bind(this);
  }

  /**
	 * 
	 * @description - Executes after component is mounted
	 * 
	 * @memberOf AdminHome
	 */
  componentDidMount() {
    this
      .props
      .actions
      .getBooks();
      this
      .props
      .actions
      .getUsers();
  }

  /**
	 * @description - Unauthenticates user
	 * 
	 * @memberOf AdminHome
	 */
  logout(event) {
    event.preventDefault();

    this
      .props
      .actions
      .logout();
    browserHistory.push('/');
  }

  /**
	 * 
	 * @description - Displays the list of books in library
	 * 
	 * @returns {Array} - Array of books
	 * 
	 * @memberOf AdminHome
	 */
  renderBooks() {
    const { username } = this.props.user;
    const allbooks = this.props.books;
    if (!allbooks || allbooks.length === 0) {
      return (
        <div>
          <AdminSideBar 
            fullname={ this.props.user.username }
            link1={'Add New Book'} 
            route1={'/add'}
            link2={'View Logs'} 
            route2={'/logs'}
            link3={'Profile'} 
            route3={'/adminprofile'}
            />
          {this.props.isFetching ? <div className="preloader"></div> :
          <div className="container">
          <div className="row card-wrapper">
            <div className="card-deck col-md-offset-3">
              <div className="card text-white bg-info mb-3">
                <div className="card-body">
                  <p className="card-text">No books available in the store. Please add new</p>
                </div>
              </div>
            </div>
          </div>
    </div>}
        </div>
        );
    }
    return (
      <div className="container">
        <div id="adminhome" className="card-panel headcard">
            <center>Available Books</center>
          </div>
        <div className="row">
          <AdminSideBar 
          fullname={ this.props.user.username }
          link1={'Add New Book'} 
          route1={'/add'}
          link2={'View Logs'} 
          route2={'/logs'}
          link3={'Profile'} 
          route3={'/adminprofile'}
          />
          <div className="col s12 l9" id="list_boy">
            {allbooks.map(book => (<AllBooks
              deleteBook={ deleteBook }
              key={ book.id }
              total={ book.quantity }
              isbn={ book.isbn }
              author={ book.author }
              description={ book.description }
              id={ book.id }
              title={ book.title }
              cover={ book.cover }
            />))
            }
          </div>
        </div>
      </div>

    );
  }

  /**
	 * 
	 * @description - Renders the component
	 * 
	 * @returns {Object} - Object
	 * 
	 * @memberOf AdminHome
	 */
  render() {
    const { username, id } = this.props.user;
    return (
      <div>
        <Navbar route="/add" link="Add Book" route1="/adminprofile" link1="Profile" />
        {this.renderBooks()}
      </div>
    );
  }
}

/**
 * @description - Maps the redux state to the component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
export function mapStateToProps(state) {
  return { 
    books: state.books.data,
    user: state.auth.user,
    isFetching: state.books.isFetching
  };
}

AdminHome.PropTypes = {
  books: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

/**
 * 
 * @description - Maps the dispatch to component props
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBooks,
      getUsers,
      logout
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
