/**
 * Created by winson on 10/27/15.
 */
var db=require('../database/database');
/*查询维护信息字典李的列表*/
exports.get_repair_list=function(level,callback){
    var sql="select * from repair_dic where type="+level;
    try{
        db.pool.getConnection(function(err,con){
            if(err){
                console.log("===m_repair_dic===>get_repair_list==\n"+err);
            }else{
                con.query(sql,function(err,data){
                    if(err){
                        console.log("===m_repair_dic===>get_repair_list==query==\n"+err);
                    }else{
                        callback(data);
                    }
                    con.release();
                });
            }
        });
    }catch(ex){
        console.log("===m_repair_dic===>get_repair_list==\n"+ex);
    }
}