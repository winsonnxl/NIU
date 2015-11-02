/**
 * Created by winson on 11/2/15.
 */



var db=require('../database/database');

/*插入数据*/
exports.submit_repair=function(title,sys_id,dep_id,model_id,description,user_id,user_local,user_dep,statue,local,dep,callback){
    var sql="insert into data_repair (title,sys_id,dep_id,model_id,description,submit_user,submit_user_dep,submit_user_local,processing_statue,local,dep) values (?,?,?,?,?,?,?,?,?,?,?)";
    try{
        db.pool.getConnection(function(err,con){
            if(err){
                console.log("==>m_data_repair=====>subit_repair==>\n"+err);
                callback(0);
            }else{
                con.query(sql,[title,sys_id,dep_id,model_id,description,user_id,user_dep,user_local,statue,local,dep,local,dep],function(err,data){
                    if(err){
                        console.log("==>m_data_repair=====>subit_repair= query=>\n"+err);
                        callback(0);
                    }else{
                        if(data.affectedRows){
                            callback(1);
                        }else{
                            callback(0);
                        }
                    }
                    con.release();
                });
            }
        });
    }catch(ex){
        console.log("==>m_data_repair=====>subit_repair==>\n"+ex);
    }
}

/*查询维修任务
 * isDep:是否未信息部人员 0否，1是
 * */

exports.show_repair_list=function(isDep,user_id,user_level,user_dep,user_local,callback){
    var sql;
    if(isDep){
        if(user_level==3) {
            //信息部主管
            var sql = "select id,date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time,sys_id,dep_id,model_id,processing_statue,title,submit_user_local,submit_user_dep from data_repair order by submit_time asc";
        }else {
            //信息部职员
            var sql = "select id, date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time,sys_id,dep_id,model_id,processing_statue,title,submit_user_local,submit_user_dep from data_repair where executioner_id="+user_id+" order by submit_time asc";
        }
    }else{

        var sql = "select id, date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time,sys_id,dep_id,model_id,processing_statue,title,submit_user_local,submit_user_dep from data_repair where submit_user="+user_id+" order by submit_time asc";

    }
    try{
        db.pool.getConnection(function(err,con){
            if(err){
                console.log("==>m_data_repair=====>show_repair_list==>\n"+err);
            }else{
                con.query(sql,function(err,data){
                    if(err){
                        console.log("==>m_data_repair=====>show_repair_list===query=>\n"+err);
                    }else{
                        callback(data);
                    }
                    con.release();
                })
            }
        });

    }catch(ex){
        console.log("==>m_data_repair=====>show_repair_list==>\n"+ex);
    }
}

/*查询申请详细内容*/
exports.get_repair=function(repair_id,callback){
    var sql="select id,sys_id,dep_id,model_id,description,date_format(submit_time+'', '%Y-%m-%d %H:%m:%S') as submit_time,submit_user,submit_user_dep,submit_user_local,processing_statue,processing_result,date_format(end_time+'', '%Y-%m-%d %H:%m:%S') as end_time,task_person_id,executioner_id,executioner_name,title,sql_backup from data_repair where id="+repair_id;
    try{
        db.pool.getConnection(function(err,con){
            if(err){
                console.log("---m_data_repair===>get_repair===>\n"+err);
            }else{
                con.query(sql,function(err,data){
                    if(err){
                        console.log("---m_data_repair===>get_repair==query=>\n"+err);
                    }else{
                        callback(data);
                    }
                    con.release();
                });
            }
        });
    }catch(ex){
        console.log("---m_data_repair===>get_repair===>\n"+ex);
    }
}

/*公用更新数据方法*/
exports.update_repair=function(update,id,callback){
    var txt='';
    for(i in update){
        txt+=update[i]+',';
    }
    var sql="update data_repair set "+txt.substring(0,txt.length-1)+" where id="+id;
    //console.log("update数值==\n"+sql);
    try{
        db.pool.getConnection(function(err,con){
            if(err){
                console.log("==m_device_repair====》update_repair===>\n"+ex);
            }else{
                con.query(sql,function(err,data){
                    if(err){
                        console.log("==m_device_repair====》update_repair==query==>\n"+err);
                    }else{
                        callback(data);
                    }
                    con.release();
                });
            }
        });

    }catch(ex){
        console.log("==m_device_repair====》update_repair===>\n"+ex);
    }
}