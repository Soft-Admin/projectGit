exports.updateSessionPlanDB = function (req, res) {

    var Session_DB = req.body;
    var id=  Session_DB._id;
    console.log('Updating Session: ' + id);
    console.log(JSON.stringify(Session_DB));
    db.collection('SessionDB', function (err, collection) {
        collection.update({'_id':id}, Session_DB, {safe: true}, function (err, result) {
            if (err) {
                console.log('Error updating Session: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(Session_DB);
            }
        });
    });
}



