/**
 * Created by winson on 10/3/15.
 */
var db=require('../database/database');

exports.show=function(){
   var sql="select * from users";
    db.pool.getConnection(function(err,connection){
        if(err){
            console.log("POOL==>"+err);
            return;
        }
        connection.query(sql,function(err,results){
            if(err){
                console.log("POOL==>connection error");
                return;
            }
            //console.log("现在的时间："+new Date());
            if(results.length>0){

            }
            console.log("运行结果"+results.length);
            connection.release();
            return results;
        });
    });
}

/*插入用户注册信息*/
exports.reg=function(u_name,u_pw,u_pw2,r_name,phone,work_local,dep,callback){
    if (u_pw!=u_pw2){
        callback(0);
    }else {
        var crypto=require('crypto');
        var md5=crypto.createHash('md5').update(u_pw).digest('hex');

        var sql = "insert into users (name,pw,real_name,mobile,dep,local) values(?,?,?,?,?,?)";
        db.pool.getConnection(function (err, connection) {
            if (err) {
                console.log("POOL==>models/users/reg=>>>" + err);
                return 0;
            }
            connection.query(sql, [u_name, md5, r_name, phone, dep, work_local], function (err, data) {
                if (err) {
                    console.log("POOL==>models/users/reg=>>>" + err);
                    callback(0);
                } else {
                    connection.release();
                    callback(data);
                }

            });
        });
    }
}


/*用户登录*/
exports.login=function(username,pw,callback){
    if(username==''||username==null||pw==''||pw==null){
        callback(0);
    }else{
        var sql="select id,real_name,mobile,local,dep,level from users where name= ? and pw= ?";
        db.pool.getConnection(function(err,conn){
                if(err){
                    console.log("models/m_users.js==>login==>"+err);
                    callback(0);
                }
                var crypto=require('crypto');
                var md5=crypto.createHash('md5').update(pw).digest('hex');
                conn.query(sql,[username,md5],function(err,data){
                    if(err){
                        console.log("models/m_users.js==>login==>"+err);
                        callback(0);
                    }else{
                        conn.release();
                        if(data[0]==''||data[0]==null){
                            callback(0);
                        }else {
                            callback(data);
                        }
                    }
                });
            }

        );
    }

}