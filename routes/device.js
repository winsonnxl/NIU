/**
 * Created by winson on 10/24/15.
 */

var express = require('express');
var router = express.Router();
var m_users=require('../models/m_users');


/*用户个人设备信息编辑页*/
router.get('/edit_device',function(req,res,next){
    if(req.session.uid==undefined||req.session.uid==''){
        res.render('user/login',{data:'0'});
    }else {
        var url = require('url');
        var userid=url.parse(req.url,true).query.userid;
        var device_id=url.parse(req.url,true).query.device_id;
        var local=url.parse(req.url,true).query.local;
        var dep=url.parse(req.url,true).query.dep;
        var hasUser=false;
        if(userid==undefined||userid==''){
            userid=0;
        }else{
            hasUser=true;
        }
        if(device_id==undefined||device_id==''){
            device_id=0;
        }
        var device_dic=require('../models/m_device_dic');
        var async = require('async');
        async.series({
            one:function(callback){
                device_dic.getDeviceInfo(function(data){
                    callback(null,data);
                });
            },
            two:function(callback){
                require('../models/m_device').get_device_info(userid,device_id,function(data){
                    callback(null,data);
                });
            }
        },function(err,data){
            var session = require('../lib/c_session').get_Session(req);
            if(data.two.length>0){
                var browser=data.two[0].browser.split(',');
                if(data.two[0].cpu_type!=0||data.two[0].cpu_type!=null||data.two.cpu_type!=undefined){
                    device_dic.get_cpu_type(data.two[0].cpu_brand,function(cpu_type){
                        res.render('device/edit_device',{'session':session, 'userid':userid,'user_local':local,'user_dep':dep,'device_info':data.one, 'has_set':data.two,'cpu_type':cpu_type,'isUser':hasUser,'local':global.company_local,'company':global.company_info});
                    });
                }else{
                    res.render('device/edit_device',{'session':session, 'userid':userid,'user_local':local,'user_dep':dep,'device_info':data.one, 'has_set':data.two,'cpu_type':0,'isUser':hasUser,'local':global.company_local,'company':global.company_info});
                }
            }else{
                res.render('device/edit_device',{'session':session,'userid':userid,'user_local':local,'user_dep':dep,'device_info':data.one, 'has_set':data.two,'cpu_type':0,'hasUser':hasUser,'local':global.company_local,'company':global.company_info});
            }


        });



    }
});


/*提交设备信息*/
router.post('/set_device_info',function(req,res,next){
    if(req.session.uid==undefined||req.session.uid==''){
        res.render('user/login',{data:'0'});
    }else {
        //var session = require('../lib/c_session').get_Session(req);
        var device_id=req.body.device_id;
        var isupdate=req.body.isupdate;
        var userid=req.body.userid;
        var devicetype=req.body.devicetype;
        var brand=req.body.brand;
        var sn=req.body.sn;
        var cpu_brand=req.body.cpu_brand;
        var cpu_type=req.body.cpu_type;
        var hd=req.body.hd;
        var memory=req.body.memory_size;
        var cd=req.body.cd;
        var os=req.body.os;
        var browser=req.body.browser_values;
        var local=req.body.local;
        var dep=req.body.dep;
        var time_buying=req.body.time_buying
        //var office=req.body.office;
        var defense=req.body.defense;
        require('../models/m_users_device').set_device_info(isupdate,device_id,userid,devicetype,brand,sn,cpu_brand,cpu_type,hd,memory,cd,os,browser,defense,local,dep,time_buying,function(data){
            if(data){
                res.send("设备信息提交成功！");
            }else{
                res.send("设备信息提交失败！");
            }

        });


    }

});

/*获得CPU型号*/
router.post('/ajax/get_cpu_type',function(req,res,next){
    var brand=req.body.cpu_brand;
    require('../models/m_device_dic').get_cpu_type(brand,function(data){
        res.json(data);
    });
});

/*获得个人用户已绑定设备信息*/
router.get('/get_person_device_info',function(req,res,next){
    var userid=req.session.uid;
    require('../models/m_device').get_device_info(userid,0,function(data){
        var results=new Array;
        results[0]=0;
        if(data.length>0){
            var type=global.m_device_info[data[0].device_type];
            var brand=global.m_device_info[data[0].brand];
            var sn=data[0].sn;
            var cpu=global.m_device_info[data[0].cpu_brand];
            var cpu_type=global.m_device_info[data[0].cpu_type];
            var cd=global.m_device_info[data[0].cd];
            var os=global.m_device_info[data[0].os];
            var def=global.m_device_info[data[0].defense];
            if(type==undefined)type='';
            if(brand==undefined)brand='';
            if(sn==undefined)sn='';
            if(cpu==undefined)cpu='';
            if(cpu_type==undefined)cpu_type='';
            if(cd==undefined)cd='';
            if(os==undefined)os='';
            if(def==undefined)def='';


            results[0]=1;
            results[1]="设备编号： "+data[0].id;
            results[2]="设备类型： "+type;
            results[3]="品牌及编号： "+brand+' '+sn;
            results[4]="CPU: "+cpu+' '+cpu_type;
            results[5]="硬盘: "+data[0].harddisk;
            results[6]="内存: "+data[0].memory_size;
            results[7]="光驱: "+cd;
            results[8]="操作系统: "+os;
            results[9]="杀毒软件: "+def;
            results[10]=data[0].id;//设备编号
            results[11]=data[0].device_type;//设备类型
            res.json(results);

        }else{
            //results[0]='0';
            res.json(results);
        }
    });
});

/*申请设备维修*/
router.get('/submit_repair',function(req,res,next){
    if(req.session.uid==undefined||req.session.uid==''){
        res.render('user/login',{data:'0'});
    }else {
        var session = require('../lib/c_session').get_Session(req);
        var async = require('async');
        async.series({
            one:function(callback){
            require('../models/m_device_dic').get_device_item(function(data){
                callback(null,data);
            });
            },
            two:function(callback){
                require('../models/m_users_device').User_had_Device(req.session.uid,function(data){
                    //console.log("是否有设备绑定："+data[0].id);
                    callback(null,data);
                });
            }
        },function(err,results){
            res.render('device/submit_repair',
                {'session':session,
                    'item':results.one,
                    'person_device':results.two});
        });


    }
});

/*获取设备信息*/
router.post('/get_device_name',function(req,res,next){
    if(req.session.uid==undefined||req.session.uid==''){
        res.render('user/login',{data:'0'});
    }else {
        var item_id=req.body.item_id;
        require('../models/m_device').get_device_name(item_id,function(data){
            for(var i=0;i<data.length;i++){
                data[i].brand=global.m_device_info[data[i].brand];
            }
            res.json(data);
        });
    }
});

/*提交维修申请*/
router.post('/submit_repair',function(req,res,next){
    var type=req.body.repair_type;
    var device_item=req.body.device_item;
    var device_name=req.body.device_name;
    var device_description=req.body.device_description;
    var user_id=req.session.uid;
    var user_local=req.session.local;
    var user_dep=req.session.dep;
    var title=req.body.repair_title;
    var person_device_id=req.body.person_device_id;
    var person_device_type=req.body.person_device_type;
    var statue=0;
    if(type==1){
        if(person_device_id==undefined) person_device_id=0;
        if(person_device_type==undefined) person_device_type=0;
        require('../models/m_device_repair').submit_repair(title,type,person_device_type,person_device_id,device_description,user_id,user_local,user_dep,statue,user_local,user_dep,function(data){
                if(data){
                    res.send('提交成功！');
                }else{
                    res.send('失败！');
                }
            }
        );

    }
    if(type==2){
    require('../models/m_device_repair').submit_repair(title,type,device_item,device_name,device_description,user_id,user_local,user_dep,statue,user_local,user_dep,function(data){
            if(data){
                res.send('提交成功！');
            }else{
                res.send('失败！');
            }
        }
    );
    }

});

/*维修申请详细页*/
router.get('/repair_detail',function(req,res,next){
    if(req.session.uid==undefined||req.session.uid==''){
        res.render('user/login',{data:'0'});
    }else {
        var url = require('url');
        var repair_id = url.parse(req.url).query;//维护工作主编号
        var session = require('../lib/c_session').get_Session(req);

        require('../models/m_device_repair').get_repair(repair_id,function(data){
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
            res.render('device/repair_detail',{'session':session,'repair':data,'isExecutioner':isExecutioner,'isSubmitUser':isSubmitUser,'isCommonder':isCommonder});
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
    require('../models/m_device_repair').update_repair(data,repair_id,function(data){
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
    require('../models/m_device_repair').update_repair(data,repair_id,function(data){
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
    require('../models/m_device_repair').update_repair(data,repair_id,function(data){
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
    require('../models/m_device_repair').update_repair(data,repair_id,function(data){
        if(data.affectedRows){
            res.json(1);
        }else{
            res.json(0);
        }
    });
});

/*获取repair_dic列表*/
router.post('/ajax/get_device_item',function(req,res,next){
    var level=req.body.level;
    require('../models/m_device_dic').get_device_item(function(data){
       if(data.length>0){
           res.json(data);
       } else{
           res.json(0);
       }
    });
});

router.post('/ajax/get_type10',function(req,res,next){
    var level=req.body.level;
    require('../models/m_device_dic').get_type10(level,function(data){
        res.json(data);
    });
});

router.get('/get_device_list',function(req,res,next){
    if(req.session.uid==undefined||req.session.uid==''){
        res.render('user/login',{data:'0'});
    }else {
        var session = require('../lib/c_session').get_Session(req);
        require('../models/m_users_device').get_device_list(function (data) {
            res.render('device/device_list',{'session':session,'device_list':data,'device_dic':global.m_device_info,'company_info':global.company_info});
        });
        //res.send("get_device_list");
    }
});

module.exports = router;