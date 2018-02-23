var mysql = require('mysql');

var connection = mysql.createPool({
  host: "sql12.freemysqlhosting.net",
  user: "sql12222748",
  password: "jFxp9M8G9N",
  database:"sql12222748"
});

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE TABLE EVENT_TRACKER (ID int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, USER_NAME VARCHAR(50) NOT NULL, PASSWORD VARCHAR(50) NOT NULL);", function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});*/

module.exports = {
	create:function (callback,times) {
		connection.getConnection(function(err, connection) {
			if(err){
				console.log("connection errrrrrrrror",err);
				callback(null);
			}
			else{
				try{
					callback(connection);
				}
				catch(e){
					console.log("exception" + e);
					callback(null);
				}
			}
		});
	},
	runQuery:function(strQuery,callback){
		if(strQuery){
			module.exports.create(function(connection) {
				var err = "not able to conncet";
				if(connection){
					connection.query(strQuery,function(err,rows){
						connection.release();
						try{
							callback(err,rows);
						}
						catch(e){
							var error = "Exception for Query " + strQuery + " : " + e;
							console.log("exception" + e);
							callback(e,[]);
						}
					});
				}
				else{
					var error = "Error Creating Connection for Query " + strQuery + " : " + err;
					callback(err);
				}
				
			});
		}
		else{
			callback("no query");
		}
	},
	query:function(strQuery){
		var promise = new Promise(function(resolve,reject){
			module.exports.runQuery(strQuery,function(err,data){
				if(err){
					reject(err);
				}
				else{
					resolve(data);
				}
			});
		});
		return promise;
	}
}