const path = require('path');

module.exports = {
  'Admin should be able to sign in': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', 1111)
      .click('button[name=signin]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Logged In Successfully')
      .pause(1000)
      .assert.urlContains('http://localhost:8000/admin')
      .pause(1000)
      .end(),

  'Admin should be able to add a book': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', 1111)
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .url('http://localhost:8000/add')
      .waitForElementVisible('#add', 5000)
      .setValue('input[name=title]', 'Saworoide')
      .setValue('.input-field textarea', 'This is just a test')
      .setValue('input[name=isbn]', 'isbn-test')
      .setValue('input[name=author]', 'babadee')
      .click('#catId option:nth-child(2n)')
      .setValue('input[name=quantity]', 6)
      .setValue('input[type=file]', path.resolve('../../Desktop/test.jpg'))
      .waitForElementVisible('#completed', 20000)
      .click('#addbook')
      .waitForElementVisible('.toast', 10000)
      .assert.containsText('.toast', 'Book added successfully')
      .assert.urlContains('http://localhost:8000/admin')
      .assert.containsText(
        '#book_card:first-child div a div div.card-title',
        'Saworoide',
      )
      .assert.containsText(
        '#book_card:first-child div a div div.card-content',
        'This is just a test',
      )
      .end(),

  'Admin should be able to add category': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', 1111)
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .url('http://localhost:8000/logs')
      .waitForElementVisible('#logs', 5000)
      .setValue('input[name=name]', 'Drama')
      .setValue('input[name=description]', 'category description')
      .click('button[name=addcategory]')
      .pause(1000)
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Category added successfully')
      .assert.urlContains('http://localhost:8000/logs')
      .url('http://localhost:8000/add')
      .waitForElementVisible('#add', 5000)
      .assert.containsText(
        '#catId option:nth-child(2n)',
        'Drama',
      )
      .end(),

  'it should not add a category if it exists': (browser) => {
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', 1111)
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .url('http://localhost:8000/logs')
      .waitForElementVisible('#logs', 5000)
      .setValue('input[name=name]', 'Drama')
      .setValue('input[name=description]', 'category description')
      .click('button[name=addcategory]')
      .pause(1000)
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Category with that name exists')
      .assert.urlContains('http://localhost:8000/logs')
      .pause(2000)
      .end();
  },

  'Admin should not be able to add book with the same isbn': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', '1111')
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .url('http://localhost:8000/logs')
      .setValue('input[name=title]', 'This is just a test')
      .setValue('.textarea textarea', 'This is just a test')
      .setValue('input[name=isbn]', 'isbn-the-book')
      .setValue('input[name=author]', 'James Waldow')
      .click('#catId option:nth-child(2n)')
      .setValue('input[name=quantity]', 19)
      .click('#addbook')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Book with that ISBN already exist')
      .assert.urlContains('http://localhost:8000/admin')
      .end(),

  'Admin should be able to edit a book': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', '1111')
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .click('#edit_button')
      .clearValue('input[name=title]')
      .setValue('input[name=title]', 'This book has been edited')
      .setValue('.textarea textarea', 'New description')
      .click('#submit_edit')
      .waitForElementVisible('.headcard', 5000)
      .assert.urlContains('http://localhost:8000/admin')
      .assert.containsText(
        '#book_card:first-child div a div div.card-title',
        'This book has been edited',
      )
      .assert.containsText(
        '#book_card:first-child div a div div.card-content',
        'New description',
      )
      .end(),

  'Admin should be able to delete a book': browser =>
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'admin1')
      .setValue('input[name=password]', '1111')
      .click('button[name=signin]')
      .waitForElementVisible('#adminhome', 5000)
      .assert.containsText(
        '#book_card:first-child div a div div.card-title',
        'This book has been edited',
      )
      .click('#delete_button#book_card:first-child')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'book deleted')
      .waitForElementVisible('#headcard', 5000)
      .assert.urlContains('http://localhost:8000/admin')
      .waitforElementNotPresent(
        '#book_card:first-child div a div div.card-title',
        'This book has been edited')
      .end(),
};
