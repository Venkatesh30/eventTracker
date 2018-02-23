let express = require('express');
let app = express();

let dbConnection = require("./dbConnection");

app.get("/runTest",function(req,res){
    res.send({success:true});
})

app.get("/runQuery",function(req,res){
	let query = req.query.qryStr || null;
	if(query){
		dbConnection.query(query)
		.then(function(data){
			res.send({
				success:true,
				data
			})
		})
		.catch(function(error){
			res.send({
				success:false,
				msg:error
			})
		})
	}
	else{
		res.send({
			success:false,
			msg:"Empty Query String"
		})
	}
})

var server = app.listen(3010, function () {
	console.log('app listening on port 3010!');  
});