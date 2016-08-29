import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    Meteor.logout();
    this.props.router.push('/');
  }

  renderAuth() {
    return (
      <ul className="nav navbar-nav">
        <li><Link to={{ pathname: '/login', state: { openModal: true } }}>Log in</Link></li>
        <li><Link to={{ pathname: '/signup', state: { openModal: true } }}>Sign up</Link></li>
      </ul>
    );
  }

  renderMenu() {
    const username = this.props.user ? this.props.user.username : '';
    return (
      <ul className="nav navbar-nav">
        <li><Link activeClassName="active" to="/mybooks">My Books</Link></li>
        <li><Link activeClassName="active" to="/mywishlist">My Wishlist</Link></li>
        <li><Link activeClassName="active" to="/mytraderequests">My trade requests</Link></li>
        <li><Link activeClassName="active" to="/books/new">Add Books</Link></li>
        <li><a href="#" onClick={this.logout}>Logout {username}</a></li>
      </ul>
    );
  }

  render() {
    return (
      <div className="header">
        <nav className="nav navbar-default">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Books Share</Link>
          </div>
          {
            this.props.userId
            ? this.renderMenu()
            : this.renderAuth()
          }
        </nav>
      </div>
    );
  }
}

export default createContainer(() => ({
  userId: Meteor.userId(),
  user: Meteor.user(),
}), withRouter(Header));
