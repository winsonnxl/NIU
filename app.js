var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var work_index=require('./routes/work_index');
var bug=require('./routes/bug');
var device=require('./routes/device');
var test=require('./routes/test');

require('./models/m_sys_list').getSys_List();//读取部门、科室、模块到内存
require('./models/m_device_dic').get_device_info2mem();//读取设备信息到内存
require('./models/m_company_dep_dic').get_company_list();//读取公司及部门列表信息到内存

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var log = require('./lib/log');
log.use(app);//设置LOG

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//session设置
app.use(session({
  secret: '147852369',
  name: 'yjd-niu',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 80000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true,
}));


app.use('/', routes);
app.use('/test',test);
app.use('/users', users);
app.use('/work_index',work_index);
app.use('/bug',bug);
app.use('/device',device);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
