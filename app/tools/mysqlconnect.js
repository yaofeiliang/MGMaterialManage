/**
 * created by zyr on 2018/04/08
 */
var mysql = require('mysql');
var sqlconfig = require('../config/dataconfig').sqlconfig;
//链接池链接
var pool = mysql.createPool(sqlconfig);

function query(k,cbyyy){
    pool.getConnection(function(err,conn){
        if(err){
            console.error('mysqlconnect error:'+err);
            cbyyy(err,null,null);
        }else{
            conn.query(k,function(qerr,vals,fields){
                //释放连接
                //事件驱动回调
                conn.destroy();
                console.dir(qerr);
                cbyyy(qerr,vals,fields);
            })
        }
    })
}

function queryStringFormat(k,value,cb){
    pool.getConnection(function(err,conn){
        if(err){
            console.error('k:'+k);
            console.error('value:'+value);
            console.error('mysqlconnect error:'+err);
            cb(err,null,null);
        }else{
            conn.query(k,value,function(qerr,vals,fields){
                //释放连接
                //事件驱动回调
                conn.destroy();
                if(qerr){
                    console.dir(qerr);
                }
                cb(qerr,vals,fields);
            })
        }
    })
}


module.exports={
  query:query,
  queryStringFormat:queryStringFormat
}
