var express = require('express');
var router = express.Router();
var m_users=require('../models/m_users');

/* GET users listing. */
router.get('/',function(req, res, next) {
  //var test= require('../models/users');
  res.send("查询结果："+test.show());
});

/*用户登录页*/
router.get('/login',function(req,res){
  res.render('user/login',{data:'0'});
});


/*用户注册页*/
router.get('/reg',function(req,res,next){
  require('../models/m_company_dep_dic').get_company(0,function(data){
    res.render('user/register',{'company':data});
  });

});

/*提交注册信息*/
router.post('/reg_sub',function(req,res,next){
  var u_name=req.body.u_name.replace(/(^\s*)|(\s*$)/g, "");
  var u_pw=req.body.u_pw.replace(/(^\s*)|(\s*$)/g, "");
  var u_pw2=req.body.u_pw2.replace(/(^\s*)|(\s*$)/g, "");
  var r_name=req.body.r_name.replace(/(^\s*)|(\s*$)/g, "");
  var phone=req.body.phone.replace(/(^\s*)|(\s*$)/g, "");
  var work_local=req.body.local;
  var dep=req.body.dep;

  m_users.reg(u_name,u_pw,u_pw2,r_name,phone,work_local,dep,function(data){
    if(data){
      if(data['affectedRows']){
        //console.log("callback="+data.toString());
        //console.log("callback="+data['affectedRows']);
        //res.send("恭喜！欢迎加入N.I.U系统！");
        res.redirect('/users/login');
        //res.render('tips/submit',{'info':""});
      }else{
        res.render('tips/submit',{'info':"注册失败了～5555555。耐心些，重新是一次！或联系程序猿！"});
      }
    }else{
      res.render('tips/submit',{'info':"注册失败了～5555555。耐心些，重新是一次！或联系程序猿！"});
    }
  });
});

/*提交用户登录*/
router.post('/login',function(req,res,next){
  var un=req.body.username;
  var pw=req.body.pw;
  m_users.login(un,pw,function(data){
    if(data){

      req.session.uid=data[0]['id'];
      req.session.rname=data[0]['real_name'];
      req.session.mobile=data[0]['mobile'];
      req.session.local=data[0]['local'];
      req.session.dep=data[0]['dep'];
      req.session.level=data[0]['level'];

     //console.log("session==="+req.session.rname);
      //res.render('user/test-session',data);
      //res.render('index',{data:'黑恶hi额hi额额hi'});
      res.redirect('/work_index');
    }else{
      res.render('user/login',{data:'1'});
      //res.redirect('/test/');
    }
  });

});

/*用户注销*/
router.get('/logout',function(req,res,next){
  req.session.uid='';
  req.session.rname='';
  req.session.mobile='';
  req.session.local='';
  req.session.dep='';
  req.session.level='';
  res.render('user/login',{data:'0'});
});

/*获取用户信息*/
router.post('/getUser',function(req,res,next){
  var user_id=req.body.user_id;
  m_users.getUser(user_id,function(data){
    if(data){
     res.json(data);
    }else{
      res.json(0);
    }
  });
});

/*获取全部用户列表*/
router.get('/getUsersList',function(req,res,next){
  if(req.session.uid==undefined||req.session.uid==''){
    res.render('user/login',{data:'0'});
  }else {
    var session = require('../lib/c_session').get_Session(req);
    m_users.get_users_list(function(data){
      res.render('user/users_list',{'session':session,
        'users':data,'company_info':global.company_info});
    });

  }

});

/*获取分店下属部门信息*/
router.post('/ajax/get_dep',function(req,res,next){
  var id=req.body.id;
  require('../models/m_company_dep_dic').get_company(id,function(data){
    var dep=[];
    var list=data[0].dep.split(",");
    for(i in list){
      dep[i]={'id':list[i],'content':global.company_info[list[i]]};
    }
    res.json(dep);
  });
});

/*检测用户名是否唯一*/
router.post('/ajax/check_user_name',function(req,res,next){
  var user_name=req.body.user_name.replace(/(^\s*)|(\s*$)/g, "");

  m_users.check_user_name(user_name,function(data){
    res.json(data);
  });
});


module.exports = router;
