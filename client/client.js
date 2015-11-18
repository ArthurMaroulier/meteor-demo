Meteor.startup(function () {
  Meteor.subscribe('votes');
  Meteor.subscribe('movies');

  Tracker.autorun(function () {
    var votes = Votes.find().fetch();
    var data = Pie.group(votes, 'movie');
    Pie.render('#pie', data);
  });
});

Template.buttons.helpers({
  movies: function () {
    return Movies.find().fetch();
  }
});

Template.button.helpers({
  getButtonClass: function (str) {
    return 'btn ' + str.replace(/[^a-z0-9]/ig, '').toLowerCase();
  },

  movieVotesCount: function (movie) {
    var count = Votes.find({movie: movie}).count();

    if (count) {
      return " (" + count + "&nbsp;vote" + ((count > 1) ? "s" : "") + ")";
    } else {
      return "";
    }
  }
});

Template.buttons.events({
  'click a': function (e) {
    e.preventDefault();
    Votes.insert({ movie: this.title, createdAt: Date.now() });
  }
});
