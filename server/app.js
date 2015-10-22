var gs = require('google-spreadsheet');
var creds = require('./config/clientCred.json');

// spreadsheet key is the long id in the sheets URL
// https://docs.google.com/spreadsheets/d/15rCVJz8-XvJEn-cx6BvuUYkEXtsxdeDW57q9LMp5deY/edit#gid=0

var mysheet = new gs('15rCVJz8-XvJEn-cx6BvuUYkEXtsxdeDW57q9LMp5deY');

var t1 = Date.now();

mysheet.useServiceAccountAuth(creds, function(err){
	// Getinfo return info about the sheet and and an array or "worksheet" objects
	mysheet.getInfo(function(err, info){
		console.log(info.title + " is loaded");
		console.log(Date.now()-t1 + "ms");
	})
});