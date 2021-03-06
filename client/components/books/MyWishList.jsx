import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Books } from '../../../imports/collections/Books';
import { Meteor } from 'meteor/meteor';
import BookGrid from './BookGrid';
const PER_PAGE = 20;

class MyWishList extends Component {
  componentWillMount() {
    this.page = 1;
  }

  handleLoadMore() {
    Meteor.subscribe('mywishlist', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  render() {
    return (
      <div>
        <h2>My Wishlist</h2>
        <BookGrid
          handleBookSelect={this.onBookSelect}
          handleLoadMore={this.handleLoadMore}
          books={this.props.books}
          keyField="_id"
        />
      </div>
    );
  }
}

MyWishList.propTypes = {
  books: PropTypes.array,
  loading: PropTypes.bool,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('mywishlist', PER_PAGE);
  const loading = !subscription.ready();
  const books = Books.find({}).fetch();
  return { loading, books };
}, MyWishList);
