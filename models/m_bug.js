/**
 * Created by winson on 10/13/15.
 * BUG提交系统相关数据库操作
 */
var db=require('../database/database');

/*
*BUG报告信息插入到数据库
*/
exports.insertBUG=function(title,block,description,suggest,level,bug_userid,callback){
    var sql="insert into bug_tracke (title,bug_block,bug_description,bug_suggest,bug_level,submit_user_id) values (?,?,?,?,?,?)";
    db.pool.getConnection(function(err,conn){
        if(err){
           console.log("m_bug------>insertBUG====>"+err);
            callback(0);

        }else{
            conn.query(sql,[title,block,description,suggest,level,bug_userid],function(err,data){
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