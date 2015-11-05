/**
 * Created by winson on 10/3/15.
 */
var db=require('../database/database');

exports.getUser=function(userid,callback){
   var sql="select * from users where id=?";
    db.pool.getConnection(function(err,connection){
        if(err){
            console.log("m_users------>getUser==>"+err);
            return;
        }
        connection.query(sql,userid,function(err,result){
            if(err){
                console.log("m_users------>getUser==>"+err);
                return;
            }
            //console.log("现在的时间："+new Date());
            if(result.length>0){
                result[0].pw=0;
                callback(result);
            }
            connection.release();
        });
        //connection.release();
    });
}

/*插入用户注册信息*/
exports.reg=function(u_name,u_pw,u_pw2,r_name,phone,work_local,dep,callback){
    if (u_pw!=u_pw2){
        callback(0);
    }else {
        var crypto=require('crypto');
        var md5=crypto.createHash('md5').update(u_pw).digest('hex');

        var sql = "insert into users (name,pw,real_name,mobile,dep,local) values (?,?,?,?,?,?)";
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
                        conn.release();

                    }else{

                        if(data[0]==''||data[0]==null){
                            callback(0);

                        }else {
                            callback(data);

                        }
                    }
                    conn.release();

                });
            }

        );
    }

}

/*查询全部用户*/
exports.get_users_list=function(callback){
    var sql="select * from users";
    try{
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log('m_users=====>users_list==>>'+err);
                conn.release();
            }else{
                conn.query(sql,function(err,data){
                    if(err){
                        console.log('m_users=====>users_list==>>'+err);
                    }
                    else{
                        callback(data);
                    }
                    conn.release();
                });
            }
        });
    }catch(ex){
        console.log('m_users=====>users_list==>>\n'+ex);
    }
}

/*检查用户名是否唯一*/
exports.check_user_name=function(user_name,callback){
    var sql="select * from users where name='"+user_name+"'";
    try{
        db.pool.getConnection(function(err,conn){
            if(err){
                console.log('m_users=====>check_user_name==>>\n'+err);
                conn.release();
            }else{
                conn.query(sql,function(err,data){
                    if(err){
                        console.log('m_users=====>check_user_namet===query=>>\n'+err);
                    }
                    else{
                        if(data.length>=1){
                            callback(false);
                        }else{
                            callback(true);
                        }
                    }
                    conn.release();
                });
            }
        });

    }catch(ex){
        console.log('m_users=====>check_user_name==>>\n'+ex);
    }
}
