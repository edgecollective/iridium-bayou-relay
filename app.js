const express = require('express');
const app = express();
var request = require('request');
var bodyParser = require('body-parser');
const port = 4000

const imei = '300234065897350';

app.get('/', (req, res) => {
	  res.send('iridium relay!')
});

app.use(bodyParser.urlencoded({extended: true}));

app.post('/', (req,res) => {
	console.log('yes!');
	console.log(req.body);
	console.log(req.body.imei);
	res.status(200).send('relayed!');
});



app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
})

