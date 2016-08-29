import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
export const Books = new Mongo.Collection('books');
const BookSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Book title",
  },
  image: { 
    type: String,
    label: "Book image",
  },
  ownerId: {
    type: String,
    label: "Book owner ID",
  },
  requestedBy: {
    type: [ String ],
    label: "Book was requested by",
  },
  uniqId: {
    type: String,
    label: "ID for unique book per user",
    index: true,
    unique: true,
  },
  lentTo: {
    type: "String",
    label: "User who borrowed the book",
  }
});
Books.attachSchema(BookSchema);

Meteor.methods({
  'books.insert': function (book) {
    book.requestedBy = [];
    book.ownerId = this.userId;
    check(book, Books.simpleSchema());
    return Books.insert(book);
  },
  'books.addtowishlist': function(book) {
    return Books.update(book._id, { $push: { requestedBy: this.userId } });
  },
  'books.removefromwishlist': function(book) {
    return Books.update(book._id, { $pull: { requestedBy: this.userId } });
  },
  'books.acceptTrade': function(book, user) {
    Books.update(book._id, { $pull: { requestedBy: user } });
    return Books.update(book._id, { $set: { lentTo: user } });
  }
});
