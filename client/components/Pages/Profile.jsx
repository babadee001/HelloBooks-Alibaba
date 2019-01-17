import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { getBorrowed } from '../../actions/BooksActions';
import Sidebar from '../includes/SideBar';
import Navbar from '../NavigationBar';

/**
 * @description Profile component
 * 
 * @class  Profile
 * 
 * @extends {Component}
 */
export class Profile extends Component {
  constructor(props) {
    super(props);
  }

  /**
	 * @description - Executes after component is mounted
	 * 
	 * @memberOf Profile
	 */
  componentDidMount() {
    const userId = this.props.user.userId || this.props.user.id
    this
      .props
      .actions
      .getBorrowed(userId);
  }

  /**
	 * Renders the component
	 * 
	 * @returns 
	 * 
	 * @memberOf  Profile
	 */
  render() {
    const { username, email, membership } = this.props.user;
    return (
      <div>
        <Navbar route="/dashboard" link="All books" route1="/history" link1="History" />
        <div className="row">
          <Sidebar 
          fullname={ this.props.user.username }
          link1={'Borrow History'} 
          route1={'/history'}
          link2={'All books'} 
          route2={'/dashboard'}
          link3={'Profile'} 
          route3={'/profile'}
          />
          <div className="row">
            <div className="card profilecard col-md-offset-4" id="profilecard">
              <img src="https://cdn4.iconfinder.com/data/icons/thin-people-users/24/thin-1555_user_profile_avatar_unisex-128.png" alt="image" />
              <h1>{this.props.user.username}</h1>
              <p className="title">{this.props.user.membership}</p>
              <p>{this.props.user.email}</p>
              <p>Books yet to return {this.props.book}</p>
                <p><Link to ="/edit"><button name="editprofile">Edit profile</button></Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.PropTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired
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
    book: state.books.unreturnedCount
   };
}

/**
 * Maps the action to component Props
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBorrowed
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
