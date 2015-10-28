/**
 * Created by winson on 10/28/15.
 */

//global.company_info:公司分店及部门信息

/*获取注册是所需公司信息列表
* level:0查询分店信息；1查询分店下属部门
* */
var db=require('../database/database');
exports.get_company_list=function(){
        var sql = "select * from company_dep_dic";
        try{
            db.pool.getConnection(function(err,con){
                if(err){
                    console.log("===m_company_dep_dic===>get_company_list===>\n"+err);
                }else{
                    con.query(sql,function(err,data){
                        if(err){
                            console.log("===m_company_dep_dic===>get_company_list==query==>\n"+err);
                        }
                        else{
                        global.company_info=[];
                        for(var i in data){
                            global.company_info[data[i].id]=data[i].content;
                        }
                        }
                        console.log("global.company_info====>"+global.company_info);
                        con.release();
                    });
                }
            });
        }catch(ex){
            console.log("===m_company_dep_dic===>get_company_list===>\n"+ex);
        }
}

/*获取分店列表
* id:0读取全部分店信息，非0读取相关ID数据
* */
exports.get_company=function(id,callback){
    var sql='';
    if(id==0)
    {
        sql = "select * from company_dep_dic where level=0";
    }else{
        sql="select * from company_dep_dic where id="+id;
    }
    try{
        db.pool.getConnection(function(err,con){
            if(err){
                console.log("===m_company_dep_dic===>get_company===>\n"+err);
            }else{
                con.query(sql,function(err,results){
                    if(err){
                        console.log("===m_company_dep_dic===>get_company==query==>\n"+err);
                    }else{
                        var data=[];
                        for(var i in results){
                            data[i]={'id':results[i].id,'content':results[i].content,'dep':results[i].dep};
                        }
                        callback(data);
                    }
                    con.release();

                });
            }
        });
    }catch(ex){
        console.log("===m_company_dep_dic===>get_company===>\n"+ex);
    }
}