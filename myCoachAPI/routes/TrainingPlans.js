/*
 * GET Planned Sessions
 */

//exports.list = function(req, res){
//res.send("respondsdsds with a resource");
//};

//exports.findAll = function(req, res) {
//res.send([{name:'500m sprints'}, {name:'1000m pieces'}, {name:'steady state at 22'}]);
//};


exports.addTrainingPlan = function (req, res) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
};


exports.updateTrainingPlan = function (req, res) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
};

exports.deleteTrainingPlan = function (req, res) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
};


exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving TrainingPlans: ' + id);
    db.collection('TrainingPlans', function (err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};


exports.findAll = function (req, res) {
    db.collection('TrainingPlans', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
}

function findAllItems (req) {
    db.collection('TrainingPlans', function (err, collection) {
        collection.find().toArray(function (err, items) {
            return(items);
        });
    });
};

/*
exports.findAll = function (req, res) {
    var i;

    i = findAllItems(req);
    res.send({id: 1, name: "The Name", description: "description"});

};
*/


exports.addTrainingPlan = function (req, res) {
    var TrainingPlan = req.body;
    console.log('Adding TrainingPlan: ' + JSON.stringify(TrainingPlan));
    db.collection('TrainingPlans', function (err, collection) {
         collection.insert(TrainingPlan, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });

}
exports.updateTrainingPlan = function (req, res) {

    var TrainingPlan = req.body;
    var id=  TrainingPlan._id;
    console.log('Updating plan: ' + id);
    console.log(JSON.stringify(TrainingPlan));
    db.collection('TrainingPlans', function (err, collection) {
        collection.update({'_id':id}, TrainingPlan, {safe: true}, function (err, result) {
            if (err) {
                console.log('Error updating TrainingPlan: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(TrainingPlan);
            }
        });
    });
}

exports.deleteTrainingPlan = function (req, res) {
    var id = req.params.id;
    console.log('Deleting TrainingPlan: ' + id);
    db.collection('TrainingPlans', function (err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function () {

    var TrainingPlans = [
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
            location: "Islandbridge, Dublin",
        }
    ];

    db.collection('TrainingPlans', function (err, collection) {
        collection.insert(TrainingPlans, {safe: true}, function (err, result) {
        });
    });

};


