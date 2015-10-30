/**
 * Created by winson on 10/13/15.
 * BUG提交系统相关数据库操作
 */
var db=require('../database/database');
var log= require('../lib/log').logger;





/*
*BUG报告信息插入到数据库
*/
exports.insertBUG=function(title,sys,dep,model,description,suggest,level,bug_userid,submit_local,submit_dep,callback){
    var sql="insert into bug_tracke (title,bug_sys,bug_dep,bug_model,bug_description,bug_suggest,bug_level,submit_user_id,local,dep) values (?,?,?,?,?,?,?,?,?,?)";
    db.pool.getConnection(function(err,conn){
        if(err){
           console.log("m_bug------>insertBUG====>"+err);
            callback(0);

        }else{
            conn.query(sql,[title,sys,dep,model,description,suggest,level,bug_userid,submit_local,submit_dep],function(err,data){
                if(err){
                    console.log("m_bug------>insertBUG====>"+err);
                    callback(0);
                }else{
                    conn.release();
                    callback(data);
                }
            });
        }
    });

}

/*
*BUG记录查询
* isDev:判断是否未未卡法人员：0不是；1是
* */
exports.showBUG=function(uid,level,local,dev,isDev,callback){
    if(isDev){
        if(level==3) {
            //信息部主管
            var sql = "select processing_statue, id_bug_tracke,title,bug_description,bug_model,bug_sys,bug_dep,submit_user_id,date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time,date_format(work_end_date+'', '%Y-%m-%d') as work_time from bug_tracke order by submit_time asc";
        }else {
            //信息部职员
            var sql = "select processing_statue, id_bug_tracke,title,bug_description,bug_model,bug_sys,bug_dep,submit_user_id,date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time,date_format(work_end_date+'', '%Y-%m-%d') as work_time from bug_tracke where bug_executioner_id="+uid+" order by submit_time asc";
        }
    }else{
        var sql="select processing_statue, id_bug_tracke,title,bug_description,bug_model,bug_sys,bug_dep,submit_user_id,date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time,date_format(work_end_date+'', '%Y-%m-%d') as work_time from bug_tracke where submit_user_id="+uid+" order by submit_time asc";
    }


        try {
        db.pool.getConnection(function (err, conn) {
            if(err){
                console.log("m_bug------->showBUG======>"+err);
                log.info("m_bug------->showBUG======>"+err);
            }else{
                conn.query(sql,function(err,results){
                    if(err){
                        console.log("m_bug------->showBUG======>"+err);
                        log.info("m_bug------->showBUG======>"+err);
                    }else{
                        var data=[];
                        if(results.length>0){
                            //console.log("buglist=======>"+results[0]);

                            for(var i=0;i<results.length;i++){
                                data[i]={'bug_id':results[i].id_bug_tracke,
                                'bug_title':results[i].title,
                                'submit_time':results[i].submit_time,
                                'sys_name':global.sys_list_sys[results[i].bug_sys],
                                    'sys_dep':global.sys_list_deps[results[i].bug_sys+''+results[i].bug_dep],
                                    'sys_model':global.sys_list_models[results[i].bug_sys+''+results[i].bug_dep+''+results[i].bug_model],
                                    'statue':results[i].processing_statue,
                                    'work_time':results[i].work_time
                                };
                            }
                            callback(data);

                        }else{
                            data=0;
                            callback(data);
                        }
                        conn.release();
                    }
                });
            }

        });
    }catch(ex){
        console.log("m_bug------->showBUG======>"+err);
        log.info("m_bug------->showBUG======>"+err);
        callback(0);
    }
}

/*
* BUG详细记录
* */
exports.bug_detail=function(bugid,callback){
    //var sql="select *, from bug_tracke where id_bug_tracke=?";
    var sql = "select processing_result,submit_user_id,bug_executioner_id,bug_level,bug_suggest,bug_executioner_name,processing_statue, id_bug_tracke,title,bug_description,bug_model,bug_sys,bug_dep,submit_user_id,date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time,date_format(work_end_date+'', '%Y-%m-%d') as work_time from bug_tracke where id_bug_tracke=?";

    try{
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log("m_bug------->bug_detail======>"+err);
                log.info("m_bug------->bug_detail======>"+err);
            }else{
                conn.query(sql,bugid,function(err,result){
                    if(err){
                        console.log("m_bug------->bug_detail======>"+err);
                        log.info("m_bug------->bug_detail======>"+err);
                    }else{
                        var data={};
                        if(result.length>0){
                            data={'descript':result[0].bug_description,
                            'suggest':result[0].bug_suggest,
                            'bug_id':result[0].id_bug_tracke,
                            'bug_level':result[0].bug_level,
                            'bug_sys':global.sys_list_sys[result[0].bug_sys],
                            'bug_dep':global.sys_list_deps[result[0].bug_sys+''+result[0].bug_dep],
                            'bug_model':global.sys_list_models[result[0].bug_sys+''+result[0].bug_dep+''+result[0].bug_model],
                            'bug_statue':result[0].processing_statue,
                            'executioner_name':result[0].bug_executioner_name,
                                'executioner_id':result[0].bug_executioner_id,
                                'submit_user_id':result[0].submit_user_id,
                            'work_time':result[0].work_time,
                            'processing_result':result[0].processing_result};

                        }
                        callback(data);

                    }
                    conn.release();
                });
            }
        });

    }catch(ex){
        console.log("m_bug------->bug_detail======>"+ex);
        log.info("m_bug------->bug_detail======>"+ex);
    }
}

/*任务分派*/
exports.set_bug_task=function(bug_id,process_statue,person_id,rwsm,rwfpr_id,name,callback){
    var sql;
    if(process_statue==8 && person_id==0){
     sql="update bug_tracke set processing_statue=8 where id_bug_tracke="+bug_id
    }
    else {
        if(person_id==0){
            name='';
        }
        sql = "update bug_tracke set processing_statue=" + process_statue + " ,bug_executioner_id=" + person_id + ",tesk_descrption='" + rwsm + "',task_person_id=" + rwfpr_id + ",bug_executioner_name='" + name + "' where id_bug_tracke=" + bug_id;
    }
        try{
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log("====m_bug-----set_bug_task==error==>>>>"+err);
                log.info("====m_bug-----set_bug_task==error==>>>>"+err);
                callback(0);
            }else{
                conn.query(sql,function(err,data){
                    if(err){
                        console.log("====m_bug-----set_bug_task==error==>>>>"+err);
                        log.info("====m_bug-----set_bug_task==error==>>>>"+err);
                    }else{
                        if(data.affectedRows){
                            callback(1);
                        }else{
                            callback(0);
                        }
                    }
                    conn.release();

                });
            }
        });

    }catch(ex){
        console.log("====m_bug-----set_bug_task==error==>>>>"+ex);
        log.info("====m_bug-----set_bug_task==error==>>>>"+ex);
        callback(0);

    }
}

/*提交工作完成时间*/
exports.set_worktime=function(date,bug_id,callback){
    var sql="update bug_tracke set confirm_time=?,processing_statue=?,work_end_date=? where id_bug_tracke="+bug_id;
    try{
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log("====m_bug-----set_worktime==error==>>>>"+err);
                log.info("====m_bug-----set_worktime==error==>>>>"+err);
                callback(0);
            }else{
                conn.query(sql,[new Date(),3,date],function(err,data){
                    if(err){
                        console.log("====m_bug-----set_worktime==error==>>>>"+err);
                        log.info("====m_bug-----set_worktime==error==>>>>"+err);
                        callback(0);
                    }else{
                        if(data.affectedRows){
                            callback(1);
                        }else{
                            callback(0);
                        }
                    }
                    conn.release();
                });
            }
        });

    }catch(ex){
        console.log("====m_bug-----set_worktime==error==>>>>"+ex);
        log.info("====m_bug-----set_worktime==error==>>>>"+ex);
        callback(0);
    }
}

/*提交BUG沟通记录*/
exports.set_commu=function(bug_id,tj_user_id,tj_user_rname,context,callback){
    var sql="insert into bug_tacke_communication (bug_tracke_id,communication,submit_user_id,submit_user_rname) values(?,?,?,?)";
    try{
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log("====m_bug-----set_commu==error==>>>>"+err);
                log.info("====m_bug-----set_commu==error==>>>>"+err);
                callback(0);
            }else{
                conn.query(sql,[bug_id,context,tj_user_id,tj_user_rname],function(err,data){
                    if(err){
                        console.log("====m_bug-----set_commu==error==>>>>"+err);
                        log.info("====m_bug-----set_commu==error==>>>>"+err);
                        callback(0);
                    }else{
                        if(data.affectedRows){
                            callback(1);
                        }else{
                            callback(0);
                        }
                    }
                    conn.release();
                });
            }
        });
    }catch(ex){
        console.log("====m_bug-----set_commu==error==>>>>"+ex);
        log.info("====m_bug-----set_commu==error==>>>>"+ex);
        callback(0);
    }

}

/*查询沟通记录*/
exports.get_commu=function(bug_id,callback){
    var sql="select communication,submit_user_id,submit_user_rname,level,date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time from bug_tacke_communication where bug_tracke_id=? order by submit_time asc";
    try{
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log("====m_bug-----get_commu==error==>>>>"+err);
                log.info("====m_bug-----get_commu==error==>>>>"+err);
            }else{
                conn.query(sql,bug_id,function(err,result){
                    if(err){
                        console.log("====m_bug-----get_commu==error==>>>>"+err);
                        log.info("====m_bug-----get_commu==error==>>>>"+err);
                    }else{
                        var data=[];
                        var date=[];
                        var x=0;
                        for(var i=0;i<result.length;i++){
                            data[i]={'context':result[i].communication,
                            'submit_user_id':result[i].submit_user_id,
                            'submit_user_rname':result[i].submit_user_rname,
                            'level':result[i].level,
                            'submit_time':result[i].submit_time.substr(0,10),//精确到日，用于分段
                            'submit_time1':result[i].submit_time//精确到分秒
                             };

                            if(x==0){
                                date[i]=result[i].submit_time.substr(0,10);
                                x++;
                            }else{
                                if(date[x-1]!=result[i].submit_time.substr(0,10)){
                                    date[x]=result[i].submit_time.substr(0,10);
                                    x++;
                                }
                            }
                        }
                        callback({'commu':data,'date':date});
                    }
                });
            }
        });
    }catch(ex){
        console.log("====m_bug-----get_commu==error==>>>>"+ex);
        log.info("====m_bug-----get_commu==error==>>>>"+ex);
    }
}

/*提交任务总结记录*/
exports.set_rwzj=function(bug_id,context,callback){
    var sql="update bug_tracke set processing_result=?,processing_statue=? where id_bug_tracke="+bug_id;
    try{
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log("====m_bug-----set_rwzj==error==>>>>"+err);
                log.info("====m_bug-----set_rwzj==error==>>>>"+err);
                callback(0);
            }else{
                conn.query(sql,[context,5],function(err,result){
                    if(err){
                        console.log("====m_bug-----set_rwzj==error==>>>>"+err);
                        log.info("====m_bug-----set_rwzj==error==>>>>"+err);
                        callback(0);
                    }else{
                        if(result.affectedRows){
                            callback(1);
                        }else{
                            callback(0);
                        }
                    }
                    conn.release();
                });
            }
        });
    }catch(ex){
        console.log("====m_bug-----set_rwzj==error==>>>>"+ex);
        log.info("====m_bug-----set_rwzj==error==>>>>"+ex);
    }
}

/*提交任务确认*/
exports.set_rwqr=function(bug_id,callback){
    var sql="update bug_tracke set processing_statue=? where id_bug_tracke="+bug_id;
    try{
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log("====m_bug-----set_rwzj==error==>>>>"+err);
                log.info("====m_bug-----set_rwzj==error==>>>>"+err);
                callback(0);
            }else{
                conn.query(sql,4,function(err,result){
                    if(err){
                        console.log("====m_bug-----set_rwzj==error==>>>>"+err);
                        log.info("====m_bug-----set_rwzj==error==>>>>"+err);
                        callback(0);
                    }else{
                        if(result.affectedRows){
                            callback(1);
                        }else{
                            callback(0);
                        }
                    }
                    conn.release();
                });
            }
        });
    }catch(ex){
        console.log("====m_bug-----set_rwzj==error==>>>>"+ex);
        log.info("====m_bug-----set_rwzj==error==>>>>"+ex);
    }
}