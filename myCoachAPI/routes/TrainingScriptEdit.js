/*
 * GET Planned Sessions
 */

//exports.list = function(req, res){
//res.send("respondsdsds with a resource");
//};

//exports.findAll = function(req, res) {
//res.send([{name:'500m sprints'}, {name:'1000m pieces'}, {name:'steady state at 22'}]);
//};



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



