import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	returnBook, 
	getHistory } from '../../actions/BooksActions';
import { bindActionCreators } from 'redux';
import Sidebar from '../includes/SideBar';
import AllBooks from '../includes/BorrowedBooks';
import Navbar from '../NavigationBar';

/**
 * @description BorrowedHistory component
 * 
 * @export {Object}
 * @class  BorrowedHistory
 * @extends {Component}
 */
export class  BorrowedHistory extends Component {
	constructor(props) {
		super(props);
		this.renderHistory = this.renderHistory.bind(this);
		this.handleClick =  this.handleClick.bind(this);
	}
	/**
	 * Fetches the list of borrowed books by a user
	 * 
	 * @param {any} props 
	 * 
	 * @memberOf  BorrowedHistory
	 */
  componentDidMount() {
    const userId = this.props.user.userId || this.props.user.id
    this
      .props
      .actions
      .getHistory(userId);
  }

	/**
	 * Handles book return
	 * 
	 * @param {any} id 
	 * 
	 * @memberOf  BorrowedHistory
	 */
	handleClick(id) {
		const userId = this.props.user.userId || this.props.user.id
		swal({
			title: 'Are you sure?',
			text: 'Do you really want to return the book?',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willReturn) => {
			if (willReturn) {
				this.props.actions.returnBook(userId, { bookId: id })
			}
		});
	}

	/**
	 * Displays lists of borrowed books
	 * 
	 * @returns 
	 * 
	 * @memberOf  BorrowedHistory
	 */
	renderHistory() {
    let borrowedBooks = this.props.borrowedBooks;
		if (!borrowedBooks || borrowedBooks.message == "You have never borrowed a book") {
			return (
        <div>
					<Sidebar
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
                    <p className="card-text">You have not borrowed any book</p>
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
             <center>Borrowing History</center>
          </div>
          <Sidebar 
          fullname={ this.props.user.username }
          link1={'Borrow History'} 
          route1={'/history'}
          link2={'All books'} 
          route2={'/dashboard'}
          link3={'Profile'} 
          route3={'/profile'}
          />
              <div className="col s12 l9" id="bookList">
							{borrowedBooks.map((book) => {
								return (
									<AllBooks
                  key={book.id}
									isbn={book.isbn}
									borrowed={true}
									isReturned={book.returned}
									handleAction={this.handleClick}
									author={book.author}
									id={book.bookId}
									title={book.title}
									cover={book.cover}
									description={book.description}
									/>
								);
							})}
						</div>
            </div>
				</div>
			)}
	}

	/**
	 * Renders the component
	 * 
	 * @returns 
	 * 
	 * @memberOf  BorrowedHistory
	 */
	render() {
		return (
			<div>
        <Navbar route="/dashboard" link="All books" route1="/profile" link1="Profile" />
		      	{this.renderHistory()}
          </div>
		);
	}
}

BorrowedHistory.PropTypes = {
	user: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	borrowedHistory: PropTypes.object.isRequired
};

/**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 * @return {Object} returns state object
 */
export function mapStateToProps(state) {
	return {
		borrowedBooks: state.books.allBorrowedBooks,
		user: state.auth.user.currentUser,
		isFetching: state.books.isFetching
	};
}

/**
 * Maps the actions to component Props
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
export function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				getHistory,
				returnBook
			},
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)( BorrowedHistory);