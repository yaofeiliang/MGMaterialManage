
const Users_modules=require('../modules/users');

class Users{
  constructor(data){
        this.json=data;
  };
  save(cb){
    var that=this;
    var selectjson={
      values:[that.json.username,that.json.password,that.json.type,0]
    }
    var users_modules=new Users_modules({});
    users_modules.save(selectjson,function(data){
      cb(data)
    });
  };
  select(cb){
    var that=this;
    var selectjson={};

    if(that.json.id){
      selectjson={
        wheres:[{k:'id=?',v:that.json.id}]
      }
    }
    if(that.json.username){
      selectjson={
        wheres:[{k:'username=?',v:that.json.username},{k:'isdel=?',v:0}]
      }
    }
    var users_modules=new Users_modules({});
    users_modules.select(selectjson,function(data){
      cb(data);
    });
   }
  selectlimt(cb){
    let that = this;
    var selectjson={
      wheres:[{k:'isdel=?',v:0}],
      orders:['id'],
      pageIndex:that.json.page,
      top:that.json.limit
    }
    if(that.json['key[name]']){
      selectjson={
        wheres:[{k:'isdel=?  and username like "%'+that.json['key[name]']+'%" ',v:0}],
        orders:['id'],
        pageIndex:that.json.page,
        top:that.json.limit
      }
    }
    var users_modules=new Users_modules(that.json);
    users_modules.getCounts(selectjson,function(count){
      users_modules.select(selectjson,function(data){
        cb(data, count[0].count);
      });
    });
  }
  login(cb){
    let that = this;
    console.dir(that)
    if (that.json.username&&that.json.password) {
      let _where;
      _where={
        wheres:[{k:'isdel=?  and username = "'+that.json.username+'" and password = "'+that.json.password+'" ',v:0}],
      };
      var users_modules=new Users_modules(that.json);
      users_modules.select(_where,function(data){
        cb(data);
      });
    }else{
      cb(false)
    }
  }
  remove(cb){
    let that = this;
    let conditions ={
      wheres:[{k:'id=?',v:that.json.id}],
      sets:[{k:'isdel',v:1}]
    };
    var users_modules=new Users_modules(that.json);
    users_modules.update(conditions,function(data){
      if(cb) cb(data);
    });
  }
  updata(cb){
    let that = this;
    let conditions ={
      wheres:[{k:'id=?',v:that.json.id}],
      sets:[{k:'password',v:that.json.password},{k:'type',v:that.json.type},{k:'isdel',v:0}]
    };
    var users_modules=new Users_modules(that.json);
    users_modules.update(conditions,function(data){
      if(cb) cb(data);
    });
  }

}
module.exports=Users;