var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm);

var profiles = [
  {
    namespace: 'articles',
    person: 'heli',
    action: 'likes',
    thing: 'article1',
    expires_at: '2020-06-06'
  },
  {
    namespace: 'articles',
    person: 'heli',
    action: 'likes',
    thing: 'article2',
    expires_at: '2020-06-06'
  },
  {
    namespace: 'articles',
    person: 'heli',
    action: 'likes',
    thing: 'article4',
    expires_at: '2020-06-06'
  },
  {
    namespace: 'articles',
    person: 'harald',
    action: 'likes',
    thing: 'article1',
    expires_at: '2020-06-06'
  },
  {
    namespace: 'articles',
    person: 'harald',
    action: 'likes',
    thing: 'article2',
    expires_at: '2020-06-06'
  },
]


for(var x=0; x<10000; x++) {
  profiles.push({
    namespace: "articles",
    person: "Person"+x,
    action: "likes",
    thing: "article2",
    expires_at: "2020-06-06"
  })
}

ger.initialize_namespace('articles')
.then( function() {
  return ger.events(profiles)
})
.then( function() {
  // What things might harald like?
  return ger.recommendations_for_person('articles', 'harald', {actions: {likes: 1}, filter_previous_actions: ["likes"]})
})
.then( function(recommendations) {
  console.log("\nRecommendations For 'harald'")
  console.log(JSON.stringify(recommendations,null,2))
})
.then(function() {
  return ger.recommendations_for_person('articles', 'Person2', {actions: {likes: 1}, filter_previous_actions: ["likes"]})
})
.then( function(recommendations) {
  console.log("\nRecommendations For 'Person2'")
  console.log(JSON.stringify(recommendations,null,2))
})
.then( function() {
  // What things are similar to xmen?
  return ger.recommendations_for_thing('articles', 'article1', {actions: {likes: 1}})
})
.then( function(recommendations) {
  console.log("\nRecommendations Like 'article1'")
  console.log(JSON.stringify(recommendations,null,2))
})
