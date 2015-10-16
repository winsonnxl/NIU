/**
 * Created by winson on 10/10/15.
 * 进入工作首页
 */
var express = require('express');
var router = express.Router();
var m_bug=require('../models/m_bug');


/*工作平台首页*/
router.get('/',function(req,res,next){
    try{
        if(req.session.uid==undefined||req.session.uid==''){
            res.render('user/login',{data:'0'});
        }else {
            var session=require('../lib/c_session').get_Session(req);
            var data={'session':session};
            res.render('index',data);
        }

    }catch(ex){
        console.log(ex);
        res.send("登录失败楼！工作首页进不去！")
    }

});


/*我的工作页*/
router.get('/mywork',function(req,res,next){
    var data={};
    try{
        if(req.session.uid==undefined||req.session.uid==''){
            res.render('user/login',{data:'0'});
        }else {
            var session=require('../lib/c_session').get_Session(req);

            m_bug.showBUG(req.session.uid,req.session.leve,req.session.local,req.session.dev,function(result){
                if(result){
                    data={'session':session,
                    'results':result};
                    console.log('mywork====>',data);
                    res.render('work/mywork',data);
                }
            });

        }

    }catch(ex){
        console.log(ex);
        res.send("登录失败楼！我的工作 进不去！")
    }

});

module.exports = router;