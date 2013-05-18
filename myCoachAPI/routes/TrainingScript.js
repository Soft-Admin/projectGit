/*
 * GET Planned Sessions
 */

//exports.list = function(req, res){
//res.send("respondsdsds with a resource");
//};

//exports.findAll = function(req, res) {
//res.send([{name:'500m sprints'}, {name:'1000m pieces'}, {name:'steady state at 22'}]);
//};


exports.addTrainingPlanDB = function (req, res) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
};


exports.updateTrainingPlanDB = function (req, res) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
};

exports.deleteTrainingPlanDB = function (req, res) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
};


exports.findByIdDB = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving TrainingPlans: ' + id);
    db.collection('TrainingPlansDB', function (err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};


exports.findAllDB = function (req, res) {
    db.collection('TrainingPlansDB', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
}

function findAllItemsDB (req) {
    db.collection('TrainingPlansDB', function (err, collection) {
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

exports.addTrainingPlanDB = function (req, res) {
    var TrainingPlan_DB = req.body;
    console.log('Adding TrainingPlan: ' + JSON.stringify(TrainingPlan_DB));
    db.collection('TrainingPlansDB', function (err, collection) {
        collection.insert(TrainingPlan_DB, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
exports.updateTrainingPlanDB = function (req, res) {

    var TrainingPlan_DB = req.body;
    var id=  TrainingPlan_DB._id;
    console.log('Updating plan: ' + id);
    console.log(JSON.stringify(TrainingPlan_DB));
    db.collection('TrainingPlansDB', function (err, collection) {
        collection.update({'_id':id}, TrainingPlan_DB, {safe: true}, function (err, result) {
            if (err) {
                console.log('Error updating TrainingPlan: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(TrainingPlan_DB);
            }
        });
    });
}

exports.deleteTrainingPlanDB = function (req, res) {
    var id = req.params.id;
    console.log('Deleting TrainingPlan: ' + id);
    db.collection('TrainingPlansDB', function (err, collection) {
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


