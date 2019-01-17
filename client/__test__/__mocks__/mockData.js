const mockData = {
  authResponse: {
    currentUser: {
      username: 'babadee',
      email: 'babadee@gmail.com',
    },
    data: {
      token: process.env.userToken
    }
  },
  user: {
    password: 'test',
    username: 'tester',
    membership: 'Silver',
    email: 'tester@gmail.com',
  },
  notifications: [
    { id: 1, message: 'Hello from the other side' }
  ],
  Dashboard: {
    props: {
      user: {
        fullName: 'Test'
      },
      actions: {
        getAllBooksActions: jest.fn()
      }
    }
  },
  bookData: {
    title: 'This is a test',
    author: 'babadee',
    isbn: 'isbn-test-book',
    cover: 'hello.jpg',
    description: 'Hello world',
    catId: 1,
    quantity: 1
  },
  modifiedBook: {
    book: {
      id: 1,
      title: 'ttttt',
      isbn: '123',
      quantity: 1,
      catId: 1,
      cover: 'newtestcover',
      author: 'dff',
      description: 'fderf',
      createdAt: '2018-02-06T19:10:10.328Z',
      updatedAt: '2018-02-06T19:20:25.773Z'
    },
    message: 'Book updated successfully!'
  },
  returnedBook: {
    message: 'Book returned successfully',
    book: {
      id: 1,
      title: 'HarryPorterrrr',
      isbn: '123-abc',
      quantity: 25,
      catId: 3,
      cover: 'newtestcover',
      author: 'babadeewwww',
      description: 'A film about magic',
      createdAt: '2018-02-06T19:56:12.592Z',
      updatedAt: '2018-02-06T19:56:12.874Z'
    }
  },
  deletedBook: [{
    title: 'This is a test',
    author: 'babadee',
    isbn: 'isbn-test-book',
    cover: 'hello.jpg',
    descriptions: 'Hello world',
    categoryId: 1,
    quantity: 1
  }],
  allBorrowedBooks: [
    {
      id: 1,
      bookId: 1,
      userId: 1,
      expires: '2018-02-21T19:36:52.270Z',
      returnDate: '2018-02-06T19:36:52.301Z',
      description: 'A film about magic',
      title: 'HarryPorter',
      cover: 'testcover',
      returned: true,
      createdAt: '2018-02-06T19:36:52.276Z',
      updatedAt: '2018-02-06T19:36:52.301Z'
    },
    {
      id: 2,
      bookId: 1,
      userId: 1,
      expires: '2018-02-21T19:51:15.968Z',
      returnDate: '2018-02-21T19:51:15.968Z',
      description: 'A film about magic',
      title: 'HarryPorterrrr',
      cover: 'newtestcover',
      returned: false,
      createdAt: '2018-02-06T19:51:17.758Z',
      updatedAt: '2018-02-06T19:51:17.758Z'
    }
  ],
  data: [{
    title: test,
    author: test,
    decription: test
  }],
  allBooks: [
    {
      id: 1,
      title: 'HarryPorterrrr',
      isbn: '123-abc',
      quantity: 25,
      catId: 3,
      cover: 'newtestcover',
      author: 'babadeewwww',
      description: 'A film about magic',
      createdAt: '2018-02-06T17:50:23.763Z',
      updatedAt: '2018-02-06T17:50:25.302Z'
    },
    {
      id: 2,
      title: 'Badass',
      isbn: '123-abc',
      quantity: 5,
      catId: 3,
      cover: 'cover',
      author: 'babadee',
      description: 'A film about badass',
      createdAt: '2018-02-06T17:50:23.763Z',
      updatedAt: '2018-02-06T17:50:25.302Z'
    }
  ],
  allCategory: [
    {
      id: 1,
      name: 'Action',
      description: 'Not boring stuffs',
      createdAt: '2018-02-06T19:04:03.657Z',
      updatedAt: '2018-02-06T19:04:03.657Z'
    },
    {
      id: 2,
      name: 'Drama',
      description: 'Boring stuffs',
      createdAt: '2018-02-06T7:04:03.657Z',
      updatedAt: '2018-02-06T7:04:03.657Z'
    }
  ],
  allTimeBorrowed: [
    {
      id: 1,
      bookId: 1,
      userId: 1,
      expires: '2018-02-21T20:13:23.029Z',
      returnDate: '2018-02-06T20:13:23.062Z',
      description: 'A film about magic',
      title: 'HarryPorter',
      cover: 'testcover',
      returned: true,
      createdAt: '2018-02-06T20:13:23.036Z',
      updatedAt: '2018-02-06T20:13:23.062Z'
    }
  ],
  history: [
    {
      id: 1,
      bookId: 1,
      userId: 1,
      expires: '2018-02-21T20:19:57.548Z',
      returnDate: '2018-02-06T20:19:57.589Z',
      description: 'A film about magic',
      title: 'HarryPorter',
      cover: 'testcover',
      returned: true,
      createdAt: '2018-02-06T20:19:57.555Z',
      updatedAt: '2018-02-06T20:19:57.589Z'
    }
  ],
  googleUser: [{
    authenticated: true,
    type: 'SET_CURRENT_USER',
    user: {
      currentUser: {
        membership: 'novice',
        password: '$2a$10$8UBB45zAxaLp3bFvD7/Tku3u5Tqh6HhSdgLJiC/y5g54ZhSPcjNSu',
        userId: 34,
        username:
        'babad' },
      iat: 1502291740
    }
  }],
  updated: {
    message: 'profile updated succesfully',
    updated: {
      id: 1,
      username: 'myusername',
      password: '$2a$10$2flmJaYTbys768AgBxsu1Omx5H03B/S2UwdF.wbp.vB.5M596JxPe',
      email: 'test@user.co',
      isAdmin: 0,
      membership: 'Gold',
      createdAt: '2018-02-06T23:41:19.267Z',
      updatedAt: '2018-02-06T23:41:19.616Z'
    }
  },
  badUser: {
    password: 'test',
  },
};

export default mockData;
