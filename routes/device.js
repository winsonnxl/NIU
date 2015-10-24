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
        var userid=url.parse(req.url,true).query.id;
        var device_dic=require('../models/m_device_dic');
        var async = require('async');
        async.series({
            one:function(callback){
                device_dic.getDeviceInfo(function(data){
                    callback(null,data);
                });
            },
            two:function(callback){
                require('../models/m_device').get_device_info(userid,function(data){
                    callback(null,data);
                });
            }
        },function(err,data){
            var session = require('../lib/c_session').get_Session(req);
            if(data.two.length>0){
                var browser=data.two[0].browser.split(',');
                if(data.two[0].cpu_type!=0||data.two[0].cpu_type!=null||data.two.cpu_type!=undefined){
                    device_dic.get_cpu_type(data.two[0].cpu_brand,function(cpu_type){
                        res.render('user/edit_device',{'session':session, 'userid':userid,'device_info':data.one, 'has_set':data.two,'cpu_type':cpu_type});
                    });
                }else{
                    res.render('user/edit_device',{'session':session, 'userid':userid,'device_info':data.one, 'has_set':data.two,'cpu_type':0});
                }
            }else{
                res.render('user/edit_device',{'session':session,'userid':userid, 'device_info':data.one, 'has_set':data.two,'cpu_type':0});
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
        //var office=req.body.office;
        var defense=req.body.defense;
        require('../models/m_device').set_device_info(isupdate,device_id,userid,devicetype,brand,sn,cpu_brand,cpu_type,hd,memory,cd,os,browser,defense,function(data){
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


module.exports = router;