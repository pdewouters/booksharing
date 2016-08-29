import React, { Component } from 'react';
import { getBooks } from '../../api';
import BookGrid from './BookGrid';
import { Meteor } from 'meteor/meteor';

class AddBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
    };
    this.onBookSelect = this.onBookSelect.bind(this);
  }

  onBookSelect(book) {
    try {
      Meteor.call('books.insert', book, (error, result) => {
        if (error) {
          console.log(error);
        }
        console.log(result);
      });
    } catch (e) {
      console.log(e);
    }
  }

  onBookSearch() {
    getBooks(this.state.searchTerm)
      .then(data => {
        this.setState({
          results: data.map((book) => ({
            uniqId: Meteor.userId() + book.id,
            title: book.volumeInfo.title,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
          })),
        });
      });
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="description">Book title</label>
          <div className="input-group">
            <input
              className="form-control"
              value={this.state.value}
              onChange={e => this.handleChange(e) }
              />
            <div className="input-group-btn">
              <input
                type="button"
                onClick={() => this.onBookSearch() }
                className="btn btn-default"
                value="Add choice"
                />
            </div>
          </div>
        </div>
        <BookGrid handleBookSelect={this.onBookSelect} books={this.state.results} keyField="uniqId" />
      </div>
    );
  }
}

export default AddBooks;
