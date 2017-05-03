'use strict';
var express = require('express');
var bodyParser  = require("body-parser");
var VoiceResponse = require('twilio').twiml.VoiceResponse;
var dig = require('node-dig');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function (req, res) {
  var twiml = new VoiceResponse();
  var blockCalls = false;

  if ('AddOns' in req.body) {
    if (req.body['AddOns']['status'] === 'successful') {
      var results = req.body['AddOns']['results'];
      blockCalls = should_be_blocked_by_marchex(results['marchex_cleancall']) ||
        should_be_blocked_by_nomorobo(results['nomorobo_spamscore']) ||
        should_be_blocked_by_whitepages(results['whitepages_pro_phone_rep']);
    }
  }

  if (blockCalls) {
    twiml.reject();
  } else {
    twiml.say('Welcome to the jungle.');
    twiml.hangup();
  }

  res.writeHead(200, {'Content-Type': 'text/xml'});
  return res.end(twiml.toString());
})

app.listen(3000, function () {
  console.log('Block Spam Calls listening on port 3000!')
})

module.exports = app


var should_be_blocked_by_nomorobo = function(nomorobo) {
  if (!nomorobo || nomorobo['status'] !== 'successful') {
    return false;
  }

  return dig(nomorobo, ['result', 'score']) == 1;
}

var should_be_blocked_by_whitepages = function(whitepages) {
  if (!whitepages || whitepages['status'] !== 'successful') {
    return false;
  }

  var results = dig(whitepages, ['result', 'results']);
  for (var i = 0; i <= results.length; i++) {
    if (results[i] && dig(results[i], ['reputation', 'level']) == 4) {
      return true;
    }
  }
  return false;
}

var should_be_blocked_by_marchex = function(marchex) {
  if (!marchex || marchex['status'] !== 'successful') {
    return false;
  }

  return dig(marchex, ['result', 'result', 'recommendation']) === 'BLOCK';
};
