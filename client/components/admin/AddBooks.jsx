import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import AddBook from '../includes/AddBook';
import { addBookAction } from '../../actions/BooksActions';
import Navbar from '../NavigationBar';

/**
 * @description - Add new book component
 * 
 * @export
 * 
 * @class AddNewBook
 * 
 * @extends {Component}
 */
export class AddBooks extends Component {
  render() {
    const { addNewBookAction } = this.props;
    return (
      <div id="add">
        <Navbar route="/admin" link="Admin dashboard" route1="/logs" link1="View Logs" />
        <AddBook
          firebaseStorage={ firebase.storage().ref('images') }
          add={ this.props.addBookAction }
        />
      </div>
    );
  }
}

/**
 * @description - map state to this component
 *
 * @param {Object} state
 *
 * @returns {Object} Object containing the application state
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser
  };
}
export default connect(mapStateToProps, { addBookAction })(AddBooks);
