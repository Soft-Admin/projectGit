
/*
 * GET home page.
 */

var TrainingPlans = require('./TrainingPlans');


//exports.index = function(req, res){

//    var tps = TrainingPlans.findAllItems(req);

    //res.render('index',tps);
//};

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};