/**
 * Created by winson on 10/13/15.
 * BUG提交系统相关数据库操作
 */
var db=require('../database/database');
var log= require('../lib/log').logger;





/*
*BUG报告信息插入到数据库
*/
exports.insertBUG=function(title,sys,dep,model,description,suggest,level,bug_userid,callback){
    var sql="insert into bug_tracke (title,bug_sys,bug_dep,bug_model,bug_description,bug_suggest,bug_level,submit_user_id) values (?,?,?,?,?,?,?,?)";
    db.pool.getConnection(function(err,conn){
        if(err){
           console.log("m_bug------>insertBUG====>"+err);
            callback(0);

        }else{
            conn.query(sql,[title,sys,dep,model,description,suggest,level,bug_userid],function(err,data){
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
* */
exports.showBUG=function(uid,level,local,dev,callback){

    if(level==3) {
        //信息部主管
        var sql = "select processing_statue, id_bug_tracke,title,bug_description,bug_model,bug_sys,bug_dep,submit_user_id,date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time from bug_tracke order by submit_time Desc";
    }else {
        //信息部职员
        var sql = "select processing_statue, id_bug_tracke,title,bug_description,bug_model,bug_sys,bug_dep,submit_user_id,date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time from bug_tracke where bug_executioner_id="+uid+" order by submit_time Desc";
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
                                    'statue':results[i].processing_statue
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
    var sql="select * from bug_tracke where id_bug_tracke=?";
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
                            'executioner_name':result[0].bug_executioner_name};

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
    var sql="update bug_tracke set processing_statue=? ,bug_executioner_id=?,tesk_descrption=?,task_person_id=? ,bug_executioner_name=? where id_bug_tracke="+bug_id;
    try{
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log("====m_bug-----set_bug_task==error==>>>>"+err);
                log.info("====m_bug-----set_bug_task==error==>>>>"+err);
            }else{
                conn.query(sql,[process_statue,person_id,rwsm,rwfpr_id,name],function(err,data){
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