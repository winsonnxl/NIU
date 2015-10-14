/**
 * Created by winson on 10/10/15.
 * 进入工作首页
 */
var express = require('express');
var router = express.Router();



/*工作平台首页*/
router.get('/',function(req,res,next){
    try{
        if(req.session.uid>0||req.session.uid!=undefined){
            var data=[];
            /*
            data[session]={uid:req.session.uid,
                rname:req.session.rname,
                local:req.session.local,
                dev:req.session.dev,
                level:req.session.level
            };*/
            data={uid:req.session.uid,
                rname:req.session.rname,
                local:req.session.local,
                dev:req.session.dev,
                level:req.session.level};
            console.log(data);
            res.render('index',data);
        }

    }catch(ex){
        console.log(ex);
        res.send("登录失败楼！工作首页进不去！")
    }

});

module.exports = router;