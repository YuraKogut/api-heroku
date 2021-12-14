const express = require('express')
const app = express()
const port = 3000;
const axios = require('axios');
const http = require("http");

const server = http.createServer(app);
server.listen(process.env.PORT || 5000, () =>
  console.log("Server started " + process.env.PORT)
  );

//sum action
app.get('/summa', (req, res) => {
	let a = Number(req.query.a);
	let b = Number(req.query.b);
	let summa = a+b;
  res.send(summa.toString());
})
//mult action
app.get('/mult', (req, res) => {
	let a = Number(req.query.a);
	let b = Number(req.query.b);
	let mult = a*b;
  res.send(mult.toString());
})
//random phrase
app.get('/getPhrase', async(req,res)=>{
	let count = 3;
	if(req.query.count){
		count=req.query.count;
	}
	try{
		let quote = await axios.get('https://goquotes-api.herokuapp.com/api/v1/random?count='+count)
		.then((response)=>{
			return response.data.quotes;
		})
		.catch((error)=>{
			return error;
		})
		res.send(quote)
	}
	catch{
		res.send('error')
	}
})
