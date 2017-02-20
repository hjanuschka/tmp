var key = require('../FXF/FXF-REST/DEPLOYD/FiveXFive/conf/google-key.json');
var fs = require("fs");
var google = require('googleapis');
var scopes = [
    "https://www.googleapis.com/auth/prediction"
]
var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, scopes, null);
var prediction = google.prediction('v1.6');

var SEARCH_QUERY = "dasasd dasdsa"
var BRAIN = "KMMBRAIN"
Promise.resolve()
    .then(doAuth)
    //.then(waitForTrainingFinished)
    //.then(doAnalyze)
    .then(deleteModel)
    .then(createModel)
    .then(waitForTrainingFinished)
    .then(doTraining)
    .then(function(result) {
        console.log("Training done")
    })
    .then(doTrainingStatus)
    .then(function(data) {
      //console.error("Training Status: ", data.trainingStatus)
      return Promise.resolve();
    })
    .then(waitForTrainingFinished)
    //.then(doQuery)
    .then(function(query_data) {
      console.error(query_data);
    })
    .catch(function(e) {
        console.error("ERROR", e);
    })

function waitForTrainingFinished() {
  return new Promise(function(resolve, reject) {
    var interv = setInterval(function() {
      prediction.trainedmodels.get({
        auth: jwtClient,
        project: "WILLI-VISION",
        id: BRAIN
      }, function(error, data) {
        if(!data) {
          resolve(null)
          return;
        }
        console.error("WAITING for training to be finished " + data.trainingStatus)
        if(data.trainingStatus == "DONE") {
          clearInterval(interv);
          resolve("DONE")
        }
      })
    }, 5000)
    
  })
}
function deleteModel() {
  return new Promise(function(resolve, reject) {
    prediction.trainedmodels.delete({
      auth: jwtClient,
      project: "WILLI-VISION",
      id: BRAIN
      
    }, function(error, data) {
      console.error(error, data)
      if(error) {
        reject(error);
        return;
      }
      console.log(data);
      resolve(data);
    })
  })
}
function createModel() {
  return new Promise(function(resolve, reject) {
    prediction.trainedmodels.insert({
      auth: jwtClient,
      project: "WILLI-VISION",
    
      resource: {
          id: BRAIN,
          modelType: "CLASSIFICATION"
      }
      
    }, function(error, data) {
      if(error) {
        reject(error);
        return;
      }
      console.log(data);
      resolve(data);
    })
  })
}
function doTrainingStatus() {
  return new Promise(function(resolve, reject) {
    prediction.trainedmodels.get({
      auth: jwtClient,
      project: "WILLI-VISION",
      id: BRAIN
    }, function(error, data) {
      if(error) {
        reject(error);
        return;
      }
      resolve(data);
    })
  })
}
function doQuery() {
  return new Promise(function(resolve, reject) {
    prediction.trainedmodels.predict({
      auth: jwtClient,
      project: "WILLI-VISION",
      id: BRAIN,
      resource: {
        input: {
          csvInstance: [SEARCH_QUERY]
        }
      }
    }, function(error, data) {
      if(error) {
        reject(error);
        return;
      }
      
      resolve(data);
      
    })
  })
}

function trainText(item) {
    return new Promise(function(resolve, reject) {
      
      if(item.length != 2) {
        resolve();
        return;
      }
        console.error("TRAIN: " + item[0])
        prediction.trainedmodels.update({
            project: "WILLI-VISION",
            auth: jwtClient,
            id: BRAIN,
            resource: {
                    csvInstance: ["" + item[1] + ""],
                    output: item[0]
            }

        }, function(error, data) {
            if (error) {
                reject(error);
                return;
            }
            resolve(data);
        })

    })
}

function doTraining() {

    var data = fs.readFileSync("/tmp/sentences").toString().split("\n")

    var p = Promise.resolve();
    return data.reduce(function(pacc, item) {
        return pacc = pacc.then(function() {
            return trainText(item.split("|;"))
        });
    }, p).then(function() {

    });




}

function doAuth() {
    return new Promise(function(resolve, reject) {
        jwtClient.authorize(function(err, data) {
            if (err) {
                reject();
                return;
            }
            resolve(data);
        });
    })
}

function doAnalyze() {
    return new Promise(function(resolve, reject) {
        prediction.trainedmodels.analyze({
            auth: jwtClient,
            project: "WILLI-VISION",
            id: BRAIN
        }, function(error, data) {
            if (error) {
                reject();
                return;
            }
            console.error(data.dataDescription.outputFeature.text);
            resolve(data);
        })
    });
}