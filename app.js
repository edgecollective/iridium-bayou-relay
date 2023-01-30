//const express = require('express');
import express from 'express';

const app = express();


//var request = require('request');
import request from 'request';
//var bodyParser = require('body-parser');
import bodyParser from 'body-parser';
const port = 4000

const imei = '300234065897350';
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

let s = struct("<6f")
let record = toArrayBuffer(Buffer.from("982f854090673f43bc35bb410028cf4188577d44646ccf41", "hex"));
let results = s.unpack(record)
console.log(results)


app.use(bodyParser.urlencoded({extended: true}));

app.post('/', (req,res) => {
	console.log('yes!');
	console.log(req.body);
	console.log(req.body.imei);
	if (req.body.imei===imei) {
	console.log('match!')
	}

	res.status(200).send('relayed!');
});



app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
})

