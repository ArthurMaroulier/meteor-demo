Meteor.startup(function () {
  Meteor.publish('votes', function () {
    return Votes.find();
  });

  Meteor.publish('movies', function () {
    return Movies.find();
  });
});
