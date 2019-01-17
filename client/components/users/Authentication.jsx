import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/AuthActions';

dotenv.load();

/**
 * @description - Higher order component for user authentication
 * 
 * @param {Object} ComposedComponent 
 * 
 * @returns {Void} - nothing
 */
export default function (ComposedComponent) {

  /**
	 * 
	 * 
	 * @class Authentication
	 * 
	 * @extends {Component}
	 */
  class Authentication extends Component {

    /**
		 * @description - Validates the user authentication data
		 * 
		 * @memberOf Authentication
		 */
    componentWillMount() {
      const key = process.env.SECRET;
      const token = localStorage.getItem('token');
      if (token) {
        jwt.verify(token, key, (error) => {
          if (error) {
            this.props.actions.logout()
          }
        });
      }
      if (!this.props.authenticated) {
        this.props.actions.logout();
      }
    }


      /**
   * Executes before component is updated
   *
   * @param { object } nextProps
   *
   * @memberOf Authentication
   */
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.actions.logout(); 
      }
    }


    /**
		 * @description - Renders the component
		 * 
		 * @returns  { object }
		 * 
		 * @memberOf AdminAuthentication
		 */
    render() {
      return <ComposedComponent { ...this.props } />;
    }
  }

    /**
 * @description Maps dispatch to the application action creators
 *
 * @param {Function} dispatch
 *
 * @returns {Object} - Object containing action creators
 */
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        logout
      }, dispatch)
    };
  }

  Authentication.PropTypes = {
    router: PropTypes.object
  };

   /**
 *@description -  Maps application state to the component
 *
 * @param {Function} state
 *
 * @returns {Object} - Object containing application state
 */
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
