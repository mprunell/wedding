
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index');
}

exports.map = function(req, res) {
    res.render('map');
}
