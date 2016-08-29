import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Books } from '../../../imports/collections/Books';
import { Meteor } from 'meteor/meteor';
import BookGrid from './BookGrid';
const PER_PAGE = 20;

class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.onBookSelect = this.onBookSelect.bind(this);
  }

  componentWillMount() {
    this.page = 1;
  }

  onBookSelect(book) {
    // add my userid to book 'requestby' array
    Meteor.call('books.addtowishlist', book);
  }

  handleLoadMore() {
    Meteor.subscribe('allbooks', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  render() {
    return (
      <div>
        <h2>All books</h2>
        <h3>Select a book to request a trade</h3>
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

AllBooks.propTypes = {
  books: PropTypes.array,
  loading: PropTypes.bool,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('allbooks', PER_PAGE);
  const loading = !subscription.ready();
  const books = Books.find({}).fetch();
  return { loading, books };
}, AllBooks);
