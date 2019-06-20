
const sqltool=require('../tools/sqltools');

/** cm_pro_action*/
class ICON{
  constructor(data){
    this.id=data.id;
    this.name=data.name;
    this.url=data.url;
    this.description=data.description;
    this.isdel=data.isdel;
    this.action_sql = new sqltool.SqlToor('icon');
    this.columns='name,url,description,isdel'
  }
  save(data,cb){
    var that=this;
    var selectjson={
      columns:that.columns,
      values:data.values
    }
    that.action_sql.insert(selectjson,function(datas){
      if(cb){
        cb(datas);
      }
    })
  }
  update(data,cb){
    var that=this;
    var selectjson={
      wheres:data.wheres ,
      sets:data.sets
    }
    that.action_sql.updata(selectjson,function(data){
      if(cb){
        cb(data);
      }
    });
  }
  getCounts(data,cb){
    var that=this;
    var selectjson={columns:'count(*) as count'
      ,wheres:data.wheres //,wheres:[{k:'_id>?',v:0}]
    }
    that.action_sql.select(selectjson,function(data){
      if(cb){
        cb(data);
      }
    });
  }
  select(data,cb){
    var that=this;
    var selectjson={
      wheres:data.wheres //,wheres:[{k:'_id>?',v:0}]
      ,orders:data.orders
      ,pageIndex:data.pageIndex
      ,top:data.top
    }
    that.action_sql.select(selectjson,function(data){
      if(cb){
        cb(data);
      }
    });
  }
}



module.exports = ICON;

