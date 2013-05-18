exports.findByIdDB = function (req, res) {
    var training_id = req.params.id;
    console.log('Retrieving Session: ' + training_id);
    db.collection('SessionDB', function (err, collection) {
        //collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
        collection.find({'TrainingID': training_id}).toArray(function (err, item) {
            res.send(item);
        });
    });
};


exports.findAllDB = function (req, res) {
    db.collection('SessionDB', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
}

exports.addSessionPlanDB = function (req, res) {
    var Session_DB = req.body;
    console.log('Adding Session: ' + JSON.stringify(Session_DB));
    db.collection('SessionDB', function (err, collection) {
        collection.insert(Session_DB, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });

}