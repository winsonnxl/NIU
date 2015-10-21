var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.uid==undefined||req.session.uid==''){
    res.render('user/login',{data:'0'});
  }else {
    var session=require('../lib/c_session').get_Session(req);
    var data={'session':session};
    res.render('index',data);
  }
});



module.exports = router;
