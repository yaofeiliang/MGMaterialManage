var express = require('express');
var router = express.Router();
var captchapng = require('captchapng');

var Users = require('../app/controller/users');
var Api = require('../app/controller/api');
var Icon = require('../app/controller/icon');

var Classify_material = require('../app/controller/classify_material');

var Splashscreen = require('../app/controller/splashscreen');

function getccap(req,res) {
  var txt = parseInt(Math.random() * 9000 + 1000);
  var p = new captchapng(80, 30, txt);
  p.color(223, 228, 228, 1); // First color: background (red, green, blue, alpha)
  p.color(67, 205, 128, 255); // Second color: paint (red, green, blue, alpha)
  var img = p.getBase64();
  //var imgbase64 = new Buffer(img, 'base64');
  var imgbase64 = Buffer.from(img, 'base64');
  // 处理响应，组合base64图片
  var prefix = "data:" + "image/png" + ";base64,";
  //var base64 = new Buffer(imgbase64, 'binary').toString('base64');
  var base64 = Buffer.from(imgbase64, 'binary').toString('base64');
  console.log('#################################');
  console.dir(req.session)
  req.session.ccap = txt;
  console.dir(req.session)
  console.log('#################################');
  return prefix + base64;
};

/* GET home page. */

router.get('/getccap', function(req, res, next) {
  res.json({ccap:getccap(req,res) })
});
router.get('/', function(req, res, next) {
  if(req.session&&req.session.loginUser){
    res.render('index', {name:req.session.loginUser});
  }else{
    res.render('login');
  }
  //res.render('index', {name:1});
});
router.get('/set', function(req, res) {
  if(req.session.loginUser){
    res.render('index', {name:req.session.loginUser});
  }else{
    res.render('login');
  }
});
router.get('/login', function(req, res, next) {
  req.session.loginUser=undefined;
  res.render('login');
});
router.get('/config_user', function(req, res, next) {
  res.render('config_user');
});
router.get('/config_splashscreen', function(req, res, next) {
  res.render('config_splashscreen');
});
router.get('/config_icon', function(req, res, next) {
  res.render('config_icon');
});
router.get('/config_api_version', function(req, res, next) {
  res.render('config_api_version');
});
router.get('/config_classify_material', function(req, res, next) {
  res.render('Config_classify_material');
});


//=================Splashscreen=========================START
router.post('/splashscreen_select', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let _splashscreen = new Splashscreen(req.body);
  _splashscreen.selectlimt(function(data, count) {
    res.json({code:0,msg:'Splashscreen Data',count: count,data: data});
  });
});
router.post('/splashscreen_save', function(req, res) {
  let _splashscreen = new Splashscreen(req.body);
  _splashscreen.save(function(data) {
    res.json({data: data});
  });
});
router.post('/splashscreen_updata', function(req, res) {
  console.dir(req.body)
  let _splashscreen = new Splashscreen(req.body);
  _splashscreen.updata(function(data) {
    res.json({data: data});
  });
});
router.post('/splashscreen_remove', function(req, res) {
  let _splashscreen = new Splashscreen(req.body);
  _splashscreen.remove(function(data) {
    res.json({data: data});
  });
});
//=================Splashscreen=========================END

//=================Icon=========================START
router.post('/icon_select', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let _icon = new Icon(req.body);
  _icon.selectlimt(function(data, count) {
    res.json({code:0,msg:'Icon Data',count: count,data: data});
  });
});
router.post('/icon_save', function(req, res) {
  let _icon = new Icon(req.body);
  _icon.save(function(data) {
    res.json({data: data});
  });
});
router.post('/icon_updata', function(req, res) {
  console.dir(req.body)
  let _icon = new Icon(req.body);
  _icon.updata(function(data) {
    res.json({data: data});
  });
});
router.post('/icon_remove', function(req, res) {
  let _icon = new Icon(req.body);
  _icon.remove(function(data) {
    res.json({data: data});
  });
});
//=================Icon=========================END

//=================api=========================START
router.post('/api_select', function(req, res) {
  let _api = new Api(req.body);
  _api.selectlimt(function(data, count) {
    res.json({code:0,msg:'API Data',count: count,data: data});
  });
});
router.post('/api_save', function(req, res) {
  let _api = new Api(req.body);
  _api.save(function(data) {
    res.json({data: data});
  });
});
router.post('/api_updata', function(req, res) {
  console.dir(req.body)
  let _api = new Api(req.body);
  _api.updata(function(data) {
    res.json({data: data});
  });
});
router.post('/api_remove', function(req, res) {
  let _api = new Api(req.body);
  _api.remove(function(data) {
    res.json({data: data});
  });
});
//=================api=========================END

//=================classify_material=========================START
router.post('/classify_material_select', function(req, res) {
  console.dir('classify_material_select')
  let _material = new Classify_material(req.body);
  _material.selectlimt(function(data, count) {
    res.json({code:0,msg:'API Data',count: count,data: data});
  });
});
router.post('/classify_material_save', function(req, res) {
  let _material = new Classify_material(req.body);
  _material.save(function(data) {
    res.json({data: data});
  });
});
router.post('/classify_material_updata', function(req, res) {
  console.dir(req.body)
  let _material = new Classify_material(req.body);
  _material.updata(function(data) {
    res.json({data: data});
  });
});
router.post('/classify_material_remove', function(req, res) {
  let _material = new Classify_material(req.body);
  _material.remove(function(data) {
    res.json({data: data});
  });
});
//=================classify_material=========================END

//users==========================================START
router.post('/users_select', function(req, res) {
  let _users = new Users(req.body);
  _users.selectlimt(function(data, count) {
    res.json({code:0,msg:'Users Data',count: count,data: data});
  });

});
router.post('/users_save', function(req, res) {
  let _users = new Users(req.body);
  _users.save(function(data) {
    res.json({data: data});
  });
});
router.post('/users_updata', function(req, res) {
  let _users = new Users(req.body);
  _users.updata(function(data) {
    res.json({data: data});
  });
});
router.post('/users_remove', function(req, res) {
  let _users = new Users(req.body);
  _users.remove(function(data) {
    res.json({data: data});
  });
});
router.post('/login', function(req, res) {

  console.dir(req.body.vercode);
  console.dir(req.session);
  console.dir(req.session.ccap);

  if(req.body.vercode==req.session.ccap){
    console.dir('tttt')
    let _users = new Users(req.body);
    _users.login(function(data) {
      console.dir(data)
      if(data){
        req.session.loginUser = data[0].username;
        res.json({code:0,msg:'Login Successful',data:  data[0]});
        //res.json({ret_code: 0, ret_msg: '登录成功'});
      }else{
        //res.json({ret_code: 1, ret_msg: '账号或密码错误'});
        res.json({code:1,msg:'Account or password error',data:data});
      }

    });
  }else{
    console.dir('ffff')
    res.json({code:1,msg:'Verification code error',data: undefined});
  }

});
//users==========================================END

const formidable = require("formidable");
const fs = require('fs');
const path = require('path');

router.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();
  var temppath = path.resolve(__dirname, '..');
  console.dir(temppath)
  var targetFile = path.join(temppath,'public/images/uploadFile');
  console.dir(targetFile)
  form.uploadDir = targetFile;
  form.parse(req, function(error, fields, files){
    if(error) throw error;
    var fileName = Date.parse(new Date());
    let oldpath=files.file.path;
    let newpath = targetFile + '/' + fileName +files.file.name;
    fs.rename(oldpath, newpath,function(err){
      if(err) throw err;
      res.send( {code:1,'imageURL' : '/images/uploadFile/'+ fileName +files.file.name});
    });
  });
});

module.exports = router;
