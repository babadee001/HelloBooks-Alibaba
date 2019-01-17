import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Nav from './NavigationBar';
import '../style/style.scss';

/**
 * @description - Home
 * 
 * @export {Object}
 * 
 * @class Home
 * 
 * @extends {Component}
 */
export class Home extends Component {
  render() {
    const isAuthenticated = this.props.auth.authenticated;
    return (
      <div>
        <Nav route1="/profile" link1="Profile" route2="/dashboard" link2="All books" />
        <div className="background container-fluid">
          <div className="row row-centered">
            <div className="col-md-6 col-centered">
            {isAuthenticated?
            (
              <div>
              <h1>This is HelloBooks</h1>
              <Link to="/admin" className="waves-effect waves-light btn">Dashboard</Link>
              </div>
            ):
            (
              <div>
              <h1>Welcome to HelloBooks</h1>
              <Link to="/signup" className="waves-effect waves-light btn">Signup</Link>
              <Link to="/signin" className="waves-effect waves-light btn">Signin</Link>
              </div>
            )
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, {})(Home);
