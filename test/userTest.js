import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
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

describe('/GET /api/v1/', () => {
  describe('When I hit the test api route', () => {
    it('it should GET a welcome message', (done) => {
      chai.request(Server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
    });
  });
});

describe('Given /api/v1/users/signup', () => {
  describe('When I want to create a new user', () => {
    it('Should return the user payload', (done) => {
      chai.request(Server)
        .post('/api/v1/users/signup/')
        .send({
          password: 'testpassworde',
          username: 'testusernamew',
          email: 'test@user.co',
          membership: 'Gold',
        })
        .end((err, res) => {
          res.body.message.should.equal('Signed up successfully');
          res.should.have.status(201);
          res.should.be.json;
          res.body.currentUser.username.should.equal('testusernamew');
          res.body.currentUser.email.should.equal('test@user.co');
          res.body.currentUser.membership.should.equal('Gold');
          res.body.should.have.property('Token');
          done();
        });
    });
    it('Should not create new user with existing username', (done) => {
      chai.request(Server)
        .post('/api/v1/users/signup/')
        .send({
          password: 'testpassworde',
          username: 'testusernamew',
          email: 'test@user.com',
          membership: 'Gold',
        })
        .end((err, res) => {
          res.body.message.should.equal('Username or email already exists');
          res.should.have.status(409);
          res.should.be.json;
          done();
        });
    });
    it('Should not create new user without email', (done) => {
      chai.request(Server)
        .post('/api/v1/users/signup/')
        .send({
          password: 'testpassword',
          username: 'testusername2',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equals('Enter a valid email');
          res.should.be.json;
          done();
        });
    });
    it('should request for proper email', (done) => {
      chai.request(Server)
        .post('/api/v1/users/signup/')
        .send({
          password: 'testpasswordd',
          username: 'testusernamee',
          email: 'wrongformat',
          membership: 'professional',
        })
        .end((err, res) => {
          res.body.message.should.equal('Enter a valid email');
          res.should.be.json;
          res.should.have.status(400);
          done();
        });
    });
    it('Should not create new user without username', (done) => {
      chai.request(Server)
        .post('/api/v1/users/signup/')
        .send({
          password: 'testpassword',
          email: 'test@yag.com',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res
            .body
            .message
            .should
            .equals('username is required with no special characters');
          done();
        });
    });
    it('should request for proper password', (done) => {
      chai.request(Server)
        .post('/api/v1/users/signup/')
        .send({
          password: 'te',
          username: 'babadee',
          email: 'email@email.com',
          membership: 'silver',
        })
        .end((err, res) => {
          res
            .body
            .message
            .should
            .equal('password should be at least four characters');
          res.should.be.json;
          res.should.have.status(400);
          done();
        });
    });
    it('should not accept empty membership field', (done) => {
      chai.request(Server)
        .post('/api/v1/users/signup/')
        .send({
          password: 'test',
          username: 'babadee',
          email: 'email@email.com',
          membership: '',
        })
        .end((err, res) => {
          res
            .body
            .message
            .should
            .equal('Membership is required, must be alphabet & not empty');
          res.should.be.json;
          res.should.have.status(400);
          done();
        });
    });
  });
});

describe('Given /api/v1/users/signin', () => {
  describe('When a user wants to sign in', () => {
    it('should return logged in user correct details', (done) => {
      chai.request(Server)
        .post('/api/v1/users/signin/')
        .type('form')
        .send({
          password: 'testpassworde',
          username: 'testusernamew',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.Token.should.not.equals(null);
          const currentUser = jwt.decode(res.body.Token);
          currentUser.currentUser.username.should.equal('testusernamew');
          currentUser.currentUser.email.should.equal('test@user.co');
          currentUser.currentUser.membership.should.equal('Gold');
          done();
        });
    });
    it('should fail without correct login details', (done) => {
      chai.request(Server)
        .post('/api/v1/users/signin/')
        .send({
          username: 'testusernamee',
          password: 'wrongpassword',
        })
        .end((err, res) => {
          res.should.be.json;
          res.body.message.should.equal('Invalid username or password');
          res.should.have.status(401);
          done();
        });
    });
  });
});

describe('Given /PUT /api/v1/users/edit', () => {
  describe('When a user wants to edit their profile', () => {
    it('Should return updated profile with correct details', (done) => {
      chai.request(Server)
        .put('/api/v1/users/edit/1')
        .set('xaccesstoken', userToken)
        .send({
          username: 'new'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.updated.username.should.equals('new');
          res.body.message.should.equal('profile updated succesfully');
          res.body.updated.username.should.equal('new');
          res.body.updated.email.should.eql('test@user.co');
          res.body.updated.membership.should.eql('Gold');
          done();
        });
    });
    it('Should return error for invalid username', (done) => {
      chai.request(Server)
        .put('/api/v1/users/edit/1')
        .set('xaccesstoken', userToken)
        .send({
          username: 'ne'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res
            .body
            .message
            .should
            .equal('New username should be at least 3 characters');
          done();
        });
    });
    it('Should return error for invalid user id supplied', (done) => {
      chai.request(Server)
        .put('/api/v1/users/edit/fsfggfsga')
        .set('xaccesstoken', userToken)
        .send({
          username: 'new'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('Invalid user id supplied!!!');
          done();
        });
    });
    it('should return updated user details when password is changed ', (done) => {
      chai.request(Server)
        .put('/api/v1/users/edit/1')
        .set('xaccesstoken', userToken)
        .send({
          username: 'myusername',
          oldPassword: 'testpassworde',
          newPassword: 'newpassword'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('profile updated succesfully');
          res.body.updated.username.should.equal('myusername');
          res.body.updated.email.should.eql('test@user.co');
          res.body.updated.membership.should.eql('Gold');
          res.body.updated.id.should.eql(1);
          done();
        });
    });
    it('Should return error for incorrect password', (done) => {
      chai.request(Server)
        .put('/api/v1/users/edit/1')
        .set('xaccesstoken', userToken)
        .send({
          username: 'myusername',
          oldPassword: 'fake',
          newPassword: 'newpassword'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('Old password is incorrect');
          done();
        });
    });
    it('Should return error for none existing user ', (done) => {
      chai.request(Server)
        .put('/api/v1/users/edit/100')
        .set('xaccesstoken', userToken)
        .send({
          username: 'nonexisiting',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal('User not in database');
          done();
        });
    });
  });
});

describe('Given /GET /api/v1/users/1', () => {
  describe('When a user want to get borrowing history', () => {
    it('Should return the borrowing history', (done) => {
      chai.request(Server)
        .get('/api/v1/users/1')
        .set('xaccesstoken', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].id.should.eql(1);
          res.body[0].bookId.should.eql(1);
          res.body[0].userId.should.eql(1);
          res.body[0].description.should.eql('A film about magic');
          res.body[0].title.should.eql('HarryPorter');
          res.body[0].cover.should.eql('testcover');
          res.body[0].returned.should.equal(true);
          done();
        });
    });
    it('Should notify users with no borrowing history', (done) => {
      chai.request(Server)
        .get('/api/v1/users/100')
        .set('xaccesstoken', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equals('You have never borrowed a book');
          done();
        });
    });
  });
});

describe('Given /GET /api/v1/users', () => {
  describe('When I want to get all users', () => {
    it('Should return all registered users', (done) => {
      chai.request(Server)
        .get('/api/v1/users/')
        .set('xaccesstoken', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.users.should.be.a('array');
          res.body.users[0].username.should.eql('myusername');
          res.body.users[0].membership.should.eql('Gold');
          res.body.users[0].id.should.eql(1);
          res.body.users[0].email.should.eql('test@user.co');
          res.body.users[0].isAdmin.should.eql(0);

          done();
        });
    });
    it('Should not return all users from a non admin request', (done) => {
      chai.request(Server)
        .get('/api/v1/users/')
        .set('xaccesstoken', userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res
            .body
            .message
            .should
            .equals('Operation failed. Admin privileges needed.');
          done();
        });
    });
  });
});

describe('Given /GET /api/v1/users/existing', () => {
  describe('When I want to search for users by email', () => {
    it('Should return the found user', (done) => {
      chai.request(Server)
        .post('/api/v1/users/existing')
        .set('xaccesstoken', userToken)
        .send({
          searchTerm: 'test@user.co'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.a('object');
          res.body.message.email.should.equals('test@user.co');
          done();
        });
    });
    it('Should return error for non existing user', (done) => {
      chai.request(Server)
        .post('/api/v1/users/existing')
        .set('xaccesstoken', userToken)
        .send({
          searchTerm: 'wrongt@user.comm'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equals('Email not found');
          done();
        });
    });
  });
});

it('Should return null for non existing user', (done) => {
  chai.request(Server)
    .post('/api/v1/users/checkuser')
    .set('xaccesstoken', userToken)
    .send({
      searchTerm: 'wronguser'
    })
    .end((err, res) => {
      res.body.should.eql({
        message: null
      });
      done();
    });
});

