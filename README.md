[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/babadee001/HelloBooks.svg?branch=production-tests)](https://travis-ci.org/babadee001/HelloBooks)
[![Coverage Status](https://coveralls.io/repos/github/babadee001/HelloBooks/badge.svg?branch=staging)](https://coveralls.io/github/babadee001/HelloBooks?branch=staging)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a2ead0f07113065e3206/test_coverage)](https://codeclimate.com/github/babadee001/HelloBooks/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/a2ead0f07113065e3206/maintainability)](https://codeclimate.com/github/babadee001/HelloBooks/maintainability)
# Hello-Books
Hello-Books is a simple RESTFUL application that helps manage a book library and its processes like updating, borrowing and adding books. The application has an admin who updates book information, add new books etc. 
Registered users can view available books, borrow books, view borrowed history and return books.

### Features
* Signup with new account.
* Signin with details.
* Add books  to library.
* View all books in library.
* Borrow and return books.


### Installation
To install this application,
* make a new directory 
* git clone this repository
* Navigate to directory of cloned repo
* Setup environment variables using the .env.example file
* Run ```npm install``` to install dependencies
* Then run ```npm start``` to start the application
* 'npm test' runs the tests.

### Built with
* [NodeJS](https://nodejs.org/en/) - A Javscript runtime built runtime that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJS](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.
* [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.
* [Sequelize](http://docs.sequelizejs.com/) - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.
* REACT: This project makes use of the REACT Javascript library to build the interface. REACT is used for building web pages that are structured as a collection of components. For more information about  See [this link](https://facebook.github.io/react/).
* ECMAScript 6: Also known as ES2015, this is a version of Javascript with
    next-generation features like arrow functions, generators, enhanced object literals,
    spread operators and more. The ES2015 is used in many areas of this project. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.
* Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. For more information about Redux see [this link](http://redux.js.org/) for details.
* Materializecss is used to style the frontend. For more information about materializecss see [this link](http://materializecss.com/) for details.
* Webpack: Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging modules.

## Deployment
This application is deployed on heroku server at https://hbks.herokuapp.com

### API
Request type | Endpoint                                                 | Action
------------ | ---------------------------------------------------------|------
POST         | [ /api/users/signup](#Create-account)                    | User create account
POST         | [/api/users/login](#login)                               | To log a user in
GET          | [ /api/books](#get-books)                                | Get all books
POST         | [/api/users/:userId/books](#borrow-books)                | borrow books
PUT          | [/api/users/:userId/books](#return-books)                | return books
GET          | [/api/users/:userId/books?returned=false](#borrow-books) | get all the books that the user has borrowed but has not returned
PUT          | [ /api/books/:bookId](#modify-book-infor)                | API route that allow users to modify a book information


### Contributing
------------------------------------------------------

Development of HelloBooks is everyone's concern. While we welcome contribution for bugfixes and improvement please read below how you can take part in the project

# <h3> Code of Conduct

The author has adopted a Code of Conduct that he expects project participant to follow. Please find below

* Always accept feedback
* Do not copy other people's work - integrity
* Be careful with your choice of words
* When we disagree, try to understand why
* Remember that we are from different walks of life
* Be respectful

# <h3>Contributing Guide
You can contribute to the project by observing the following:

* Be sure you are using [Airbnb style Guide](https://github.com/airbnb/javascript)

* Be sure your PR follows [this](https://github.com/andela/tsunade-cfh/wiki/Pull-Request-Naming-and-Description-Convention) convention

* Be sure your commit messages follow [this](https://github.com/andela/tsunade-cfh/wiki/Commit-Message-Convention) convention

* Be sure your branch naming follow [this](https://github.com/andela/tsunade-cfh/wiki/Branch-Naming-Convention)  convention

* Be sure your front-end test framework is [jest](https://facebook.github.io/jest/docs/en/getting-started.html), your helper library is [enzyme](https://github.com/airbnb/enzyme), and assertion library can be [chai](http://chaijs.com/api/bdd/)

* Be sure your server-side test framework is [mocha](https://mochajs.org/), and [chai](https://mochajs.org/) asserion library.


## License
This project is authored by **Temidayo Oyedele** (temidayooyedele300@gmail.com) and is licensed for your use, modification and distribution under the **MIT** license.
[MIT][license]
<!-- Definitions -->
[license]: LICENSE
[author]: Temidayo Oyedele

### FAQs
For more details contact temidayooyedele300@gmail.com
