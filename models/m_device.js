/**
 * Created by winson on 10/23/15.
 * users_device
 */
var db=require('../database/database');

/*保存用户设备信息*/
/*
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
*/
/*读取用户设备信息*/
exports.get_device_info=function(user_id,device_id,callback){
    var sql="";
    if(user_id>0){
        sql="select * from users_device where user_id="+user_id;
    }
    if(device_id>0){
        sql="select * from users_device where id="+device_id;
    }
    if(user_id==0&&device_id==0){
        sql="select * from users_device where id=0";
    }

    try{
        db.pool.getConnection(function(err,con){
            if(err){
                console.log("====>m_device===>get_device_info===>"+err);
            }else{
                con.query(sql,function(err,data){
                    if(err){
                        console.log("====>m_device===>get_device_info==query=>"+err);
                    }else{
                        callback(data);
                    }
                    con.release();
                });
            }
        });
    }catch(ex){
        console.log("====>m_device===>get_device_info===>"+ex);
    }
}

/*获取类型下全部设备*/
exports.get_device_name=function(item_id,callback){
    var sql="select id,brand,sn from users_device where device_type="+item_id;
    db.pool.getConnection(function(err,con){
        if(err){
            console.log("====>m_device===>get_device_name===>\n"+err);
        }else{
            con.query(sql,function(err,data){
                if(err){
                    console.log("====>m_device===>get_device_name==query=>\n"+err);
                }else{
                    callback(data);
                }
                con.release();
            });
        }
    });
}
