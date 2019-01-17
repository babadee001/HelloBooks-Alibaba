import React, { Component } from 'react';
import { Link } from 'react-router';
import Navbar from '../NavigationBar';

const NotFound = () => {
	return (<div>
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1> Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">
                Sorry, an error has occured, Requested page not found!
            </div>
              <div className="error-actions">
                  <Link to="/dashboard" className="btn btn-success btn-lg"><span className="glyphicon glyphicon-home"></span>
                      Take Me To Dashboard </Link>
              </div>
          </div>
        </div>
      </div>
</div>
			</div>
	);
};

export default NotFound;
