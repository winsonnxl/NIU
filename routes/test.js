/**
 * Created by winson on 10/9/15.
 * 测试专用
 */
var express = require('express');
var m_users=require('../models/m_users');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    try{
        console.log('session_uid==>'+req.session.uid);
        m_users.login("111111","111111",function(data){
            if(data){

                /*
                req.session.uid=data[0]['id'];
                req.session.rname=data[0]['real_name'];
                req.session.mobile=data[0]['mobile'];
                req.session.local=data[0]['local'];
                req.session.dev=data[0]['dep'];
                req.session.level=data[0]['level'];

                //console.log("session==="+req.session.rname);
                //res.render('user/test-session',data);
                //res.render('index',{data:'黑恶hi额hi额额hi'});
                res.redirect('/work_index');
                */
                console.log("数据库结果===》",data);
                //json_data=JSON.stringify(data);
                //console.log("数据库json结果===》",json_data);
                var result={};
                for(var i=0;i<data.length;i++){
                    result["user"]={real_name:data[0].real_name,
                    mobile:data[0].mobile}
                }
                console.log("test数据库结果===》",result);
                res.render('user/test-session',result);
            }else{
                //res.render('user/login',{data:'1'});
                //res.redirect('/test/');
                //console.log("test数据库结果===》",data);
                return false;
            }
        });
        //console.log('json==>'+result);
    }catch(ex){
        console.log(ex);
    }
    //res.render('user/test-session',result);

});

module.exports = router;