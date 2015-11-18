Votes = new Mongo.Collection('votes');
Movies = new Mongo.Collection('movies');

Votes.allow({
  insert: function () {
    return true;
  }
});
