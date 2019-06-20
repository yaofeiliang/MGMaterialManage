
const Splashscreen_modules=require('../modules/splashscreen');

class Splashscreen{
  constructor(data){
        this.json=data;
  };
  save(cb){
    var that=this;
    var selectjson={
      values:[that.json.name,that.json.url,that.json.description,that.json.ord,0]
    }
    var splashscreen_modules=new Splashscreen_modules({});
    splashscreen_modules.save(selectjson,function(data){
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
    if(that.json.name){
      selectjson={
        wheres:[{k:'name=?',v:that.json.name},{k:'isdel=?',v:0}]
      }
    }
    var splashscreen_modules=new Splashscreen_modules({});
    splashscreen_modules.select(selectjson,function(data){
      cb(data);
    });
   }
  selectlimt(cb){
    let that = this;
    var selectjson={
      wheres:[{k:'isdel=?',v:0}],
      orders:['ord'],
      pageIndex:that.json.page,
      top:that.json.limit
    }
    if(that.json['key[name]']){
      selectjson={
        wheres:[{k:'isdel=?  and name like "%'+that.json['key[name]']+'%" ',v:0}],
        orders:['id'],
        pageIndex:that.json.page,
        top:that.json.limit
      }
    }
    var splashscreen_modules=new Splashscreen_modules(that.json);
    splashscreen_modules.getCounts(selectjson,function(count){
      splashscreen_modules.select(selectjson,function(data){
        cb(data, count[0].count);
      });
    });
  }
  login(cb){
    let that = this;
    if (that.name&&that.url) {
      let _where;
      _where={
        wheres:[{k:'isdel=?  and name = "'+that.json.name+'" and url = "'+that.json.name+'" ',v:0}],
      };
      var splashscreen_modules=new Splashscreen_modules(that.json);
      splashscreen_modules.select(_where,function(data){
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
    var splashscreen_modules=new Splashscreen_modules(that.json);
    splashscreen_modules.update(conditions,function(data){
      if(cb) cb(data);
    });
  }
  updata(cb){
    let that = this;
    let conditions ={
      wheres:[{k:'id=?',v:that.json.id}],
      sets:[{k:'name',v:that.json.name},{k:'url',v:that.json.url},{k:'description',v:that.json.description},{k:'ord',v:that.json.ord},{k:'isdel',v:0}]
    };
    var splashscreen_modules=new Splashscreen_modules(that.json);
    splashscreen_modules.update(conditions,function(data){
      if(cb) cb(data);
    });
  }

}
module.exports=Splashscreen;