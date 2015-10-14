/**
 * Created by winson on 10/3/15.
 * MySQL数据库连接池配置
 */
var mysql=require('mysql');
var config=require('./config');

var pool=mysql.createPool(config.mysql_dev);
exports.pool=pool;
