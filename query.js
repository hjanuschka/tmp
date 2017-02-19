
var prediction = require('@google-cloud/prediction')({
  projectId: 'WILLI-VISION',
  keyFilename: '/Users/hja/Desktop/SPORTPORTAL/prediction/../FXF/FXF-REST/DEPLOYD/FiveXFive/conf/google-key.json'
});

var model = prediction.model('kmm-sentiment3');

var query_things = 'scheisse arschloch das is grün'.split(/\s/gi)
model.query(query_things, function(e, d) {
  console.error(e, d);
})


model.analyze(function(e,d) {
  //console.error(e,d);
})


/*

//prediction.createModel('kmm-sentiment2', function(err, model, apiResponse) {
//});

    var model = prediction.model('kmm-sentiment2');
    var str = 'So ein Schwachsinn, die USA haben Rekordarbeitslosigkeit und das sogenannte Wirtschaftswachstum ist ein rein statistisches Wachstum. Das man nur so dumm sein kann und diese manipulierten Zahlen zu glauben, die ja auch nur knapp an der Rezession vorbei schrammen?'
    var train_things = str.split(/\s/gi)
    console.error("TRAIN:", train_things)
    model.train('asdf2', train_things, function(e, d) {
      console.error(e,d);
      model.query("Schwachsinn", function(e, d) {
        console.error(e,d);
      })
    })

/*

    model.train('bad', 'Sie Dummkopf, damals bei den "Rechten"? Hitler war ein Linker.')
         .then(function() {
           return model.train('bad', 'Wenn es ein Lüftlein gibt an Wahlen, dann kommt ein Pilz uns zu Quälen !!Was kostet uns der U Ausschuß,wem nützt er und was ändert er ?? Ist da schon mal einer von den Politikern ordentlich in den Knast gegangen. Nicht einmal der Strasser, denn der hat eine Fußfessel ausgefasst und konnte neben seien Frau sitzen !! Ja was haben eben Pilze so an sich ,sie sind Schmarotzer !! Gemeindewohnung, Nationalrat und nichts bewirkt für monatliche 8500 €uro !!');
         })
         .then(function() {
           return model.train('bad', 'So ein Schwachsinn, die USA haben Rekordarbeitslosigkeit und das sogenannte Wirtschaftswachstum ist ein rein statistisches Wachstum. Das man nur so dumm sein kann und diese manipulierten Zahlen zu glauben, die ja auch nur knapp an der Rezession vorbei schrammen?');
         })
         .then(function(r,a) {
           console.error("ZZZZ", r);
           return model.query("Hitler")
         }).then(function(result) {
           console.error("XXXX", result);
         })
         .catch(function(e) {
           console.error("AAAA", e);
         });

*/


/*
// Get all of the trained models in your project.
prediction.getModels(function(err, models) {
  if (!err) {
    // `models` is an array of Model objects.
    console.error(err);
  }
  console.error(models);
});

// Reference an existing trained model.
var model = prediction.model('my-existing-model');

// Train a model.
model.train('english', 'Hello from your friends at Google!', function(err) {});

// Query a model.
model.query('Hello', function(err, results) {
  if (!err) {
    // results.winner == 'english'
    // results.scores == [
    //   {
    //     label: 'english',
    //     score: 1
    //   },
    //   {
    //     label: 'spanish',
    //     score: 0
    //   }
    // ]
  }
});

*/
