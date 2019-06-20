/**
 * Created by yaofeiliang on 18/4/10.
 */
var mysqlcon=require('./mysqlconnect');
var servcon=require('../config/serviceconfig');
/*sql字符串帮助*/
class SqlToor{
    constructor(tbname){
        var that=this;
        if(tbname){
            that.tb=servcon.element_table[tbname];
            if(!that.tb){
                console.error('表名配置出错')
            }
        }else{
            console.error('表名配置出错')
        }
    };
    /*data:{columns:'',wheres:[{'k=?','v'}],orders[],top}*/
    select(data,callback){
        var that=this;
        var columns
            ,wheres = ' where 1=? '
            ,sql_string
            ,sql_arrvalue=[1];

        if(data.columns){
            columns =data.columns;
        }else{
            columns ='*'
        }
        sql_string ='select '+columns+' from '+that.tb+' ';
        if(data.wheres){
            for(var i=0;i<data.wheres.length;i++){
                var strpd=data.wheres[i].v+'';
                if(strpd.indexOf(',')!=-1){
                    wheres=wheres+' and '+data.wheres[i].k+' in ('+data.wheres[i].v+')';
                }else{
                    wheres=wheres+' and '+data.wheres[i].k;
                    sql_arrvalue.push(data.wheres[i].v)
                }
            }
        }
        sql_string=sql_string+wheres+ ' ';
        if(data.orders){
            for(var i=0;i<data.orders.length;i++){
                if(data.paixu!=1){
                    if(i==0){
                        sql_string=sql_string+' order by '+ data.orders[i]+' desc '
                    }else{
                        sql_string=sql_string+', '+data.orders[i]+' desc '
                    }
                }else{
                    if(i==0){
                        sql_string=sql_string+' order by '+ data.orders[i]+' asc '
                    }else{
                        sql_string=sql_string+', '+data.orders[i]+' asc '
                    }
                }
            }
        }

        if(data.top){
            if(!data.pageIndex) data.pageIndex=1;
            sql_string=sql_string +' limit ?,?';
            sql_arrvalue.push((parseInt(data.pageIndex)-1)*parseInt(data.top))
            sql_arrvalue.push(parseInt(data.top))
        }
        console.dir(sql_string);
        console.dir(sql_arrvalue);
        mysqlcon.queryStringFormat(sql_string,sql_arrvalue,function(err,rows){
            if(err){callback(false)}else{
                if(rows.length){
                    callback(rows)
                }else{
                    callback(false)
                }
            }
        });
    };
    /*data:{columns:'',wheres:[{'k1=?','v1','k2='','v2'}]}*/
    selectOr(data,callback){
        var that=this;
        var sql_string ='select * from '+that.tb+' '
            ,sql_arrvalue=[];
        ;
        if(data.wheres){
            sql_string+=' where '+data.wheres.k;
            for(var i=0;i<data.wheres.v.length;i++){
                sql_arrvalue.push(data.wheres.v[i])
            }
        }
        // console.dir(sql_string);
        // console.dir(sql_arrvalue);
        mysqlcon.queryStringFormat(sql_string,sql_arrvalue,function(err,rows){
            if(err){callback(false)}else{
                if(rows.length){
                    callback(rows)
                }else{
                    callback(false)
                }
            }
        });
    }
    /*data:{columns:'',values[]}*/
    insert(data,callback){
        var that=this;
        var columns
            ,sql_string
        if(data.columns){
            columns =data.columns;
        }else{
            console.error('columns没有指定');
            callback(false);
            return;
        }

        sql_string ='insert into '+that.tb+'('+columns+') values (?';
        if(data.values){
            for(var i=1;i<data.values.length;i++){
                sql_string =sql_string+',?'
            }
        }else{
            console.error('values没有指定');
            callback(false);
            return;
        }
        sql_string=sql_string+')';
        console.dir(sql_string);
        console.dir(data.values);
        mysqlcon.queryStringFormat(sql_string,data.values,function(err,rows){
            if(err){callback(false)}else{
                if(callback)callback(rows.insertId);
            }
        });
    };
    /*data:{sets:[{'k','v'}],wheres:[{'k=?','v'}]}*/
    updata(data,callback){
        //update e_ani set isdel=1 WHERE id  =?
        var that=this;
        var columns
            ,wheres = ' where 1=1 '
            ,sql_string
            ,sql_arrvalue=[];
        sql_string ='update '+that.tb+' set ';
        if(data.sets){
            for(var i=0;i<data.sets.length;i++){
                if(i==0){
                    sql_string=sql_string+data.sets[i].k+'=?';
                }else{
                    sql_string=sql_string+','+data.sets[i].k+'=?';
                }
                sql_arrvalue.push(data.sets[i].v)
            }
        }else{
            console.error('sets没有指定');
            callback(false);
            return;
        }

        if(data.wheres){
            for(var i=0;i<data.wheres.length;i++){
                wheres=wheres+' and '+data.wheres[i].k;
                sql_arrvalue.push(data.wheres[i].v)
            }
        }else{
            console.error('wheres没有指定');
            callback(false);
            return;
        }
        sql_string=sql_string+wheres+ ' ';

        console.dir(sql_string);
        console.dir(sql_arrvalue);
        mysqlcon.queryStringFormat(sql_string,sql_arrvalue,function(err,rows){
            if(err){callback(false)}else{
                if(callback)callback(true);
            }
        });
    };
    selectlike(data,callback){
        var that=this;
        var sql_string ='select * from '+that.tb+' where 1=1'
            ,sql_arrvalue=[];
        if(data.wheres){
            for(var i=0;i<data.wheres.length;i++){
                if(data.wheres[i].k.indexOf('like')==-1){
                    sql_string+=' and '+data.wheres[i].k;
                    sql_arrvalue.push(data.wheres[i].v);
                }else{
                    sql_string+=' and '+data.wheres[i].k+' "%'+data.wheres[i].v+'%" ';
                }
            }
        } 
        console.log(sql_string);
        console.log(sql_arrvalue);
        mysqlcon.queryStringFormat(sql_string,sql_arrvalue,function(err,rows){
            if(err){callback(false)}else{
                if(rows.length){
                    callback(rows)
                }else{
                    callback(false)
                }
            }
        });
    }
}

module.exports={
    SqlToor:SqlToor
}