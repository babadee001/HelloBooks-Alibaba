import React, { Component } from 'react';
import swal from 'sweetalert';
import Navbar from '../NavigationBar';
import { borrowBook } from '../../actions/BooksActions';

/**
 * @description - Books component
 * 
 * @export
 * 
 * @class Books
 * 
 * @extends {Component}
 */
export default class Books extends Component {

  /**
	 * @description - Creates an instance of Books.
	 * 
	 * @param {Object} props - Componnet props data
	 * 
	 * @memberOf Books
	 */
  constructor(props) {
    super(props);
    this.handleClick = this
      .handleClick
      .bind(this);
  }

   /**
	 * @description - Executes borrow book action
	 * 
	 * @memberOf Books
	 */
  handleClick() {
    const userId = this.props.userId;
    const bookId = { bookId: this.props.id };
    borrowBook(userId, bookId)
  }

  /**
	 * 
	 * @description - Renders the component
	 * 
	 * @returns {Object} - Object
	 * 
	 * @memberOf Books
	 */
  render() {
    return (
      <div>
        <div className="col s12 m3 l3">
          <div className="card" id="book_card">
            <div className="card-image">
              <img id="cover" src={ this.props.cover } id="cover" alt="cover" />
              <span className="card-title">{this.props.title}</span>
            </div>
            <div className="card-content">
              <span>{this.props.description}</span>
            </div>
            <div className="card-action">
              <p>
                <button id="borrow_button" onClick={ this.handleClick } className="btn">Borrow</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
