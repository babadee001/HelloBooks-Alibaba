import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../NavigationBar';

import SignupForm from '../forms/SignupForm';
import { userSignupRequest } from '../../actions/AuthActions';

/**
 * @description - Signup component
 * 
 * @export {Object} Signup component
 * 
 * @class Signup
 * 
 * @extends {Component}
 */
export class Signup extends Component {

  /**
	 * @description - Renders the component
	 * 
	 * @returns { Object }
	 * 
	 * @memberOf Signin
	 */
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <Navbar />
        <SignupForm userSignupRequest={ userSignupRequest } />
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

export default connect(state => ({}), { userSignupRequest })(Signup);
