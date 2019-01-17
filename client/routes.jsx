import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Signup from './components/users/Signup';
import Signin from './components/users/Signin';
import Profile from './components/Pages/Profile';
import AddBook from './components/admin/AddBooks';
import Dashboard from './components/Pages/Dashboard';
import Authentication from './components/users/Authentication';
import AdminAuthentication from './components/users/AdminAuthentication';
import Admin from './components/admin/AdminHome';
import BorrowedBooks from './components/Pages/BorrowedHistory';
import Logs from './components/admin/Logs'
import NotFound from './components/Pages/NotFound';
import About from './components/Pages/About';
import AdminProfile from './components/admin/AdminProfile';
import Edit from './components/Pages/EditProfile';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="/signup" component={ Signup } />
    <Route path="/signin" component= { Signin } />
    <Route path="/profile" component={ Authentication(Profile) } />
    <Route path="/add" component={ AdminAuthentication(AddBook) } />
    <Route path="/admin" component={ AdminAuthentication(Admin) } />
    <Route path="/dashboard" component={ Authentication(Dashboard) } />
    <Route path="/history" component={ Authentication(BorrowedBooks) } />
    <Route path="/logs" component={ AdminAuthentication(Logs) } />
    <Route path="/about" component={ About } />
    <Route path="/adminprofile" component={ AdminAuthentication(AdminProfile) } />
    <Route path="/edit" component={ Edit } />
    <Route path="*" component={NotFound} />
  </Route>
);
