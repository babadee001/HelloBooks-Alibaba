import React, { Component } from 'react';
import { Link } from 'react-router';

/**
 * @description - User side bar component
 * 
 * @class SideBar
 * 
 * @extends {Component}
 */
export class SideBar extends Component {

  /**
	 * @description - Renders the component
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf SideBar
	 */
  render() {
    return (
      <div className="col s2 m3 l3">
        <ul id="slide-out" className="side-nav fixed side-nav-fixed show-on-large-only">
          <div className="sidenav">
            <div className="row">
              <span className="card-title">
              </span>
              <li className="divider" />
              <p />
              <img className="avatar"
                src="https://res.cloudinary.com/babadee30/image/upload/v1507304526/prof_qqq3su.jpg"
                alt="Avatar"
              /><br />
              <b>{this.props.fullname}</b>
            </div><br />
          </div>
          <li className="divider" />
          <li id="menu-list">
            <Link to={this.props.route1}>{this.props.link1}
              <i className="material-icons">chevron_right</i>
            </Link>
          </li>
          <li id="menu-list">
            <Link to={this.props.route2}>{this.props.link2}
              <i className="material-icons">chevron_right</i>
            </Link>
          </li>
          <li id="menu-list">
            <Link to={this.props.route3}>{this.props.link3}
              <i className="material-icons">chevron_right</i>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBar;
