import { Meteor } from 'meteor/meteor';
import { Books } from '../imports/collections/Books';

Meteor.startup(() => {
  Meteor.publish('allbooks', function (perPage) {
    // all books except mine and those already on my list
    return Books.find({ $and: [{ ownerId: { $ne: this.userId } }, { requestedBy: { $ne: this.userId } }] }, { limit: perPage });
  });
  Meteor.publish('mybooks', function () {
    return Books.find({ ownerId: this.userId });
  });
  Meteor.publish('mywishlist', function () {
    // return books where my userid exists in requestedby
    return Books.find({ requestedBy: this.userId });
  });

  Meteor.publish('mytraderequests', function () {
    // get MY books that are in someones wishlist
   return Books.find({ $and: [{ ownerId: this.userId }, { 'requestedBy.0': { $exists: true } }] });
   //return Books.find({ 'requestedBy.0': { $exists: true } });
  });

  Meteor.publish('userData', function () {
    return Meteor.users.find({});
  });

  // Generate user initials after Facebook login
  Accounts.onCreateUser((options, user) => {
    user.address = options.address;
    // Don't forget to return the new user object at the end!
    return user;
  });
});
