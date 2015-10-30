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

/*打开BUG提交页*/
router.get('/submit',function(req,res,next){
    //console.log("session====>"+req.session.uid);
    var url = require('url');
    var sys_code = url.parse(req.url).query;//主系统编号
    /*1:sysid; 2:depid ; 3:modelid*/
    //console.log("第一次知道是从哪里来的=========="+global.sys_list[arg]);
    var sys_name=global.sys_list_sys[sys_code];

    var async = require('async');
    async.series({
        one: function(callback){
            if(req.session.uid==undefined||req.session.uid==''){
                res.render('user/login',{data:'0'});
            }else {
                var session=require('../lib/c_session').get_Session(req);
                var data={'session':session,
                    'sys_name':sys_name,
                    'sys_code':sys_code};
            }
            callback(null,data);

        },
        two:function(callback){
            var m_sys_list=require('../models/m_sys_list');
            var sql_data=m_sys_list.show_SysList('dep',sys_code,0,function(data){
                console.log("进入到BUG提交页，我们得到了什么====》》》》two"+data);
                if(data){
                    callback(null,data);
                }else{
                    callbace(null,data);
                }
            });
        }
    },function(err,results){
            console.log("进入到BUG提交页，我们得到了什么====》》》》results"+results);
            var json_data={'session':results.one.session,
            'sys_code':results.one.sys_code,
            'sys_name':results.one.sys_name,//暂时没赋值
            'dep':results.two};
        res.render('bug/submit_bug',json_data);
    });


    //res.render('bug/submit_bug',data);
    //res.render('ueditor_test');
});

/*BUG内容提交到数据库*/
router.post('/submit/post',function(req,res,next){
   var title=req.body.bug_title;
    var sys=req.body.sys_id;
    var dep=req.body.bug_dep;
    var model=req.body.bug_block;
    var descrption=req.body.h_description;
    var suggest=req.body.h_suggest;
    var level=req.body.bug_level;

    //var bug_userid=req.body.userid;
    m_bug.insertBUG(title,sys,dep,model,descrption,suggest,level,req.session.uid,req.session.local,req.session.dep,function(data){
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

/*BUG动态读取板块或界面列表  by ajax*/
router.post('/ajax/get_models_list',function(req,res,next){
    var sys_id=req.body.sys_id;
    var dep_id=req.body.dep_id;
    var m_sys_list=require('../models/m_sys_list');
    m_sys_list.show_SysList('model',sys_id,dep_id,function(data){
        if(data=='[]'|| data==''){
            res.json('false');
        }else{
            res.json(data);
        }

    });
    //conosle.log("sys_id======="+sys_id);
    //conosle.log("dep_id======="+dep_id);
});

/*查看BUG任务详情页*/
router.get('/bug_detail',function(req,res,next){
    if(req.session.uid==undefined||req.session.uid==''){
        res.render('user/login',{data:'0'});
    }else {
        var url = require('url');
        var bug_id = url.parse(req.url).query;//主系统编号
        var session = require('../lib/c_session').get_Session(req);
        var async = require('async');
        async.series({
            one: function (callback) {
                try {
                    var data = {};
                    m_bug.bug_detail(bug_id, function (result) {
                        data = {'session': session,
                            'data': result
                        };
                        callback(null,data);
                    });

                } catch (ex) {
                    console.log("routs----/bug_detail===one:==>" + ex);
                }
            },
            two: function (callback) {

                try{
                    var data={};
                    m_bug.get_commu(bug_id,function(result){
                        data={'commu':result};
                        callback(null,data);
                    });


                }catch(ex){
                    console.log("routs----/bug_detail===two:==>" + ex);
                }

            }
        }, function (err, results) {
            console.log("routes----but/bug_detail===>"+err)
            var isExecutioner=false;
            var isSubmit_user=false;
            var isCommonder=false;
            if(req.session.uid==results.one.data.executioner_id){
                isExecutioner=true;
            }
            if(req.session.uid==results.one.data.submit_user_id){
                isSubmit_user=true;
            }
            if(req.session.dep==10 && req.session.level==3)
            {
                isCommonder=true;
            }
            json_data={'session':results.one.session,
                'data':results.one.data,
                'commu':results.two.commu,
                'isExecutioner':isExecutioner,
                'isSubmit_user':isSubmit_user,
                'isCommonder':isCommonder
            };
            res.render('bug/bug_detail', json_data);
        });
    }

});


/*任务确认及分派*/
router.post('/ajax/set_bug_task',function(req,res,next){
    var bug_id=req.body.bug_id;//任务ID编号
    var process_statue=req.body.process_statue;//任务状态
    var person_id=req.body.person_id;//被分派任务人ID
    var rwsm=req.body.rwsm;//任务说明信息
    var rwfpr_id=req.session.uid;//任务分派人ID
    var name=req.body.person_name
    m_bug.set_bug_task(bug_id,process_statue,person_id,rwsm,rwfpr_id,name,function(data){
        res.json(data);
    });
});

/*提交任务确认时间*/
router.post('/ajax/set_work_time',function(req,res,next){
    var date=req.body.date;//工作完成时间
    var bug_id=req.body.bug_id;//修改BUG任务ID
    m_bug.set_worktime(date,bug_id,function(data){
        res.json(data);
    });

});

/*提交BUG沟通记录*/
router.post('/ajax/set_commu',function(req,res,next){
    var bug_id=req.body.bug_id;//任务ID编号
    var context=req.body.data;//内容
    var tj_userid=req.session.uid;//提交人ID
    var tj_rname=req.session.rname;//提交人真实姓名
    m_bug.set_commu(bug_id,tj_userid,tj_rname,context,function(data){
        res.json(data);
    });

});

/*提交任务总结*/
router.post('/ajax/set_rwzj',function(req,res,next){
    var bug_id=req.body.bug_id;
    var context=req.body.data;
    m_bug.set_rwzj(bug_id,context,function(data){
        res.json(data);
    });

});

/*提交任务确认*/
router.post('/ajax/set_rwqr',function(req,res,next){
    var bug_id=req.body.bug_id;
    m_bug.set_rwqr(bug_id,function(data){
        res.json(data);
    });

});

module.exports = router;