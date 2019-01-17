import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from '../includes/SideBar';
import Navbar from '../NavigationBar';

/**
 * @description Profile component
 * 
 * @class  Profile
 * 
 * @extends {Component}
 */
export class AdminProfile extends Component {
  constructor(props) {
    super(props);
  }

  /**
	 * Renders the component
	 * 
	 * @returns 
	 * 
	 * @memberOf  AdminProfile
	 */
  render() {
    const { username, email, membership } = this.props.user;
    return (
      <div>
        <Navbar route="/admin" link="Admin dashboard" route1="/logs" link1="Logs" />
        <div className="row">
          <Sidebar 
          fullname={ this.props.user.username }
          link1={'Admin dashboard'} 
          route1={'/admin'}
          link2={'View Logs'} 
          route2={'/logs'}
          link3={'Add New Book'} 
          route3={'/add'}
          />
          <div className="row">
            <div className="card profilecard col-md-offset-4">
              <img src="https://cdn4.iconfinder.com/data/icons/thin-people-users/24/thin-1555_user_profile_avatar_unisex-128.png" alt="image" />
              <h1>{this.props.user.username}</h1>
              <p className="title">{this.props.user.membership}</p>
              <p>{this.props.user.email}</p>
                <p><button> Admin Info</button></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminProfile.PropTypes = {
  user: PropTypes.object.isRequired,
};

/**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 * @return {Object} returns state object
 */
export function mapStateToProps(state) {
  return { user: state.auth.user.currentUser,
   };
}

export default connect(mapStateToProps, null)(AdminProfile);
