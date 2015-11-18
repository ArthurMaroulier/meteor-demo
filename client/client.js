Meteor.startup(function () {
  Meteor.subscribe('votes');
  Meteor.subscribe('movies');
});

Template.buttons.helpers({
  movies: function () {
    return Movies.find().fetch();
  }
});

Template.button.helpers({
  getButtonClass: function (str) {
    return 'btn ' + str.replace(/[^a-z0-9]/ig, '').toLowerCase();
  }
});
