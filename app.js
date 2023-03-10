//const express = require('express');
import express from 'express';

const app = express();


//var request = require('request');
import request from 'request';
//var bodyParser = require('body-parser');
import bodyParser from 'body-parser';
const port = 4000

const imei = '300234065897350';
const pubkey = '2ifhwi34ue4j';
const privkey = 'kqr77cc39hdm';

import struct from './struct.mjs';

app.get('/', (req, res) => {
	  res.send('iridium relay!')
});

function toArrayBuffer(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

//let s = struct("<6f")
//let record = toArrayBuffer(Buffer.from("982f854090673f43bc35bb410028cf4188577d44646ccf41", "hex"));
//let results = s.unpack(record)
//console.log(results)


//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/', (req,res) => {
	console.log('yes!');
	console.log(req.body);
	console.log(req.body.imei);
	if (req.body.imei===imei) {
	console.log('match!')

	var input = req.body.data;
	const output = Buffer.from(input,'hex');
	console.log('as text:',output.toString());

	let s = struct("<2f");
	let record = toArrayBuffer(Buffer.from(input, "hex"));
	let results = s.unpack(record);
	console.log('as packed:',results);
	console.log('batt:',results[0]);
	console.log('depth:',results[1]);

	var post_url = 'http://bayou.pvos.org/data/'+pubkey;
	request.post(post_url,{json:{'private_key':privkey,'distance_meters':results[1],'battery_volts':results[0] }},
		function (error,response,body) {
			if (!error && response.statusCode ==200) {
				console.log(body);
			}
			else {
				console.log(error);
			}
		}
	);	
	

	}

	res.status(200).send('relayed!');
});



app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
})

