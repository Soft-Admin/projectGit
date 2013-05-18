exports.deleteSessionPlanDB = function (req, res) {
    var id = req.params.id;
    console.log('Deleting Session Plan: ' + id);
    db.collection('SessionDB', function (err, collection) {
        collection.remove({'_id': id}, {safe: true}, function (err, result) {
            if (err) {

                res.send({'error': 'An error has occurred - ' + err});
            } else {

                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}