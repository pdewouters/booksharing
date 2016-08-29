import React, { Component, PropTypes } from 'react';

export default class BookGrid extends Component {
  constructor(props) {
    super(props);
    this.bookSelect = this.bookSelect.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  bookSelect(book) {
    this.props.handleBookSelect(book);
  }

  handleButtonClick() {
    this.props.handleLoadMore();
  }

  renderThumbnail(book) {
    return (
      <div key={book[this.props.keyField]} className="col-lg-3 col-md-4 col-xs-6 thumb">
        <a className="thumbnail" href="#" onClick={() => this.bookSelect(book)}>
          <img className="img-responsive" src={book.image} alt={book.title} />
        </a>
      </div>
    );
  }

  render() {
    const thumbnails = this.props.books.map((book) => this.renderThumbnail(book));
    return (
      <div>
        <div className="row">
          {thumbnails}
        </div>
        <div className="row">
          <button
            onClick={this.handleButtonClick}
            className="btn btn-primary"
          >
              Load more...
          </button>
        </div>
      </div>
    );
  }
}

BookGrid.propTypes = {
  handleBookSelect: PropTypes.func,
  handleLoadMore: PropTypes.func,
  books: PropTypes.array.isRequired,
};
