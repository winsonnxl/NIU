/**
 * Created by winson on 10/15/15.
 * 图取预制数据
 * global.sys_list_sys 系统名单【1】
 * global.sys_list_deps 部门模块名单【11】
 * global.sys_list_models 功能模块或界面名单【111】
 */
var db=require('../database/database');
var log= require('../lib/log').logger;

exports.getSys_List=function(){
    var sql="select * from sys_list";//获取全部model名单
    var sql1="select * from sys_list where dep_id=0 and model_id=0";//获取sys名单
    var sql2="select * from sys_list where model_id=0 and dep_id>0"//获取dep名单
    try{//获取全部model名单
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log("m_sys_list=>>>>>>setSys_List: error "+err);
                log.info("m_sys_list=>>>>>>setSys_List: error "+err);
            }else{
                conn.query(sql,function(err,result){
                    if(err){
                        console.log("m_sys_list=>>>>>>setSys_List: error "+err);
                        log.info("m_sys_list=>>>>>>setSys_List: error "+err);
                    }else{

                        var tmp_result=[];
                        for(var i=0;i<result.length;i++){
                            //1:sysid; 2:depid ; 3:modelid
                            //tmp_result[result[i].sys_id+''+result[i].dep_id+''+result[i].model_id]=result[i].name;
                            tmp_result[result[i].id]=result[i].name;
                        }
                        /*
                        global.sys_list_models =tmp_result;
                        console.log("global.sys_list_models======>>>>"+global.sys_list_models);
                        log.info("m_sys_list=>>>>>>global.sys_list: error "+global.sys_list_models);
                        */
                        global.sysname_list=tmp_result;
                        console.log("global.sysname_list======>>>>"+global.sysname_list);

                    }
                });
                /*
                //获取sys名单
                conn.query(sql1,function(err,result){
                    if(err){
                        console.log("m_sys_list=>>>>>>setSys_List: error "+err);
                        log.info("m_sys_list=>>>>>>setSys_List: error "+err);
                    }else{
                        var sys_list=[];
                        for(var i=0;i<result.length;i++){
                            sys_list[result[i].sys_id]=result[i].name;
                        }
                        global.sys_list_sys=sys_list;
                        console.log("global.sys_list_sys======>>>>"+global.sys_list_sys);
                        log.info("m_sys_list=>>>>>>global.sys_list_sys: error "+global.sys_list_sys);

                    }
                });
                //获取dep名单
                conn.query(sql2,function(err,result){
                    if(err){
                        console.log("m_sys_list=>>>>>>setSys_List: error "+err);
                        log.info("m_sys_list=>>>>>>setSys_List: error "+err);
                    }else{
                        var sys_list1=[];
                        for(var i=0;i<result.length;i++){
                            sys_list1[result[i].sys_id+''+result[i].dep_id]=result[i].name;
                            console.log("sys_list1=============="+sys_list1);
                        }
                        global.sys_list_deps=sys_list1;
                        console.log("global.sys_list_deps======>>>>"+global.sys_list_deps);
                        log.info("m_sys_list=>>>>>>global.sys_list_deps: error "+global.sys_list_deps);

                    }

                });*/
                conn.release();

            }
        });

    }catch(ex){
        console.log("m_sys_list=>>>>>>setSys_List: error "+ex);
        log.info("m_sys_list=>>>>>>setSys_List: error "+ex);
    }

}

/*
 *查询sys_list表
 * select:dep(dep_id);model(model_id)
 */
exports.show_SysList=function(select,sys,dep,callback){
    var sql;
    switch(select){
        case 'dep':
            sql="select * from sys_list where sys_id="+sys+" and dep_id=0";
            break;
        case 'model':
            sql="select * from sys_list where sys_id="+sys+" and dep_id="+dep;
            break;
        case 'sys':
            sql="select * from sys_list where sys_id=0 and dep_id=0 and model_id=0";
            break;
        default :break;
    }
    db.pool.getConnection(function(err,conn){
        if(err){
            console.log("m_sys_list------>show_SysList====>\n"+err);
            callback(0);
        }else{
            try{
                conn.query(sql,function(err,data){
                    if(err){
                        console.log("m_sys_list------>show_SysList====>\n"+err);
                        callback(0);
                    }else {
                        var result = [];
                        for(var i=0;i<data.length;i++){
                            result[i]={
                                name:data[i].name,
                                id:data[i].id
                            }
                        }
                        /*
                        if (select == 'dep') {
                            for (var i = 0; i < data.length; i++) {
                                result[i] = {
                                    name: data[i].name,
                                    dep_id: data[i].dep_id
                                };
                            }
                        }
                        if (select == 'model') {
                            for (var i = 0; i < data.length; i++) {
                                result[i] = {
                                    name: data[i].name,
                                    model_id: data[i].model_id
                                };
                            }
                        }
                        if(select=='sys'){
                            for(var i=0;i<data.length;i++){
                                result[i]={
                                    name:data[i].name,
                                    sys_id:data[i].id
                                };
                            }
                        }
                        */


                        conn.release();
                        callback(result);
                    }
                });}catch(ex){
                console.log("m_bug------>m_sys_list====>\n"+ex);
            }
        }
    });
}