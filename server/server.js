Meteor.startup(function () {
  Meteor.publish('votes', function () {
    return Votes.find();
  });

  Meteor.publish('movies', function () {
    return Movies.find();
  });

  if (!Movies.find().count()) {
    [
      'À la poursuite de demain',
      'Avengers: L\'ère d\'Ultron',
      'Jurassic World',
      'Kingsman : Services secrets',
      'Mad Max: Fury Road',
      'Mission: Impossible - Rogue Nation',
      'Pixels',
      'Seul sur Mars',
      'Spectre',
      'Terminator Genisys'
    ].forEach(function (d) {
      Movies.insert({ title: d, createdAt: Date.now()});
    });
  }
});
