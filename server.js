const express = require("express");
const app = express();
const cors = require("cors")

app.use(cors({optionSuccessStatus: 200}));

app.use((req,res,next)=>{
	console.log(
		req.method + " || " +
		req.path + " || " +
		(req.headers.origin || "same-origin")
	);
	next();
})

app.use(express.static(__dirname + "/public/"))
app.get('/',(req,res)=>{
	res.sendFile(__dirname + "/view/index.html")
})
app.get('/api/parse-header',(req,res)=>{
		const headers = req.headers;
	const ret = {
		ipaddress: (headers["x-forwarded-for"] || req.connection.remoteAddress),
		language: headers["accept-language"],
		software: headers["user-agent"]
	}
	
	res.send(ret)
})

let port = 2000
app.listen(port,()=>{console.log("listening to port: " + port);})