exports.findByIdDB = function (req, res) {
    var session_id = req.params.id;
    console.log('Retrieving Piece: ' + session_id);
    db.collection('PieceDB', function (err, collection) {
        collection.find({'SessionID': session_id}).toArray(function (err, item) {
            res.send(item);
        });
    });
};


exports.findAllDB = function (req, res) {
    db.collection('PieceDB', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
}

exports.addPiecePlanDB = function (req, res) {
    var Piece_DB = req.body;
    console.log('Adding PiecePlan: ' + JSON.stringify(Piece_DB));
    db.collection('PieceDB', function (err, collection) {
        collection.insert(Piece_DB, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });

}