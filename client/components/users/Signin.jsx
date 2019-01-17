import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../NavigationBar';

import SigninForm from '../forms/SigninForm';
import { userSigninRequest, userSignupRequest, googleSigninRequest } from '../../actions/AuthActions';

/**
 * @description - Signin component
 * 
 * @export {Object} Signin component
 * 
 * @class Signin
 * 
 * @extends {Component}
 */
export class Signin extends Component {

  /**
	 * @description - Renders the component
	 * 
	 * @returns { Object }
	 * 
	 * @memberOf Signin
	 */
  render() {
    const { userSigninRequest, userSignupRequest, googleSigninRequest } = this.props;
    return (
      <div>
        <Navbar />
        <SigninForm 
        userSigninRequest={ userSigninRequest } 
        userSignupRequest= { userSignupRequest }
        googleSigninRequest= { googleSigninRequest }
        />
      </div>
    );
  }
}

Signin.propTypes = {
  userSigninRequest: React.PropTypes.func.isRequired,
  userSignupRequest: React.PropTypes.func.isRequired,
  googleSigninRequest: React.PropTypes.func.isRequired
};
export default connect(state => ({}), { userSignupRequest, userSigninRequest, googleSigninRequest })(Signin);
