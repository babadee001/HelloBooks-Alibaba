import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers } from '../../actions/AuthActions';
import { getAllBorrowed, addCategoryAction } from '../../actions/BooksActions';
import Navbar from '../NavigationBar';

/**
 * Logs component
 * 
 * @export { Object }
 * 
 * @class Logs
 * 
 * @extends {Component}
 */
export class Logs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
	 * @description - Executes after component is mounted
	 * 
	 * @memberOf AdminHome
	 */
  componentDidMount() {
    this
      .props
      .actions
      .getUsers();
      this
        .props
        .actions
        .getAllBorrowed();
  }
  /**
	 * @description - Handles the input value changes
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf Logs
	 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
	 * @description - Submits the signin information
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf Logs
	 */
  onSubmit(event) {
    event.preventDefault();
    this.props.actions.addCategoryAction(this.state);
  }
  
  /**
	 * @description - Renders props of the component
	 * 
	 * @memberOf Logs
	 */
  renderProps(){
    const books = this.props.books;
    const auth = this.props.auth;
    return (
      <div>
      </div>
    )
  }

  /**
	 * 
	 * @description - Renders the component
	 * 
	 * @returns {Object} - Object
	 * 
	 * @memberOf Logs
	 */
  render() {
    return (
      <div>
        {this.renderProps()}
        <Navbar route="/admin" link="Admin dashboard" route1="/add" link1="Add New" />
        <div className="container container-fluid">
        <div id="logs" className="row card-wrapper">
                <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="card text-white bg-info mb-3 col cardbox">
                        <div className="card-body">
                          <h5 className="card-title">All Available Books</h5>
                          <p className="card-text">{this.props.books.data.length}</p>
                        </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="card text-white bg-info mb-3 col cardbox">
                        <div className="card-body">
                          <h5 className="card-title">All Registered Users</h5>
                          <p className="card-text">{this.props.auth.data.length}</p>
                        </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="card text-white bg-info mb-3 col cardbox">
                        <div className="card-body">
                          <h5 className="card-title">All Books Borrowed</h5>
                          <p className="card-text">{this.props.books.allTimeBorrowed.length}</p>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="card text-white bg-info mb-3 col cardbox">
                        <div className="card-body">
                          <h5 className="card-title">Add New Category</h5>
                          <p className="card-text">
                            <form onSubmit={ this.onSubmit } className="row">
                              <div>
                                <input
                                 className="form-control" value={ this.state.name } onChange={ this.onChange } type="text"
                                 name="name"
                                 placeholder="Category name"
                                 required
                                />
                              </div>
                              <div>
                                <input
                                 className="form-control" value={ this.state.description } onChange={ this.onChange } type="text"
                                 name="description"
                                 placeholder="Category description"
                                 required
                                />
                              </div>
                              <div className="form-group">
                                <button name="addcategory" className="btn btn-success">Add</button>
                              </div>
                            </form>
                          </p>
                        </div>
                    </div>
                  </div>
                </div>
      </div>
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
    books: state.books,
    auth: state.auth
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
      getAllBorrowed, 
      addCategoryAction,     
      getUsers
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Logs);
