import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/BooksActions';
import AllBooks from '../includes/Books';
import SideBar from '../includes/SideBar';
import Navbar from '../NavigationBar';

/**
 * @description - Dashboard component
 * 
 * @export
 * 
 * @class Dashboard
 * 
 * @extends {Component}
 */
export class Dashboard extends Component {

  /**
	 * @description - Creates an instance of Dashboard.
	 * 
	 * @param {Object} props - Componnet props data
	 * 
	 * @memberOf Dashboard
	 */
  constructor(props) {
    super(props);
    this.renderBooks = this
      .renderBooks
      .bind(this);
  }

  /**
	 * 
	 * @description - Executes after component is mounted
	 * 
	 * @memberOf Dashboard
	 */
  componentDidMount() {
    this
      .props
      .actions
      .getBooks();
  }

  /**
	 * 
	 * @description - Displays the list of books in library
	 * 
	 * @returns {Array} - Array of books
	 * 
	 * @memberOf Dashboard
	 */
  renderBooks() {
    const allbooks = this.props.books;
    if (!allbooks || allbooks.length === 0) {
      return (
      <div>
        <SideBar
        fullname={ this.props.user.username }
        link1={'Borrow History'} 
        route1={'/history'}
        link2={'All books'} 
        route2={'/dashboard'}
        link3={'Profile'} 
        route3={'/profile'}
        /> 
        {this.props.isFetching ? <div className="preloader"></div> :
        <div className="container">
        <div className="row card-wrapper">
          <div className="card-deck col-md-offset-3">
            <div className="card text-white bg-info mb-3">
              <div className="card-body">
                <p className="card-text">No books available in the store now, please check later</p>
              </div>
            </div>
          </div>
        </div>
  </div>}
      </div>
      );
    }else{
    return (
      <div className="">
        <div className="row">
          <div className="card-panel headcard">
            <center>Recently Added</center>
          </div>
          <SideBar 
          fullname={ this.props.user.username }
          link1={'Borrow History'} 
          route1={'/history'}
          link2={'All books'} 
          route2={'/dashboard'}
          link3={'Profile'} 
          route3={'/profile'}
          /> 
          <div className="col s12 l9" id="bookList">
          {allbooks.map(book => (<AllBooks
            key={ book.id }
            author={ book.author }
            borrowed={false}
            description={ book.description }
            id={ book.id }
            userId={ this.props.user.userId || this.props.user.id }
            title={ book.title }
            cover={ book.cover }
          />))
          }
      </div>
      </div>
    </div>
    )}
  }

  /**
	 * 
	 * @description - Renders the component
	 * 
	 * @returns {Object} - Object
	 * 
	 * @memberOf Dashboard
	 */
  render() {
    return (
      <div>
        <Navbar route='/history' link='History' route1="/profile" link1="Profile" route2="" link2="Contact Us" />
          {this.renderBooks()}
      </div>
    );
  }
}

Dashboard.PropTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired
};

/**
 * @description - Maps the redux state to the component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
export function mapStateToProps(state) {
  return { 
    user: state.auth.user.currentUser,
    books: state.books.data,
    isFetching: state.books.isFetching
  };
}

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
      getBooks
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
