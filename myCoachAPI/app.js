
/**
 * Module dependencies.
 */



var express = require('express')
  , routes = require('./routes')
  , TrainingPlans = require('./routes/TrainingPlans')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongodb')
  , Server = mongo.Server
  , Db = mongo.Db
  , BSON = mongo.BSONPure;

var app = express();

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('myCoachDB', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'myCoachDB' database");
        //populateDB();
        db.collection('TrainingPlans', {safe:true}, function(err, collection) {
           if (err) {
               console.log("The 'TrainingPlans' collection doesn't exist. Creating it with sample data...");
          //     populateDB();
            }
        }
        );
     }
}

);

var populateDB = function () {
    var trainingPlans = [
        {name: "Junior 18s",
            description: "Training plan targetted Junior 18 girls section of the club aspiring to be National champins and International representitives",
            plannedSessions: [
                {
                    name: "500m intervals",
                    description: "Intensive session of 500m pieces. Full recovery between pieces. Quality important",
                    duration: "1:30",
                    date: "14/4/2013",
                    time: "19:00",
                    location: "Islandbridge, Dublin"
                },
                {
                    name: "1000m intervals",
                    description: "Session of 1000m pieces. Full recovery between pieces. Quality important, Practise of race piece throughout",
                    duration: "1:30",
                    date: "15/4/2013",
                    time: "19:00",
                    location: "Islandbridge, Dublin"
                },
                {
                    name: "2000m pieces",
                    description: "Practise of race plan using full  course lenght.Start spring and settle for duration.Quality important",
                    duration: "1:30",
                    date: "16/4/2013",
                    time: "19:00",
                    location: "Islandbridge, Dublin"
                }
            ]
        },
        {name: "Junior 14s",
            description: "Training plan targeted at beginners aged 14 and under to learn the skills of rowing",
            plannedSessions: [
                {
                    name: "500m intervals",
                    description: "Intensive session of 500m pieces. Full recovery between pieces. Quality important",
                    duration: "1:30",
                    date: "14/4/2013",
                    time: "19:00",
                    location: "Islandbridge, Dublin"
                },
                {
                    name: "1000m intervals",
                    description: "Session of 1000m pieces. Full recovery between pieces. Quality important, Practise of race piece throughout",
                    duration: "1:30",
                    date: "15/4/2013",
                    time: "19:00",
                    location: "Islandbridge, Dublin"
                },
                {
                    name: "2000m pieces",
                    description: "Practise of race plan using full  course lenght.Start spring and settle for duration.Quality important",
                    duration: "1:30",
                    date: "16/4/2013",
                    time: "19:00",
                    location: "Islandbridge, Dublin"
                }
            ]
        }
    ];

    db.collection('TrainingPlans', function (err, collection) {
        collection.insert(trainingPlans, {safe: true}, function (err, result) {
        });
    });
};
var clearTPsFromDB = function(){

    db.collection('TrainingPlans', function (err, collection) {
        collection.remove();
        });
};


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/TrainingPlans', TrainingPlans.findAll);
//app.post('/TrainingPlans', TrainingPlans.findAll);
app.post('/TrainingPlans', TrainingPlans.addTrainingPlan);
app.get('/LoadSampleData',populateDB);
app.get('/ClearAllTrainingPlans',clearTPsFromDB);


app.get('/TrainingPlans/:id', TrainingPlans.findById);



app.post('/TrainingPlanUpd', TrainingPlans.updateTrainingPlan);
app.delete('/TrainingPlans/:id', TrainingPlans.deleteTrainingPlan);




//app.get('/TrainingPlans/:id', TrainingPlans.findById);

//app.get('/PlannedSession/:id', function(req, res) {
//res.send({id:req.params.id, name: "The Name", description: "description"});
//});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});





