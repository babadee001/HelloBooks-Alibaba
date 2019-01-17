import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';

dotenv.load();
const secret = process.env.SECRETKEY;
const { Users, Books } = db;

const Validations = {
  /**
   * @method validateInput
   *
   * @description This method handles validation of users input
   *
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   * @param {Function} next - Call back function
   *
   * @returns { object } response message
   */
  validateInput(req, res, next) {
    req.checkBody(
      {
        username: {
          notEmpty: true,
          isLength: {
            options: [{ min: 3 }],
            errorMessage: 'Username is required',
          },
          errorMessage: 'username is required with no special characters',
        },
        password: {
          notEmpty: true,
          isLength: {
            options: [{ min: 4 }],
            errorMessage: 'password should be at least four characters',
          },
          errorMessage: 'password field is required with no special characters',
        },
        email: {
          isEmail: true,
          notEmpty: true,
          errorMessage: 'Enter a valid email',
        },
        membership: {
          isAlpha: false,
          notEmpty: true,
          errorMessage: 'Membership is required, must be alphabet & not empty',
        },
      }
    );
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    req.userInput = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      membership: req.body.membership,
    };
    next();
  },

  /**
   * @method validateLogin
   *
   * @description This method handles validation of login input
   *
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   * @param {Function} next - Call back function
   *
   * @returns { object } response message
   */
  validateLogin(req, res, next) {
    req.checkBody(
      {
        username: {
          notEmpty: true,
          isAlphanumeric: false,
          errorMessage: 'Enter a valid username',
        },
        password: {
          notEmpty: true,
          isAlphanumeric: false,
          errorMessage: 'Enter a valid password',
        },
      });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    Users.findOne(
      {
        where: {
          username: req.body.username.toLowerCase(),
        },
      })
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          next();
        } else {
          return res.status(401)
            .json({
              message: 'Invalid username or password',
            });
        }
      }).catch(error => res.status(500).send({
        message: 'An error has occured. Please try again later',
        error
      }));
  },

  /**
   * @method validateBook
   *
   * @description This method handles validations of book input
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   * @param {Function} next - Call back function
   *
   * @returns { object } response message
   */
  validateBook(req, res, next) {
    req.checkBody(
      {
        cover: {
          notEmpty: true,
          errorMessage: 'Please upload a cover',
        },
        catId: {
          notEmpty: true,
          errorMessage: 'Please select a category',
        },
        title: {
          notEmpty: true,
          errorMessage: 'Enter a valid title',
        },
        description: {
          notEmpty: true,
          errorMessage: 'Enter a valid description',
        },
        quantity: {
          notEmpty: true,
          isNumeric: false,
          isInt: {
            options: [{ min: 1 }],
            errorMessage: "quantity can't be less than 1",
          },
          errorMessage: 'Enter a valid quantity',
        },
        author: {
          notEmpty: true,
          errorMessage: 'Enter valid author name',
        },
        isbn: {
          notEmpty: true,
          errorMessage: 'ISBN is required'
        },
      });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },

  /**
   * @method isLoggedIn
   *
   * @description This method checks for logged in users
   *
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   * @param {Function} next - Call back function
   *
   * @returns { object } response message
   */
  isLoggedIn(req, res, next) {
    const token = req.headers.authorization || req.headers.xaccesstoken;
    if (token) {
      jwt.verify(token, secret, (error) => {
        if (error) {
          res.status(401)
            .send({
              message: 'Access Denied. Invalid token supplied'
            });
        } else {
          next();
        }
      });
    } else {
      return res.status(401)
        .send({
          message: 'Access denied, you have to be logged for this operation',
        });
    }
  },

  /**
   * @method isAdmin
   *
   * @description This method handles check for admin authentication of users
   *
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   * @param {Function} next - Call back function
   *
   * @returns { object } response message
   */
  isAdmin(req, res, next) {
    const token = req.headers.authorization || req.headers.xaccesstoken;
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded.currentUser.isAdmin === 1) {
        next();
      } else {
        res.status(403)
          .json({
            message: 'Operation failed. Admin privileges needed.'
          });
      }
    } else {
      return res.status(401)
        .send({
          message: 'Access denied, you have to be logged for this operation',
        });
    }
  },

  /**
   * @method validateSearch
   *
   * @description This method handles check for admin authentication of users
   *
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   * @param {Function} next - Call back function
   *
   * @returns { object } response message
   */
  validateSearch(req, res, next) {
    req.checkBody(
      { searchTerm: {
        notEmpty: true,
        errorMessage: 'Enter a valid search term',
      },
      });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },
  /**
   * Validates user data when editing profile
   *
   * @param {Object} req - request object
   * @param {Object} res - repsonse object
   * @param {Function} next - Call back function
   *
   * @returns {Object} - Response object
   */
  validateUserEdit(req, res, next) {
    if ((req.body.newPassword && !req.body.oldPassword) || (req.body.oldPassword && !req.body.newPassword)) {
      return res.status(400).send({
        message: 'Old and new passwords required',
      });
    }
    req.checkBody(
      {
        username: {
          notEmpty: true,
          errorMessage: 'Enter a valid username',
          isLength: {
            options: [{ min: 3 }],
            errorMessage: 'New username should be at least 3 characters',
          },
        },
      });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    const usernameValidator = /[A-Za-z]/g;

    if (!usernameValidator.test(req.body.username)) {
      res.status(400).send({
        message: 'Invalid data supplied pls check and try again'
      });
    }
    next();
  },

  /**
 * Checks if book id is a number
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @param {Function} next - Call back function
 *
 * @returns { Object } - containing error message
 */
  checkBookId(req, res, next) {
    const querier = req.body.bookId || req.params.bookId;
    if (!querier || /[\D]/.test(querier)) {
      return res.status(400).send({
        message: 'Invalid book id supplied!!!'
      });
    }
    next();
  },
  /**
 * Checks if user id is a number
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @param {Function} next - Call back function
 *
 * @returns { Object } - containing error message
 */
  checkUserId(req, res, next) {
    const querier = req.body.userId || req.params.userId;
    if (!querier || /[\D]/.test(querier)) {
      return res.status(400).send({
        message: 'Invalid user id supplied!!!'
      });
    }
    next();
  },

  /**
   * @method validateCategory
   *
   * @description This method handles validations of category input
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   * @param {Function} next - Call back function
   *
   * @returns { object } response message
   */
  validateCategory(req, res, next) {
    req.checkBody(
      {
        name: {
          notEmpty: true,
          errorMessage: 'Please select a category name',
        },
        description: {
          notEmpty: true,
          errorMessage: 'Enter a valid category description',
        },
      });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },

  /**
   * Sends user input to the add book controller
   *
   * @param {Object} req - request
   * @param {Object} res - response
   * @param {Object} next - Callback function
   *
   * @returns {Object} - Object containing book inout
   */
  sendBookInput(req, res, next) {
    Books.findOne({
      where: {
        isbn: req.body.isbn
      }
    })
      .then((book) => {
        if (book) {
          return res.status(409).send({
            message: 'Book with that ISBN already exist'
          });
        }
      }).catch(error => res.status(500).send({
        message: 'An error has occured. Please try again later',
        error
      }));
    req.userInput = {
      title: req.body.title,
      isbn: req.body.isbn,
      cover: req.body.cover,
      author: req.body.author,
      description: req.body.description,
      catId: req.body.catId,
      quantity: req.body.quantity
    };
    next();
  },
  /**
   * @method validateEdit
   *
   * @description This method handles validations of book input
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   * @param {Function} next - Call back function
   *
   * @returns { object } response message
   */
  validateEdit(req, res, next) {
    req.checkBody(
      {
        catId: {
          notEmpty: true,
          errorMessage: 'Please select a category',
        },
        title: {
          notEmpty: true,
          errorMessage: 'Enter a valid title',
        },
        description: {
          notEmpty: true,
          errorMessage: 'Enter a valid description',
        },
        quantity: {
          notEmpty: true,
          isNumeric: false,
          isInt: {
            options: [{ min: 1 }],
            errorMessage: "quantity can't be less than 1",
          },
          errorMessage: 'Enter a valid quantity',
        },
        author: {
          notEmpty: true,
          errorMessage: 'Enter valid author name',
        },
        isbn: {
          notEmpty: true,
          errorMessage: 'ISBN is required'
        },
      });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },
};
export default Validations;
