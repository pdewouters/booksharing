import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Books } from '../../../imports/collections/Books';
import { Meteor } from 'meteor/meteor';

const PER_PAGE = 20;

class MyTradeRequests extends Component {
  componentWillMount() {
    this.page = 1;
  }

  handleClick(book,userData) {
    Meteor.call('books.acceptTrade', book, userData._id, (error,result) => {

    });
  }

  renderBook(book) {
    return (
      <li key={book._id}>
        {book.title}
        {
          book.requestedBy.map(userId => {
            const user = this.props.users.find(user => {
              return user._id === userId;
            });

            return <div key={user.username}>{this.renderRequestedBy(book,user)}</div>;
          })
        }
      </li>
    );
  }

  handleLoadMore() {
    Meteor.subscribe('mytraderequests', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  renderRequestedBy(book,user) {
    return (
      <div key={user._id}>
        {user.username}
        <button onClick={userData => this.handleClick(book,user)}>Approve</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>My trade requests</h2>
        <p>Click a book to accept trade request</p>
        <ul>
        {
          this.props.books.map(book => {
            return this.renderBook(book);
          })
        }
        </ul>
      </div>
    );
  }
}

MyTradeRequests.propTypes = {
  books: PropTypes.array,
  loading: PropTypes.bool,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('mytraderequests', PER_PAGE);
  const userDataSub = Meteor.subscribe('userData');
  const loading = !subscription.ready();
  const books = Books.find({}).fetch();
  const users = Meteor.users.find({}).fetch();
  return { loading, books, users };
}, MyTradeRequests);
