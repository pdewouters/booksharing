import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import AddBooks from './components/books/AddBooks';
import MyBooks from './components/books/MyBooks';
import AllBooks from './components/books/AllBooks';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import MyWishList from './components/books/MyWishList';
import MyTradeRequests from './components/books/MyTradeRequests';
import { Meteor } from 'meteor/meteor';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={AllBooks} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/mybooks" component={MyBooks} />
      <Route path="/mywishlist" component={MyWishList} />
      <Route path="/mytraderequests" component={MyTradeRequests} />
      <Route path="/books/new" component={AddBooks} />
      <Route path="*" component={AllBooks} />
    </Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.root'));
});
