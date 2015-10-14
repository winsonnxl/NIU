/**
 * Created by winson on 10/12/15.
 * BUG提交 路由
 */
var express = require('express');
var router = express.Router();
var m_bug=require('../models/m_bug');


/* GET bug listing. */
router.get('/',function(req, res, next) {
    res.send("BUG主页");
});

/*BUG提交页*/
router.get('/submit',function(req,res,next){
   res.render('bug/submit_bug');
    //res.render('ueditor_test');
});

/*BUG内容提交到数据库*/
router.post('/submit/post',function(req,res,next){
   var title=req.body.bug_title;
    var block=req.body.bug_block;
    var descrption=req.body.h_description;
    var suggest=req.body.h_suggest;
    var level=req.body.bug_level;
    var bug_userid=req.body.userid;
    m_bug.insertBUG(title,block,descrption,suggest,level,bug_userid,function(data){
        if(data){
            if(data['affectedRows']){
                res.send("BUG提交陈宫");
            }else{
                res.send("^_^!BUG提交没有成功，赶紧联系程序猿～！！程序猿！！程序猿！");
            }
        }else{
            res.send("^_^!BUG提交没有成功，赶紧联系程序猿～！！程序猿！！程序猿！");
        }
    })
});

module.exports = router;