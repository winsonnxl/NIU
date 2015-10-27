/**
 * Created by winson on 10/27/15.
 */
var db=require('../database/database');

/*保存用户设备信息*/
exports.set_device_info=function(isupdate,device_id,user_id,device_type,brand,sn,cpu_brand,cpu_type,harddisk,memory,cd,os,browser,defense,callback){
    var sql="";
    if(isupdate==1){
        sql="update users_device set user_id=?,device_type=?,brand=?,sn=?,cpu_brand=?,cpu_type=?,harddisk=?,memory_size=?,cd=?,os=?,browser=?,defense=? where id="+device_id;
    }else {
        sql="insert into users_device (user_id,device_type,brand,sn,cpu_brand,cpu_type,harddisk,memory_size,cd,os,browser,defense) values (?,?,?,?,?,?,?,?,?,?,?,?)";
    }
    db.pool.getConnection(function(err,conn){
        if(err){
            console.log("--m_device====>set_device_info==>》"+err);
        }else{
            conn.query(sql,[user_id,device_type,brand,sn,cpu_brand,cpu_type,harddisk,memory,cd,os,browser,defense],function(err,result){
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