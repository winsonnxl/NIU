/**
 * Created by winson on 10/27/15.
 */
var db=require('../database/database');

/*保存用户设备信息*/
exports.set_device_info=function(isupdate,device_id,user_id,device_type,brand,sn,cpu_brand,cpu_type,harddisk,memory,cd,os,browser,defense,local,dep,time_buying,callback){
    var sql="";
    var list=[];
    if(isupdate==1){
        sql="update users_device set user_id=?,device_type=?,brand=?,sn=?,cpu_brand=?,cpu_type=?,harddisk=?,memory_size=?,cd=?,os=?,browser=?,defense=?,local=?,dep=?,time_buying=? where id="+device_id;
        list=[user_id,device_type,brand,sn,cpu_brand,cpu_type,harddisk,memory,cd,os,browser,defense,local,dep,time_buying];
    }else {
        sql="insert into users_device (user_id,device_type,brand,sn,cpu_brand,cpu_type,harddisk,memory_size,cd,os,browser,defense,local,dep,time_buying) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        list=[user_id,device_type,brand,sn,cpu_brand,cpu_type,harddisk,memory,cd,os,browser,defense,local,dep,time_buying];
    }
    db.pool.getConnection(function(err,conn){
        if(err){
            console.log("--m_device====>set_device_info==>》"+err);
        }else{
            conn.query(sql,list,function(err,result){
                if(err){
                    console.log("--m_device====>set_device_info==>》"+err);
                    callback(0);
                }else{
                    callback(1);
                }
                conn.release();
            })
        }
    });

}

/*获取全部设备列表*/
exports.get_device_list=function(callback){
    var sql="select * from users_device";
    try{
        db.pool.getConnection(function(err,con){
            if(err){
                console.log("====m_users_device===>get_device_list====>\n"+err);
            }else{
                con.query(sql,function(err,results){
                    if(err){
                        console.log("====m_users_device===>get_device_list==query==>\n"+err);
                    }else{
                        callback(results);
                    }
                    con.release();
                });
            }
        });
    }catch(ex){
        console.log("====m_users_device===>get_device_list====>\n"+ex);
    }
}

/*该用户是否绑定个人设备*/
exports.User_had_Device=function(userid,callback){
    var sql="select * from users_device where user_id="+userid;
    try{
        db.pool.getConnection(function(err,con){
            if(err){
                console.log("==m_users_device===>User_had_Device==>\n"+err);
            }else{
                con.query(sql,function(err,data){
                    if(err){
                        console.log("==m_users_device===>User_had_Device==query==>\n"+err);
                    }else{
                       callback(data);
                    }
                    con.release();
                });
            }
        });
    }catch(ex){
        console.log("==m_users_device===>User_had_Device==>\n"+ex);
    }
}