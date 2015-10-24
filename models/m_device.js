/**
 * Created by winson on 10/23/15.
 * users_device
 */
var db=require('../database/database');

exports.set_device_info=function(user_id,device_type,brand,sn,cpu_brand,cpu_type,harddisk,memory,cd,os,browser,office,defense,callback){
    var sql="insert into users_device (user_id,device_type,brand,sn,cpu_brand,cpu_type,harddisk,memory_size,cd,os,browser,office,defense) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.pool.getConnection(function(err,conn){
        if(err){
            console.log("--m_device====>set_device_info==>》"+err);
        }else{
            conn.query(sql,[user_id,device_type,brand,sn,cpu_brand,cpu_type,harddisk,memory,cd,os,browser,office,defense],function(err,result){
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