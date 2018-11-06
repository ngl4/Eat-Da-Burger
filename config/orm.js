
//Import MySQL
var connection = require("../config/connection.js");

//printQuestionMarks() function
function printQuestionMarks(num) {
    var arr =[];
    num.forEach(function(){
        arr.push("?");
    });
    return arr.toString();
}


//objToSql() function 
function objToSql(ob){
    var arr = [];

    for (key in ob) {
        var val = ob[key] ;

        if(Object.hasOwnProperty.call(ob, key)){
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
              }
              arr.push(key + "=" + val);
        }  
    }

    return arr.toString();
}

//ob = object
//tb = table ; cb = call-back
//cols = columns
//vals = values
var orm = {
    selectAll: function(tbInput, cb) {
        var queryString = "SELECT * FROM " + tbInput + ";";

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err) throw err;

            cb(result);
        });
    },
    insertOne: function(tb, cols, vals, cb) {
        var queryString = "INSERT INTO " + tb;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;

            cb(result);
          });
        },
    
    updateOne: function(tb, objColVals, condition, cb){
        var queryString = "UPDATE" + tb;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result){
            if (err) throw err;

            cb(result);
        });
    }
};




module.exports = orm;
