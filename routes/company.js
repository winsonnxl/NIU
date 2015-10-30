/**
 * Created by winson on 10/29/15.
 */
var express = require('express');
var router = express.Router();
var m_company=require('../models/m_company_dep_dic');

/*或取相应部门列表*/
router.post('/ajax/get_set_dep',function(req,res,next){
    var dep=req.body.dep;
    m_company.get_dep(dep,function(data){
        res.json(data);
    });

});

/*根据local获取相应dep列表*/
router.post('/get_dep',function(req,res,next){
    var local=req.body.local;
    m_company.get_depBylocal(local,function(data){
        res.json(data);
    });
});

    module.exports = router;