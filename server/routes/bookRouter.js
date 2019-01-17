import express from 'express';
import dotenv from 'dotenv';
import BookController from '../controllers/BookController';
import Validations from '../helpers/Validations';

const bookRouter = express.Router();
const {
  isAdmin,
  isLoggedIn,
  checkBookId,
  validateBook,
  validateCategory,
  sendBookInput,
  validateEdit
} = Validations;
const {
  list,
  listBorrowed,
  edit,
  erase,
  create,
  addCategory,
  getCategory
} = BookController;
dotenv.load(); // Get all books
/**
 * @swagger
 * definition:
 *   Book:
 *     properties:
 *       isbn:
 *         type: number
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       category:
 *         type: string
 *       description:
 *         type: string
 *       quantity:
 *         type: number
 *       cover:
 *         type: string
 *     example: {
 *       isbn: 123-isbn-1992,
 *       title: Think rich to grow rich,
 *       author: Napoleon Hill,
 *       description: This is a sample book description,
 *       quantity: 10,
 *       cover: http://example.com/img/cover.jpg,
 *       category: Action
 *     }
 */

/**
 * @swagger
 * definition:
 *   Borrowing History:
 *     properties:
 *       bookId:
 *         type: number
 *     example: {
 *      bookId: 13
 *      }
 */

/**
 * @swagger
 * definition:
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
 * /books:
 *   get:
 *     tags:
 *       - Book Operations
 *     description: Returns all books
 *     produces:
 *       - bookslication/json
 *     parameters:
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Book'
 *     responses:
 *       200:
 *         description: An array of books
 *         example: {
 *           "books": [
 *             {
 *            "id": 3,
 *            "title": "snsbd",
 *            "isbn": "sdnbsbnsbns",
 *            "quantity": 11,
 *            "catId": 4,
 *            "cover": "https://samplecover.com/babadee.jpg",
 *            "author": "babadee",
 *            "description": "badass",
 *            "createdAt": "2018-01-23T10:06:02.831Z",
 *            "updatedAt": "2018-01-24T22:28:40.005Z"
 *   },
 *        {
 *            "id": 2,
 *            "title": "Harry Potter",
 *            "isbn": "bmhgdsfrt54678sfghj",
 *            "quantity": 11,
 *            "catId": 3,
*             "cover": "https://samplecover.com/babadee.jpg",
*             "author": "babadee",
*             "description": "great book",
*             "createdAt": "2018-01-22T16:50:31.506Z",
*             "updatedAt": "2018-01-24T22:28:42.556Z"
*         },
*         {
*             "id": 4,
*             "title": "Mirror",
*             "isbn": "122bxsbs,sd",
*             "quantity": 11,
*             "catId": 5,
*             "cover": "https://samplecover.com/babadee.jpg",
*             "author": "babadee",
*             "description": "12bsjkd jmsd",
*             "createdAt": "2018-01-24T22:12:30.129Z",
*             "updatedAt": "2018-01-24T22:15:53.162Z"
*              }
*           ]
*           }
*       401:
*         description: Invalid token provided or User not logged in
*         example: {
*           "message":
*           "Access denied, you have to be logged in to perform this operation"
*          }
*       500:
*         description: Internal server error
*         example: {
*           "message": "Internal Server Error"
}
 */
bookRouter.route('/')
  .get(isLoggedIn, list);
bookRouter.route('/')
/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Book Operations
 *     description: Adds a new book to the database
 *     produces:
 *       - bookslication/json
 *     parameters:
 *       - name: book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *       - name: xaccesstoken
 *         in: header
 *         description: an authentication token
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Book uploaded successfully
 *         example: {
 *               "message": "Book added successfully",
 *               "newBook": {
 *               "id": 11,
 *               "title": "This is a test",
 *               "isbn": "test-isbn",
 *               "cover": "https://samplecover.com/babadee.jpeg",
 *               "author": "Temi Lajumoke",
 *               "description": "This is a good book",
 *               "categoryId": 1,
 *               "quantity": 1,
 *               "updatedAt": "2018-01-05T16:07:09.885Z",
 *               "createdAt": "2018-01-05T16:07:09.885Z"
 *    }
 *  }
 *       400:
 *         description: Bad input supplied
 *         example: {
 *               "message": "All required fields must exist",
 *               "errors": {
 *               "isbn": "This field is required",
 *               "title": "This field is required",
 *               "author": "This field is required",
 *               "description": "This field is required",
 *               "category": "This field is required",
 *               "quantity":
 *               "This field is required OR quantity must not be less than zero"
 *    }
 *   }
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 *         example: {
 *               "message": "Internal Server Error"
 * }
 */
  .post(validateBook, isAdmin, sendBookInput, create);
bookRouter.route('/:bookId')
/**
 * @swagger
 * /books/{bookId}:
 *   put:
 *     tags:
 *       - Book Operations
 *     description: Modify an already a book information
 *     produces:
 *       - bookslication/json
 *     parameters:
 *       - name: bookId
 *         description: ID of the Book
 *         in: path
 *         required: true
 *         type: number
 *       - name: book
 *         description: Book object with updated information
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *           type: object
 *           required:
 *             - bookId
 *           properties:
 *             bookId:
 *               type: number
 *           example: {
 *              bookId: 4
 *           }
 *       - name: xaccesstoken
 *         in: header
 *         description: an authentication token for the request
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Book Successfully modified
 *         example: {
 *       "message": 'Book updated successfully!',
 *       "book": {
 *        "id": 11,
 *        "title": "sample title",
 *      "quantity": 6,
 *       "isbn": "sample-isbn",
 *       "categoryId": 1,
 *        "cover": "https://samplecover.com/babadee.jpg",
 *        "author": "Temi Chieze",
 *        "description": "Best selling book",
 *        "createdAt": "2018-01-05T16:07:09.885Z",
 *        "updatedAt": "2018-01-05T16:46:56.067Z"
 *    },
 * }
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */
  .put(isAdmin, checkBookId, validateEdit, edit);
bookRouter.route('/:bookId')
/**
 * @swagger
 * /books/{bookId}:
 *   delete:
 *     tags:
 *       - Book Operations
 *     description: Delete a specified Book
 *     produces:
 *       - bookslication/json
 *     parameters:
 *       - name: bookId
 *         description: ID of Book to delete
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/BorrowBook'
 *           type: object
 *           required:
 *             - bookId
 *           properties:
 *             bookId:
 *               type: number
 *           example: {
 *             "bookId": 4
 *           }
 *       - name: xaccesstoken
 *         in: header
 *         description: an authentication token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *         example: {
 *           "message": "book deleted",
 *           "id": "4"
 *       }
 *       404:
 *         description: Book not found
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */
  .delete(isAdmin, checkBookId, erase);
/**
 * @swagger
 * /books/borrowed:
 *   get:
 *     tags:
 *       - Borrowing Operations
 *     description: Returns all books in the borrowed table
 *     produces:
 *       - bookslication/json
 *     parameters:
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Book'
 *     responses:
 *       200:
 *         description: An array of books
 *         example: {
 *       "books":[    {
 *       "id": 1,
 *       "bookId": 1,
 *       "userId": 1,
 *       "expires": "2018-02-04T19:19:21.048Z",
 *       "returnDate": "2018-01-20T19:19:21.121Z",
 *       "description": "A film about magic",
 *        "title": "HarryPorter",
 *       "cover": "testcover",
 *       "returned": true,
 *       "createdAt": "2018-01-20T19:19:21.062Z",
 *       "updatedAt": "2018-01-20T19:19:21.122Z"
 *   },
 *   {
 *       "id": 2,
 *       "bookId": 2,
 *       "userId": 24,
 *       "expires": "2018-02-08T15:03:01.190Z",
 *       "returnDate": "2018-01-24T15:03:01.746Z",
 *       "description": "great book",
 *       "title": "Harry Potter",
 *       "cover": "https://bookcover.com.test.jpeg",
 *       "returned": true,
 *       "createdAt": "2018-01-24T15:03:01.252Z",
 *       "updatedAt": "2018-01-24T15:03:01.746Z"
 *   },]
 *     }
 *       401:
 *         description: Invalid token provided or User not logged in
 *       500:
 *         description: Internal server error
 */
bookRouter.route('/borrowed')
  .get(isAdmin, listBorrowed);
/**
 * @swagger
 * /books/category:
 *   post:
 *     tags:
 *       - Book Operations
 *     description: Adds a new category to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: category
 *         description: Category object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *       - name: xaccesstoken
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Category added successfully
 *         example: {
 *          "message": "Category added successfully",
 *        "newCategory": {
 *        "id": 24,
 *        "description": "This is a test for me",
 *        "updatedAt": "2018-01-05T16:50:49.384Z",
 *        "createdAt": "2018-01-05T16:50:49.384Z",
 *        "name": Science & Arts
 *   }
* }
 *       400:
 *         description: Bad input supplied
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */
bookRouter.route('/category')
  .post(isLoggedIn, isAdmin, validateCategory, addCategory);

/**
 * @swagger
 * /books/category:
 *   get:
 *     tags:
 *       - Book Operations
 *     description: Returns all Category in the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: xaccesstoken
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns An array of Categories
 *         schema:
 *           $ref: '#/definitions/CategoryList'
 *       401:
 *         description: Invalid token supplied
 *       500:
 *         description: Internal server error
 */
bookRouter.route('/category')
  .get(isLoggedIn, getCategory);
export default bookRouter;
