/**
 * Created by winson on 11/2/15.
 */
var express = require('express');
var router = express.Router();
var m_data_repair=require('../models/m_data_repair');

/*打开数据修复提交页*/
router.get('/take_submit',function(req,res,next){
    if(req.session.uid==undefined||req.session.uid==''){
        res.render('user/login',{data:'0'});
    }else {
        var session = require('../lib/c_session').get_Session(req);
        require('../models/m_sys_list').show_SysList('sys',0,0,function(data){
            res.render('data_repair/submit_data_repair',
                {'session':session, 'sys_list':data});

        });

    }
});

router.post('/submit_repair',function(req,res,next){
    var user_id=req.session.uid;
    var user_local=req.session.local;
    var user_dep=req.session.dep;
    var statue=0;
    var sys_id=req.body.sys_item;
    var dep_id=req.body.dep_item;
    var model_id=req.body.model_item;
    var description=req.body.repair_description;
    var title="修复"+' '+global.sysname_list[sys_id]+' '+global.sysname_list[dep_id]+' '+global.sysname_list[model_id]+"中的数据错误";
    m_data_repair.submit_repair(title,sys_id,dep_id,model_id,description,user_id,user_local,user_dep,statue,user_local,user_dep,function(data){
        if(data){
            res.send('提交成功！');
        }else{
            res.send('失败！');
        }
    });

});

/*数据维护申请详细页*/
router.get('/repair_detail',function(req,res,next){
    if(req.session.uid==undefined||req.session.uid==''){
        res.render('user/login',{data:'0'});
    }else {
        var url = require('url');
        var repair_id = url.parse(req.url).query;//维护工作主编号
        var session = require('../lib/c_session').get_Session(req);

        require('../models/m_data_repair').get_repair(repair_id,function(data){
            console.log(data);
            var isExecutioner=false;
            var isSubmitUser=false;
            var isCommonder=false;
            if(data[0].executioner_id==req.session.uid){
                isExecutioner=true;
                console.log("===================="+isExecutioner);
            }
            if(data[0].submit_user==req.session.uid){
                isSubmitUser=true;
            }
            if(req.session.dep==10 && req.session.level==3)
            {
                isCommonder=true;
            }
            res.render('data_repair/data_repair_detail',{'session':session,'repair':data,'isExecutioner':isExecutioner,'isSubmitUser':isSubmitUser,'isCommonder':isCommonder});
        });
    }
    //res.send('I am repair_detail page ^.^');
});


/*提交任务分派*/
router.post('/ajax/set_repair_task',function(req,res,next){
    var repair_id=req.body.repair_id;
    var statue=req.body.statue;
    var executioner_id=req.body.person_id;
    var executioner_name=req.body.person_name;
    var rwsm=req.body.rwsm;//任务说明
    //data[0]="repair_id="+req.body.repair_id;
    var data=[];
    data[0]="processing_statue='"+req.body.statue+"'";
    data[1]="executioner_id='"+req.body.person_id+"'";
    data[2]="executioner_name='"+req.body.person_name+"'";
    data[3]="rwsm='"+req.body.rwsm+"'";//任务说明
    data[4]="task_person_id='"+req.session.uid+"'";
    require('../models/m_data_repair').update_repair(data,repair_id,function(data){
        if(data.affectedRows){
            res.json(1);
        }else{
            res.json(0);
        }
    });

});

/*提交任务时间*/
router.post('/ajax/set_work_time',function(req,res,next){
    var repair_id=req.body.repair_id;
    var data=[];
    data[0]="work_end_date='"+req.body.date+"'";
    data[1]="confirm_time=CURRENT_TIMESTAMP";
    data[2]="processing_statue='3'";
    require('../models/m_data_repair').update_repair(data,repair_id,function(data){
        if(data.affectedRows){
            res.json(1);
        }else{
            res.json(0);
        }
    });
});

/*提交任务总结*/
router.post('/ajax/set_rwzj',function(req,res,next){
    var repair_id=req.body.repair_id;
    var data=[];
    data[0]="processing_result='"+req.body.rwzj+"'";
    data[1]="processing_statue='5'";
    data[2]="result_repair_item='"+req.body.result_repair_item+"'";
    data[3]="end_time=CURRENT_TIMESTAMP";
    data[4]="sql_backup='"+req.body.sql_backup+"'";
    require('../models/m_data_repair').update_repair(data,repair_id,function(data){
        if(data.affectedRows){
            res.json(1);
        }else{
            res.json(0);
        }
    });
});

/*提交任务已确认完成*/
router.post('/ajax/set_rwqr',function(req,res,next){
    var repair_id=req.body.repair_id;
    var data=[];
    data[0]="processing_statue='4'";
    require('../models/m_data_repair').update_repair(data,repair_id,function(data){
        if(data.affectedRows){
            res.json(1);
        }else{
            res.json(0);
        }
    });
});



module.exports = router;

