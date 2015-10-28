/**
 * Created by winson on 10/24/15.
 * device_dic
 */
var db=require('../database/database');

/*获取edit_device所需要表单信息*/
exports.getDeviceInfo=function(callback){
    var sql="select * from device_dic";
    try{
        db.pool.getConnection(function(err,con){
            if(err){
                console.log("===>m_device===>getDeviceInfo===>"+err);
            }else{
                con.query(sql,function(err,data){
                    if(err){
                        console.log("===>m_device===>getDeviceInfo--query===>"+err);
                    }else{
                        //var results=[];
                        var a= 0,b= 0,c= 0,d= 0,e= 0,f= 0,g= 0;
                        var device_type=[];
                        var device_brand=[];
                        var device_cpu_brand=[];
                        var device_cd=[];
                        var device_os=[];
                        var device_browser=[];
                        var device_defense=[];
                        for(var i=0;i<data.length;i++){
                                //console.log("我是device_dic=="+data[i].content);
                            //加载设备类型
                            if(data[i].type==1){
                                device_type[a]=data[i];
                                a++;
                            }
                            //加载品牌
                            if(data[i].type==2){
                                device_brand[b]=data[i];
                                b++;
                            }
                            //加载处理器品牌
                            if(data[i].type==3 && data[i].level==0){
                                device_cpu_brand[c]=data[i];
                                c++;
                            }
                            //加载光驱
                            if(data[i].type==5){
                                device_cd[d]=data[i];
                                d++;
                            }
                            //加载操作系统
                            if(data[i].type==6){
                                device_os[e]=data[i];
                                e++;
                            }
                            //加载浏览器
                            if(data[i].type==7){
                                device_browser[f]=data[i];
                                f++;
                            }
                            //加载杀毒软件
                            if(data[i].type==9){
                                device_defense[g]=data[i];
                                g++;
                            }

                        }
                        var results={'device_type':device_type,
                        'device_brand':device_brand,
                        'device_cpu_brand':device_cpu_brand,
                        'device_cd':device_cd,
                        'device_os':device_os,
                        'device_browser':device_browser,
                        'device_defense':device_defense};
                        callback(results);
                        con.release();

                        //console.log(results);
                    }
                });
            }
        });


    }catch(ex){
        console.log("===>m_device===>getDeviceInfo===>"+ex);
    }
}


/*获取CPU型号*/
exports.get_cpu_type=function(brand,callback){
    var sql="select id,content from device_dic where level=1 and uplevel="+brand;
    db.pool.getConnection(function(err,con){
        if(err){
            console.log("====>m_device_dic====>get_cpu_type====>"+err);
        }else{
            con.query(sql,function(err,data){
                if(err){
                    console.log("====>m_device_dic====>get_cpu_type---query====>"+err);
                }else{
                    callback(data);
                }
                con.release();
            });
        }
    });
}

/*读取设备信息ID和content到内存，为快速显示相关文字信息*/
exports.get_device_info2mem=function(){
    var sql="select id,content from device_dic";
    db.pool.getConnection(function(err,con){
        if(err){
            console.log("====>m_device_dic====>get_device_info2mem====>"+err);
        }else{
            con.query(sql,function(err,data){
                if(err){
                    console.log("====>m_device_dic====>get_device_info2mem==query==>"+err);
                }else{
                    global.m_device_info=[];
                    for(var i=0;i<data.length;i++){
                        global.m_device_info[data[i].id]=data[i].content;
                    }
                    console.log(global.m_device_info);
                    con.release();
                }
            });
        }
    });
}

/*读取设备总类目*/
exports.get_device_item=function(callback){
    var sql="select id,content from device_dic where type=1 and level=0 and uplevel=0";
    db.pool.getConnection(function(err,con){
        if(err){
            console.log("====>m_device_dic====>get_device_item====>"+err);
        }else{
            con.query(sql,function(err,data){
                if(err){
                    console.log("====>m_device_dic====>get_device_item==query==>\n"+err);
                }else{
                    callback(data);
                }
                con.release();
            });
        }
    });
}

/*读取type：10（设备维护项目）内容*/
exports.get_type10=function(level,callback){
    var sql="select id ,content from device_dic where type=10 and level=1 and uplevel="+level;
    db.pool.getConnection(function(err,con){
        if(err){
            console.log("====>m_device_dic====>get_type10====>"+err);
        }else{
            con.query(sql,function(err,data){
                if(err){
                    console.log("====>m_device_dic====>get_type10==query==>"+err);
                }else{
                    callback(data);
                }
                con.release();
            });
        }
    });
}