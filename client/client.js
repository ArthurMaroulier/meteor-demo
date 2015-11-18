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
  },

  getOrder: function (movie) {
    var votes = Votes.find().fetch(),
        movies = Movies.find().fetch(),
        numberOfMovies = movies.length,
        trueRes = {};

    if (votes.length) {
      var grouped = _.groupBy(_.pluck(votes, 'movie')),
          res = [];

      _.each(_.values(grouped), function(movie) {
        res.push({title: movie[0], votes: movie.length});
      });

      res = _.sortBy(res, "votes").reverse();

      _.each(res, function(elem, index) {
        trueRes[elem.title] = (index + 1);
      });

    } else {
      _.each(movies, function(elem, index) {
        trueRes[elem.title] = (index + 1);
      });
    }

    if (trueRes[movie] === undefined) {
      return numberOfMovies;
    } else {
      return trueRes[movie];
    }
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
