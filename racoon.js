var raccoon = require('raccoon');
//var wtf = require('wtfnode');
raccoon.config.nearestNeighbors = 5;  // number of neighbors you want to compare a user against
raccoon.config.className = 'articles';  // prefix for your items (used for redis)
raccoon.config.numOfRecsStore = 30;  // number of recommendations to store per user

var proms = []
for(var x=0; x<10000; x++) {
  proms.push(function() {
    return raccoon.liked("Person"+x, 'article3');
  })
}
Promise.all(proms).then(recommendDemo).catch(function(e) { console.error(e) });

function recommendDemo() {
  return raccoon.liked('heli', 'article1')
      .then(function() {
          return raccoon.liked('heli', 'article2');
      })
      .then(function() {
          return raccoon.liked('heli', 'article5');
      })
      .then(function() {
          return raccoon.liked('harald', 'article1');
      })
      .then(function() {
            return raccoon.liked('harald', 'article2');
      })
      .then(function() {
          return raccoon.recommendFor('harald', 10);
      }).then(function(recs) {
          console.log('recommendation: ', recs);
          return Promise.resolve();
      }).then(function() {
        return raccoon.mostSimilarUsers('heli')
      }).then(function(users) {
        console.error(users)
        client.end(true);
        return Promise.resolve();
      })
  
}