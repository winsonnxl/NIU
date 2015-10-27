/**
 * Created by winson on 10/10/15.
 * 进入工作首页
 */
var express = require('express');
var router = express.Router();
var m_bug=require('../models/m_bug');
var m_device_repair=require('../models/m_device_repair');


/*工作平台首页*/
router.get('/',function(req,res,next){
    try{
        if(req.session.uid==undefined||req.session.uid==''){
            res.render('user/login',{data:'0'});
        }else {
            var session=require('../lib/c_session').get_Session(req);
            var async = require('async');
            async.series({
                one:function(callback){
                    m_bug.showBUG(req.session.uid,req.session.level,req.session.local,req.session.dep,0,function(results){
                        callback(null,results);
                    })
                }
            },function(err,data){
                var bug_num=data.one.length;//总提交BUG数量
                var bug_dcl_num=0;//待处理数量‘0’
                var bug_bh_num=0;//驳回数量‘8’
                var bug_clz_num=0;//处理中数量‘3’
                var bug_dqr_num=0;//待确认数量‘5’
                var bug_yfp_num=0;//已分配‘2’
                var bug_wj_num=0;//完结‘4’

                if(bug_num==undefined){
                    bug_num=0;
                }else{
                    for(var i=0;i<data.one.length;i++){
                        switch (data.one[i].statue){
                            case 0:bug_dcl_num++;break;
                            case 2:bug_yfp_num++;break;
                            case 3:bug_clz_num++;break;
                            case 4:bug_wj_num++;break;
                            case 5:bug_dqr_num++;break;
                            case 8:bug_bh_num++;break;
                        }
                    }
                }
                var result={'session':session,
                'bug_num':bug_num,
                'bug_dcl_num':bug_dcl_num,
                'bug_bh_num':bug_bh_num,
                'bug_clz_num':bug_clz_num,
                'bug_dqr_num':bug_dqr_num,
                'bug_yfp_num':bug_yfp_num,
                'bug_wj_num':bug_wj_num,
                'bug':data.one};
                res.render('index',result);
            });

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
            var async = require('async');
            async.series({
                    one:function(callback){
                        m_bug.showBUG(req.session.uid,req.session.level,req.session.local,req.session.dep,1,function(result){
                            if(result){
                                callback(null,result);
                            }else{
                                callback(null,0);
                            }
                        })
                    },
                    two:function(callback){
                        m_device_repair.show_repair_list(1,req.session.uid,req.session.level,req.session.dep,req.session.local,function(result){
                            if(result){
                                callback(null,result);
                            }else{
                                callback(null,0);
                            }
                        })

                    }
                },
                function(err,data){
                    data={'session':session,
                        'results':data.one,
                    'repair':data.two};
                    console.log('mywork====>',data);
                    res.render('work/mywork',data);
                });


        }

    }catch(ex){
        console.log(ex);
        res.send("登录失败楼！我的工作 进不去！")
    }

});

module.exports = router;