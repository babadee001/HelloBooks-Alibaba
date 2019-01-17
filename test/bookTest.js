import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import Server from '../app';
import models from '../server/models';

dotenv.load();
process.env.NODE_ENV = 'test';
const should = chai.should();
const { adminToken, userToken } = process.env;

chai.use(chaiHttp);
before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Given /POST /api/v1/books', () => {
  describe('When I want to add a book', () => {
    it('should return the book added', (done) => {
      chai.request(Server)
        .post('/api/v1/books/')
        .set('xaccesstoken', adminToken)
        .send({
          title: 'HarryPorter',
          author: 'babadee',
          description: 'A film about magic',
          catId: 2,
          quantity: '5',
          cover: 'testcover',
          isbn: '123456-555'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.message.should.equal('Book added successfully');
          res.body.newBook.title.should.equal('HarryPorter');
          res.body.newBook.author.should.equal('babadee');
          res.body.newBook.description.should.equal('A film about magic');
          res.body.newBook.catId.should.equal(2);
          res.body.newBook.quantity.should.equal(5);
          res.body.newBook.cover.should.equal('testcover');
          res.body.newBook.isbn.should.equal('123456-555');
          res.body.newBook.id.should.eql(1);
          res.body.newBook.cover.should.eql('testcover');
          done();
        });
    });
    it('should not add book for unauthorized users', (done) => {
      chai.request(Server)
        .post('/api/v1/books/')
        .set('xaccesstoken', userToken)
        .send({
          title: 'HarryPorter',
          author: 'babadee',
          description: 'A film about magic',
          catId: 2,
          quantity: '5',
          cover: 'testcover',
          isbn: '123456-555'
        })
        .end((err, res) => {
          res.should.have.status(403);
          res
            .body
            .message
            .should
            .equal('Operation failed. Admin privileges needed.');
          done();
        });
    });
    it('should not add book with no token', (done) => {
      chai.request(Server)
        .post('/api/v1/books/')
        .send({
          title: 'HarryPorter',
          author: 'babadee',
          description: 'A film about magic',
          catId: 2,
          quantity: '5',
          cover: 'testcover',
          isbn: '123456-555'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res
            .body
            .message
            .should
            .equal('Access denied, you have to be logged for this operation');
          done();
        });
    });
    it('Should not add a book without category', (done) => {
      chai.request(Server)
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('xaccesstoken', adminToken)
        .set('Content-Type', 'application/json')
        .send({
          title: 'HarryPorter',
          author: 'babadee',
          description: 'A film about magic',
          quantity: '5',
          cover: 'testcover',
          isbn: '123456-555'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Please select a category');
          done();
        });
    });
  });
});

describe('Given /GET /api/v1/books', () => {
  describe('When I want to get all books', () => {
    it('Should return all books in the library', (done) => {
      chai.request(Server)
        .get('/api/v1/books/')
        .set('xaccesstoken', userToken)
        .end((err, res) => {
          res.status.should.equals(200);
          res.body[0].title.should.equal('HarryPorter');
          res.body[0].author.should.equal('babadee');
          res.body[0].description.should.equal('A film about magic');
          res.body[0].catId.should.equal(2);
          res.body[0].quantity.should.equal(5);
          res.body[0].cover.should.equal('testcover');
          res.body[0].isbn.should.equal('123456-555');
          res.body.length.should.equals(1);
          done();
        });
    });
    it('Should not return books for non logged in users', (done) => {
      chai.request(Server)
        .get('/api/v1/books/')
        .end((err, res) => {
          res.status.should.equals(401);
          res.should.be.json;
          res
            .body
            .message
            .should
            .equal('Access denied, you have to be logged for this operation');
          done();
        });
    });
    it('Should not return books when I supply an invalid token', (done) => {
      chai.request(Server)
        .get('/api/v1/books/')
        .set('xaccesstoken', 'faketoken')
        .end((err, res) => {
          res.status.should.equals(401);
          res.should.be.json;
          res.body.message.should.equal('Access Denied. Invalid token supplied');
          done();
        });
    });
  });
});

describe('Given /api/v1/books/category', () => {
  describe('When I want to add a category', () => {
    it('Should return the category added', (done) => {
      chai.request(Server)
        .post('/api/v1/books/category')
        .set('xaccesstoken', adminToken)
        .send({
          name: 'Action',
          description: 'Not boring stuffs'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.message.should.equal('Category added successfully');
          res.body.newCategory.name.should.equal('Action');
          res.body.newCategory.description.should.equal('Not boring stuffs');
          done();
        });
    });
    it('Should not add new category with existing name', (done) => {
      chai.request(Server)
        .post('/api/v1/books/category')
        .set('xaccesstoken', adminToken)
        .send({
          name: 'Action',
          description: 'Not boring stuffs'
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.message.should.equal('Category with that name exists');
          done();
        });
    });
    it('Should not add new category by non admins', (done) => {
      chai.request(Server)
        .post('/api/v1/books/category')
        .set('xaccesstoken', userToken)
        .send({
          name: 'Epic',
          description: 'Good category'
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res
            .body
            .message
            .should
            .equal('Operation failed. Admin privileges needed.');
          done();
        });
    });
    it('Should not add new category with no name', (done) => {
      chai.request(Server)
        .post('/api/v1/books/category')
        .set('xaccesstoken', adminToken)
        .send({
          description: 'Good category with empty name'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res
            .body
            .message
            .should
            .equal('Please select a category name');
          done();
        });
    });
  });
  describe('When I want to get all available categories', () => {
    it('Should return all available categories', (done) => {
      chai.request(Server)
        .get('/api/v1/books/category')
        .set('xaccesstoken', adminToken)
        .send({
          name: 'Action',
          description: 'Not boring stuffs'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].description.should.equal('Not boring stuffs');
          res.body[0].name.should.equal('Action');
          done();
        });
    });
  });
});

describe('Given /api/v1/users/1/books/1', () => {
  describe('When I want to borrow a book', () => {
    it('Should return the book borrowed', (done) => {
      chai.request(Server)
        .post('/api/v1/users/1/books/1')
        .set('xaccesstoken', userToken)
        .end((err, res) => {
          res.should.have.status(201);
          res
            .body
            .message
            .should
            .equal('You have successfully borrowed the book');
          res.body.borrowed.title.should.eql('HarryPorter');
          res.body.borrowed.cover.should.eql('testcover');
          res.body.borrowed.description.should.eql('A film about magic');
          res.body.borrowed.bookId.should.eql(1);
          res.body.borrowed.userId.should.eql(1);
          res.body.borrowed.returned.should.eql(false);
          done();
        });
    });
    it('Should not borrow same book again without returning', (done) => {
      chai.request(Server)
        .post('/api/v1/users/1/books/1')
        .set('xaccesstoken', userToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.should.be.a('object');
          res
            .body
            .message
            .should
            .equal('You cant borrow this book again till you return');
          done();
        });
    });
    it('Should not borrow book with wrong bookId', (done) => {
      chai.request(Server)
        .post('/api/v1/users/1/books/100')
        .set('xaccesstoken', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('Wrong book id. Not in database.');
          done();
        });
    });
    it('Should decline borrow request from unauthenticated users', (done) => {
      chai.request(Server)
        .post('/api/v1/users/1/books/1')
        .end((err, res) => {
          res.should.have.status(401);
          res
            .body
            .message
            .should
            .equal('Access denied, you have to be logged for this operation');
          done();
        });
    });
    it('Should not allow users with invalid token to borrow book', (done) => {
      chai.request(Server)
        .post('/api/v1/users/1/books/1')
        .set('xaccesstoken', 'wrongtoken')
        .end((err, res) => {
          res.should.have.status(401);
          res
            .body
            .message
            .should
            .equal('Access Denied. Invalid token supplied');
          done();
        });
    });
  });
  describe('When i want to return a borrowed book', () => {
    it('Should return the returned book', (done) => {
      chai.request(Server)
        .put('/api/v1/users/1/books/1')
        .set('xaccesstoken', userToken)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.equal('Book returned successfully');
          res.body.book.title.should.eql('HarryPorter');
          res.body.book.cover.should.eql('testcover');
          res.body.book.description.should.eql('A film about magic');
          res.body.book.catId.should.eql(2);
          res.body.book.author.should.eql('babadee');
          res.body.book.isbn.should.eql('123456-555');
          res.body.book.quantity.should.eql(4);
          done();
        });
    });
  });
  describe('When I want  get all books yet to be returned', () => {
    it('Should return all books returned', (done) => {
      chai.request(Server)
        .get('/api/v1/users/1/books')
        .set('xaccesstoken', userToken)
        .end((err, res) => {
          res.status.should.equals(200);
          res.body.count.should.eql(0);
          res.body.message.should.equal('All books returned');
          done();
        });
    });
  });
});

describe('Given /PUT /api/v1/books', () => {
  describe('When I want to update a book', () => {
    it('Should return the updated book', (done) => {
      chai.request(Server)
        .put('/api/v1/books/1')
        .set('xaccesstoken', adminToken)
        .send({
          title: 'HarryPorterrrr',
          author: 'babadeewwww',
          description: 'A film about magic',
          quantity: '25',
          cover: 'newtestcover',
          catId: 3,
          isbn: '123-abc'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Book updated successfully!');
          res.body.book.title.should.equal('HarryPorterrrr');
          res.body.book.description.should.equal('A film about magic');
          res.body.book.quantity.should.equal(25);
          res.body.book.cover.should.equal('newtestcover');
          done();
        });
    });
    it('Should not modify book as non admin user', (done) => {
      chai.request(Server)
        .put('/api/v1/books/1')
        .set('xaccesstoken', userToken)
        .send({
          title: 'HarryPorterrrr',
          author: 'babadeewwww',
          description: 'A film about magic',
          category: 'Magic and fantasy',
          quantity: '25',
        })
        .end((err, res) => {
          res.should.have.status(403);
          res
            .body
            .message
            .should.equal('Operation failed. Admin privileges needed.');
          done();
        });
    });
    it('Should not modify book with wrong details', (done) => {
      chai.request(Server)
        .put('/api/v1/books/1')
        .set('xaccesstoken', adminToken)
        .send({
          title: 'HarryPorterrrr',
          author: 'babadeewwww',
          description: 'A film about magic',
          quantity: '25',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res
            .body
            .message
            .should.equal('Please select a category');
          done();
        });
    });
  });
});

describe('Given /DELETE /api/v1/books/1', () => {
  describe('When I want to update a book', () => {
    it('should not delete book for non admin users', (done) => {
      chai.request(Server)
        .delete('/api/v1/books/1')
        .set('xaccesstoken', userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res
            .body
            .message
            .should.equals('Operation failed. Admin privileges needed.');
          done();
        });
    });
  });
});
