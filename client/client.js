Meteor.startup(function () {
  Meteor.subscribe('votes');
  Meteor.subscribe('movies');
});
