import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/';

dotenv.load();
const secret = process.env.SECRETKEY;

const { Users, Borrowed } = db;

const UserController = {
  /**
   * @method create
   *
   * @description This method handles creation of new users request
   *
   * @param { object} req HTTP request
   *
   * @param { object} res HTTP response
   *
   * @returns { object } response message
   */
  create(req, res) {
    const user = req.body.username.toLowerCase();
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    return Users
      .create({
        username: user,
        email: req.body.email,
        password: hashedPassword,
        membership: req.body.membership,
      })
      .then((user) => {
        const currentUser = {
          userId: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
          email: user.email,
          membership: user.membership };
        const token = jwt.sign(
          { currentUser,
          }, secret, { expiresIn: 60 * 60 * 24 }
        );
        return res.status(201).send({
          message: 'Signed up successfully',
          Token: token,
          success: true,
          currentUser
        });
      })
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          if (error.fields.username) {
            res.status(409).json({
              message: 'Username or email already exists',
            });
          } else if (error.fields.email) {
            res.status(409).json({
              message: 'Username or email already exists',
            });
          } else {
            res.status(500).json({
              message: 'An error has occured. Please try again later',
              error
            });
          }
        }
      });
  },

  /**
   * @method list
   *
   * @description This method handles getting all registered users request
   *
   * @param { object} req HTTP request
   *
   * @param { object} res HTTP response
   *
   * @returns { object } response message
   */
  list(req, res) {
    return Users
      .all()
      .then(users => res.status(200).send({
        users
      })).catch(error => res.status(500).send({
        message: 'An error has occured. Please try again later',
        error
      }));
  },

  /**
   * @method signin
   *
   * @description This method handles authentication of users request
   *
   * @param { object} req HTTP request
   *
   * @param { object} res HTTP response
   *
   * @returns { object } response message
   */
  signin(req, res) {
    const user = req.body.username.toLowerCase();
    return Users
      .findOne({
        where: { username: user },
      })
      .then((user) => {
        const currentUser = {
          userId: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          membership: user.membership };
        const token = jwt.sign(
          {
            currentUser,
          },
          secret, { expiresIn: 60 * 60 * 24 }
        );
        res.status(200)
          .json({
            message: 'Log in successful',
            Token: token,
          });
      }).catch(error => res.status(500).send({
        message: 'An error has occured. Please try again later',
        error
      }));
  },
  /**
   * @method checkExistingUser
   *
   * @description This method handles checking of existing username request
   *
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   *
   * @returns { object } response message
   */
  checkExistingUser(req, res) {
    return Users
      .findOne({
        where: {
          username: req.body.searchTerm
        },
      })
      .then((user) => {
        res.status(200).json({
          message: user
        });
      }).catch(error => res.status(500).send({
        message: 'An error has occured. Please try again later',
        error
      }));
  },

  /**
   * @method userHistory
   *
   * @description This method handles getting history of users request
   *
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   *
   * @returns { object } response message
   */
  userHistory(req, res) {
    return Borrowed
      .findAll({
        where: {
          userId: req.params.userId,
        },
      })
      .then((books) => {
        if (books.length < 1) {
          res.status(200).send({
            message: 'You have never borrowed a book',
          });
        } else {
          res.status(200).send(books);
        }
      })
      .catch(error => res.status(500).send({
        message: 'An error has occured. Please try again later',
        error
      }));
  },

  /**
   * @method checkExisting
   *
   * @description This method handles checking of existing users request
   *
   * @param { object} req HTTP request
   * @param { object} res HTTP response
   *
   * @returns { object } response message
   */
  checkExisting(req, res) {
    return Users
      .findOne({
        where: {
          email: req.body.searchTerm
        },
      })
      .then((user) => {
        if (user) {
          res.status(200).json({
            message: user
          });
        }
        res.status(404).json({
          message: 'Email not found'
        });
      }).catch(error => res.status(500).send({
        message: 'An error has occured. Please try again later',
        error
      }));
  },

  /**
   *
   * @description - Edit profile controller
   *
   * @param {Object} req - request
   * @param {Object} res - response
   *
   * @returns {Object} - Object containing status code and success message
   */
  editProfile(req, res) {
    return Users.findOne({
      where: {
        id: req.params.userId
      }
    }).then((user) => {
      if (user) {
        if (req.body.oldPassword || req.body.newPassword) {
          if (req.body.oldPassword &&
            !bcrypt.compareSync(req.body.oldPassword, user.password)) {
            res.status(400).send({
              message: 'Old password is incorrect'
            });
          } else {
            const password = bcrypt.hashSync(req.body.newPassword, 10);
            return user.update({
              username: req.body.username || user.username,
              password
            }).then((updated) => {
              res.status(200).json({
                message: 'profile updated succesfully',
                updated
              });
            });
          }
        } else {
          return user.update({
            username: req.body.username || user.username,
            password: user.password
          }).then((updated) => {
            res.status(200).json({
              message: 'profile updated succesfully',
              updated
            });
          })
            .catch((error) => {
              if (error.name === 'SequelizeUniqueConstraintError') {
                if (error.fields.username) {
                  res.status(409).json({
                    message: 'Username exists. Try another one',
                  });
                }
              } else {
                res.status(500).json({
                  message: 'An error has occured. Please try again later',
                  error
                });
              }
            });
        }
      } else {
        return res.status(404).json({
          message: 'User not in database'
        });
      }
    }).catch(error => res.status(500).send({
      message: 'An error has occured. Please try again later',
      error
    }));
  }
};
export default UserController;
