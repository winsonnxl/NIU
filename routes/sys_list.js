/**
 * Created by winson on 11/2/15.
 */
var express = require('express');
var router = express.Router();
var m_sys_list=require('../models/m_sys_list');

router.post('/getDep',function(req,res,next){
    var sys_id=req.body.sys_id;
    m_sys_list.show_SysList('dep',sys_id,0,function(data){
        res.json(data);
    });

});

router.post('/getModel',function(req,res,next){
    var sys_id=req.body.sys_id;
    var dep_id=req.body.dep_id;
    m_sys_list.show_SysList('model',sys_id,dep_id,function(data){
        res.json(data);
    });
});


module.exports = router;