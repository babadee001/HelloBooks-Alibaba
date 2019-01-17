const faker = require('faker');

const randomName = faker.name.findName();
const username = faker.name.firstName();
const randomEmail = faker.internet.email();

module.exports = {
  'Users should not be able to login with invalid details': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Invalid username or password')
      .assert.urlContains('http://localhost:8000/signin')
      .pause(1000),

  'Users should be able to signup, signin and logout': browser =>
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .setValue('input[name=confirmpassword]', randomName)
      .setValue('input[name=email]', randomEmail)
      .click('#membership option:nth-child(2n)')
      .click('button[name=signup]')
      .waitForElementVisible('#bookList', 5000)
      .click('#logout')
      .assert.urlContains('http://localhost:8000')
      .url('http://localhost:8000/signin')
      .assert.urlContains('http://localhost:8000/signin')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('#bookList', 5000)
      .assert.urlContains('http://localhost:8000/dashboard')
      .click('#logout')
      .pause(1000),

  'Users cannot signup with existing or invalid details': browser =>
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'babadee')
      .setValue('input[name=password]', randomName)
      .setValue('input[name=confirmpassword]', randomName)
      .setValue('input[name=email]', randomEmail)
      .click('#membership option:nth-child(2n)')
      .click('button[name=signup]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Username or email already exists')
      .assert.urlContains('http://localhost:8000/signup')
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'ba')
      .setValue('input[name=password]', randomName)
      .setValue('input[name=confirmpassword]', randomName)
      .setValue('input[name=email]', randomEmail)
      .click('#membership option:nth-child(2n)')
      .click('button[name=signup]')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast', 'Username cannot be less than three characters')
      .assert.urlContains('http://localhost:8000/signup')
      .pause(1000),

  'Users should be able to borrow and return book': browser =>
    browser
      .url('http://localhost:8000/signin')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('#bookList', 5000)
      .assert.urlContains('http://localhost:8000/dashboard')
      .click('#borrow')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'You have successfully borrowed the book')
      .click('.swal-button--confirm')
      .waitForElementVisible('#bookList', 5000)
      .click('#borrow')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast',
        'You cant borrow this book again till you return')
      .waitForElementVisible('#bookList', 5000)
      .url('http://localhost:8000/history')
      .waitForElementVisible('#history', 5000)
      .click('#returnBook')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast',
        'Book returned successfully')
      .waitForElementNotVisible('#returnBook')
      .assert.urlContains('http://localhost:8000/history')
      .end(),

  'Users can view their profile and edit their username': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('#bookList', 5000)
      .url('http://localhost:8000/profile')
      .waitForElementVisible('#profile', 5000)
      .assert.containsText('#profilecard:h1',
        username)
      .assert.containsText('#editprofile',
        'Edit profile')
      .click('#editprofile')
      .assert.urlContains('http://localhost:8000/edit')
      .waitForElementVisible('.editprofile', 5000)
      .setValue('input[name=username]', 'newUsername')
      .click('button[name=submit]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'profile updated successfully')
      .assert.urlContains('http://localhost:8000/signin')
      .setValue('input[name=username]', 'newUsername')
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Logged in Successfully')
      .waitForElementVisible('#bookList', 5000)
      .end(),

  'Users should be able to change their password': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('#bookList', 5000)
      .url('http://localhost:8000/profile')
      .waitForElementVisible('#profile', 5000)
      .assert.containsText('#editprofile',
        'Edit profile')
      .click('#editprofile')
      .assert.urlContains('http://localhost:8000/edit')
      .waitForElementVisible('.editprofile', 5000)
      .setValue('input[name=oldPassword]', randomName)
      .setValue('input[name=newPassword]', 'newpassword')
      .click('button[name=submit]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'profile updated successfully')
      .assert.urlContains('http://localhost:8000/signin')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', 'newpassword')
      .click('button[name=signin]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Logged in Successfully')
      .waitForElementVisible('#bookList', 5000)
      .end(),

  'Users should not update their password with wrong details': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('#bookList', 5000)
      .url('http://localhost:8000/profile')
      .waitForElementVisible('#profile', 5000)
      .assert.containsText('#editprofile',
        'Edit profile')
      .click('#editprofile')
      .assert.urlContains('http://localhost:8000/edit')
      .waitForElementVisible('.editprofile', 5000)
      .setValue('input[name=oldPassword]', 'wrongpassword')
      .setValue('input[name=newPassword]', 'newpassword')
      .click('button[name=submit]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'old password is incorrect')
      .assert.urlContains('http://localhost:8000/edit')
      .click('button[name=logout]')
      .click('button[name=signin]')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', 'wrongpassword')
      .click('button[name=signin]')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Invalid username or password')
      .end(),

  'Users should get a not found page when wrong url is visited': browser =>
    browser
      .url('http://localhost:8000/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', randomName)
      .click('button[name=signin]')
      .waitForElementVisible('#bookList', 5000)
      .url('http://localhost:8000/profileee')
      .waitForElementVisible('#notfound', 5000)
      .end()
};
