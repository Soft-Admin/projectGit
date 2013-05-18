exports.updatePiecePlanDB = function (req, res) {

    var Piece_DB = req.body;
    var id=  Piece_DB._id;
    console.log('Updating Piece: ' + id);
    console.log(JSON.stringify(Piece_DB));
    db.collection('PieceDB', function (err, collection) {
        collection.update({'_id':id}, Piece_DB, {safe: true}, function (err, result) {
            if (err) {
                console.log('Error updating Piece: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(Piece_DB);
            }
        });
    });
}



