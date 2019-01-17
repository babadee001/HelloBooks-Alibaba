import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../NavigationBar';

const About = () => {
    return (
		<div>
      <Nav route='/admin' link='Dashboard' />
			<div className="container">
        <div className="row card-wrapper about">
          <div className="card-deck">
            <div className="card text-white bg-info mb-3">
              <div className="card-body">
                <p className="card-text">
                Hello-Books is a simple RESTFUL application that helps manage a book library and its processes like updating, borrowing and adding books. 
                The application has an admin who updates book information, add new books etc. Registered users can view available books, borrow books, view borrowed history and return books.

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
		</div>
	);
};
export default About;
