import express from 'express';
import dotenv from 'dotenv';
import UserController from '../controllers/UserController';
import BookController from '../controllers/BookController';
import Validations from '../helpers/Validations';

dotenv.load();
const {
  isLoggedIn,
  isAdmin,
  checkBookId,
  checkUserId,
  validateInput,
  validateLogin,
  validateSearch,
  validateUserEdit
} = Validations;
const {
  create,
  checkExistingUser,
  userHistory,
  list,
  signin,
  checkExisting,
  admin,
  editProfile
} = UserController;
const { borrow, returnBook, showBorrowed } = BookController;
const adminRoute = process.env.route;
const userRouter = express.Router();

/**
 * @swagger
 * definition:
 *   users:
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       membership:
 *         type: string
 *     example: {
 *       "email": babadee@gmail.com,
 *       "username": babadee,
 *       "password": BabAdee007,
 *       "membership": Gold
 *      }
 */

/**
 * @swagger
 * definition:
 *   search:
 *     properties:
 *       email:
 *         type: string
 *     example: {
 *       "email": babadee@gmail.com,
 *     }
 *
 */

/**
 * @swagger
 * definition:
 *   edit:
 *     properties:
 *       username:
 *         type: string
 *       oldPassword:
 *         type: string
 *       newPassword:
 *         type: string
 *     example: {
 *       "username": babadee,
 *       "oldassword": myoldpassword2020,
 *       "newPassword": mynew
 *     }
 *
 */

/**
 * @swagger
 * definition:
 *   signin:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *     example: {
 *       "username": babadee,
 *       "password": mypassword2020
 *     }
 *
 */

/**
 * @swagger
 * definitions:
 *   BorrowBook:
 *     properties:
 *       bookId:
 *         type: number
 *     example: {
 *      bookId: 13
 *      }
 */

/**
 * @swagger
 * definitions:
 *   return:
 *     properties:
 *       bookId:
 *         type: number
 *       userId:
 *         type: number
 *       book:
 *         type: object
 *     example: {
 *      bookId: 13,
 *      userId: 2,
 *      "book": {
 *         "id": 4,
 *         "title": sample title,
 *         "isbn": sample-isbn,
 *         "quantity": 4,
 *         "catId": 3,
 *         "cover": "https//imageurl/image.png",
 *         "author": babadee,
 *         "description": good book,
 *         "createdAt": 2018-01-24T22:12:30.129Z,
 *         "updatedAt": 2018-01-24T22:15:53.162Z
 *       }
 *      }
 */

userRouter.route('/') // Get all users
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users & Authentication
 *     description: Returns an array of all users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns all users
 *         example: {
 *           "users": [
 *  {
 *       "id": 1,
 *       "username": "testusernamew",
 *       "password": "$2a$10$jmu2BULd7goy9bqmVRkot",
 *       "email": "test@user.co",
 *       "isAdmin": 0,
 *       "membership": "professional",
 *       "createdAt": "2018-01-20T19:19:20.781Z",
 *       "updatedAt": "2018-01-20T19:19:20.781Z"
 *   },
 *   {
 *       "id": 2,
 *       "username": "admin",
 *       "password": "$2a$10$R3aMNiEdIQr4c0.47czWMeHJ4e.",
 *       "email": "admin@hellobooks.com",
 *       "isAdmin": 1,
 *       "membership": "admin",
 *       "createdAt": "2018-01-22T08:14:09.893Z",
 *       "updatedAt": "2018-01-22T08:14:09.893Z"
 *   },
 *           ]
 *          }
 *       401:
 *         description: User not logged in
 *         example: {
 *           "message":
 *           "Access denied, you have to be logged in to perform this operation"
 *         }
 *       403:
 *         description: Not an admin
 *         example: {
 *           "message": "Access Denied. Admin privileges needed"
 *         }
 *       500:
 *         description: server error
 *         example: {
 *           "message": "internal server error"
 *         }
 *     schema:
 *       $ref: '#/definitions/users'
 */
  .get(isAdmin, list);
userRouter.route('/:userId')
/**
 * @swagger
 * /api/v1/{userId}:
 *   get:
 *     tags:
 *       - Users & Authentication
 *     description: Get borrowing history for a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description:
 *          The id of the user to Validations his/her borrowing history
 *         in: path
 *         required: true
 *         type: number
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description:
 *          An array of all books (returned & unreturned) borrowed by the user.
 *         example: [
 *            {
 *            "message": "You have never borrowed a book"
 *            },
 *            {
 *            "id": 1,
 *            "bookId": 1,
 *            "userId": 1,
 *            "expires": "2018-02-04T19:19:21.048Z",
 *            "returnDate": "2018-01-20T19:19:21.121Z",
 *            "description": "A film about magic",
 *            "title": "HarryPorter",
 *            "cover": "testcover",
 *            "returned": true,
 *            "createdAt": "2018-01-20T19:19:21.062Z",
 *            "updatedAt": "2018-01-20T19:19:21.122Z"
 *            },
 *            {
 *            "id": 1,
 *            "bookId": 12,
 *            "userId": 1,
 *            "expires": "2018-02-04T19:19:21.048Z",
 *            "returnDate": "2018-04-20T19:19:21.121Z",
 *            "description": "A film about magic",
 *            "title": "HarryPorter",
 *            "cover": "testcover",
 *            "returned": false,
 *            "createdAt": "2018-01-20T19:19:21.062Z",
 *            "updatedAt": "2018-01-20T19:19:21.122Z"
 *            }
 *         ]
 *       401:
 *         description: User not logged in
 *         example: {
 *           "message":
 *           "Access denied, you have to be logged in to perform this operation"
 *         }
 *       500:
 *         description: server error
 *         example: {
 *           "message": "internal server error"
 *         }
 */
  .get(isLoggedIn, checkUserId, userHistory);
userRouter.route('/signup')
/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: details
 *         description: The registration details of the user
 *         in: body
 *         required: false
 *         type: string
 *         schema:
 *           $ref: '#/definitions/users'
 *     responses:
 *       201:
 *         description: Signed up successfully
 *         example: {
 *           "message": "Signed up successfully",
 *           "Token": "eyJhbGciOiJIUzI1NyQfCHic",
 *            "success": true
 *         }
 *       400:
 *         description: Invalid input(email, password...) fields
 *         example: {
 *           "message":
 *     "username is required & should contain no spaces or special characters"
 *         }
 *       409:
 *         description: Existing details
 *         example: {
 *           "message": "Username or email already exists"
 *         }
 *       500:
 *         description: server error
 *         example: {
 *           "message": "internal server error"
 *         }
 */
  .post(validateInput, create);
userRouter.route('/signin')
/**
 * @swagger
 * /api/v1/users/signin:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     description: Logs in a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: details
 *         description: The login details of the user
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/signin'
 *     responses:
 *       200:
 *         description: Log in successful
 *         example: {
 *           "message": "Log in successful",
 *           "Token": "eyJhbGciOiJIUzI1NiOiJHNDczNSwiZXhwIjoxNTE3MDExMwP-ere4"
 *         }
 *       401:
 *         description: Invalid username or password
 *         example: {
 *           message: 'Invalid username or password',
 *         }
 *       500:
 *         description: server error
 *         example: {
 *           "message": "internal server error"
 *         }
 */
  .post(validateLogin, signin);
userRouter.route('/:userId/books/:bookId')
/**
 * @swagger
 * /api/v1/users/{userId}/books/{bookId}:
 *   post:
 *     tags:
 *       - Borrowing Operations
 *     description: Users can borrow a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: The id of the user to borrow the book
 *         in: path
 *         required: true
 *         type: number
 *       - name: bookId
 *         description: The id of the book to be borrowed
 *         in: path
 *         required: true
 *         type: number
 *         schema:
 *           $ref: '#/definitions/BorrowBook'
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: success
 *         example: {
 *             "message": "You have successfully borrowed the book",
 *             "borrowed": {
 *                "id": 15,
 *                 "bookId": 2,
 *                 "userId": 1,
 *                 "description": "great book",
 *                 "cover": "https://firebasestorage.googlea1edab",
 *                 "title": "Harry Potter",
 *                 "expires": "2018-02-10T05:42:52.139Z",
 *                 "returned": false,
 *                 "returnDate": "2018-02-10T05:42:52.139Z",
 *                 "updatedAt": "2018-01-26T05:42:52.193Z",
 *                 "createdAt": "2018-01-26T05:42:52.193Z"
 *               }
 *         }
 *       401:
 *         description: User not logged in
 *         example: {
 *           "message":
 *           "Access denied, you have to be logged in to perform this operation"
 *         }
 *       404:
 *         description: Not found
 *         example: {
 *           "message": "Wrong book id. Not in database."
 *         }
 *       422:
 *         description: Book already borrowed and not returned
 *         example: {
 *           "message": 'You cant borrow this book again till you return'
 *         }
 *       500:
 *         description: server error
 *         example: {
 *           "message": "internal server error"
 *         }
 */
  .post(isLoggedIn, checkBookId, checkUserId, borrow);
userRouter.route('/:userId/books/:bookId')
/**
 * @swagger
 * /api/v1/users/{userId}/books/{bookId}:
 *   put:
 *     tags:
 *       - Borrowing Operations
 *     description: Users can return a borrowed book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: The id of the user returning the book
 *         in: path
 *         required: true
 *         type: number
 *       - name: bookId
 *         description: The id of the book to be returned
 *         in: path
 *         required: true
 *         type: number
 *         schema:
 *           $ref: '#/definitions/return'
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: false
 *         type: string
 *     responses:
 *       201:
 *         description: Book returned!
 *         example: {
 *             "message": "Book returned successfully",
 *             "book": {
 *                 "id": 4,
 *                 "title": "hgjdchdbcdkcndkcbndskcjnsdckl",
 *                 "isbn": "122bxsbs,sd",
 *                 "quantity": 11,
 *                 "catId": 5,
 *                 "cover": "https://firebasestorage.fab",
 *                 "author": "babadee",
 *                 "description": "12bsjkd jmsd",
 *                 "createdAt": "2018-01-24T22:12:30.129Z",
 *                 "updatedAt": "2018-01-24T22:15:53.162Z"
 *              }
 *         }
 *       401:
 *         description: User not logged in
 *         example: {
 *           "message":
 *           "Access denied, you have to be logged in to perform this operation"
 *         }
 *       500:
 *         description: server error
 *         example: {
 *           "message": "internal server error"
 *         }
 */
  .put(isLoggedIn, checkUserId, checkBookId, returnBook);
userRouter.route('/:userId/books')
/**
 * @swagger
 * /api/v1/users/{userId}/books?returned=false:
 *   get:
 *     tags:
 *       - Borrowing Operations
 *     description: Show books borrowed but not returned
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: The id of the user to check his/her unreturned history
 *         in: path
 *         required: true
 *         type: number
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description:
 *          An array of books borrowed but not returned
 *         example: {
 *           "books": [
 *           {
 *           "id": 13,
 *           "bookId": 3,
 *           "userId": 4,
 *           "expires": "2018-02-08T22:28:39.924Z",
 *           "returnDate": "2018-02-08T22:28:39.924Z",
 *           "description": "badass",
 *           "title": "snsbd",
 *           "cover": "https://firebasestoraalt=media&tc5-624439067d3a",
 *           "returned": false,
 *          "createdAt": "2018-01-24T22:28:39.971Z",
 *           "updatedAt": "2018-01-24T22:28:39.971Z"
 *           },
 *         ]}
 *       401:
 *         description: User not logged in
 *         example: {
 *           "message":
 *           "Access denied, you have to be logged in to perform this operation"
 *         }
 *       500:
 *         description: server error
 *         example: {
 *           "message": "internal server error"
 *         }
 */
  .get(isLoggedIn, checkUserId, showBorrowed);

userRouter.route('/checkuser')
  .post(validateSearch, checkExistingUser);

userRouter.route('/existing')
  /**
   * @swagger
   * /api/v1/users/Validationsuser:
   *   post:
   *     tags:
   *       - Users & Authentication
   *     description: Validationss for existing email in the database
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: details
   *         description: The registration details of the user
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/search'
   *     responses:
   *       200:
   *         description: success
   *         example: {
   *           "message": {
   *             "id": 58,
   *             "username": "testo",
   *             "password": "$2a$10$a0wdFN4eCL7XLi",
   *             "email": "test@hellobooks.com",
   *             "isAdmin": 0,
   *             "membership": "admin",
   *             "createdAt": "2018-01-25T23:49:06.336Z",
   *             "updatedAt": "2018-01-25T23:49:06.336Z"
   *           }
   *         }
   *       500:
   *         description: server error
   *         example: {
   *           "message": "internal server error"
   *         }
   */
  .post(validateSearch, checkExisting);

userRouter.route('/edit/:userId')
/**
    * @swagger
    * /users/edit/{userId}:
    *   put:
    *     tags:
    *       - Users & Authentication
    *     description: modify user details
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: details
    *         description: The details to be modified
    *         in: body
    *         required: true
    *         type: string
    *         schema:
    *           $ref: '#/definitions/edit'
    *     responses:
    *       201:
    *         description: success
    *         example: {
    *            "message": "profile updated succesfully",
    *            "updated": {
    *               "id": 12,
    *                "username": "hoyt",
    *                "password": "$2a$10$VL3WpYKYoJJOa0WWt4RI.",
    *                "email": "Cesar62@gmail.com",
    *                "isAdmin": 0,
    *                "membership": "Gold",
    *                "createdAt": "2018-01-24T14:27:50.102Z",
    *                "updatedAt": "2018-01-26T06:28:57.249Z"
    *              }
    *         }
    *       404:
    *        description: incorrect old password
    *        example: {
    *          "message": Old password is incorrect
    *         }
    *       409:
    *         description: new username exists
    *         example: {
    *           "message": Username exists. Try another one
    *          }
    *       500:
    *         description: server error
    *         example: {
    *           "message": "internal server error"
    *         }
    */
  .put(isLoggedIn, checkUserId, validateUserEdit, editProfile);
export default userRouter;
