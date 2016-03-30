'use strict';

var mu = require('mu2');
var express = require('express');
var request = require('request-promise');
var app = express();

function engine (path, options, callback) {
  try {
    var html = '';
    var stream = mu.compileAndRender(path, options);
    stream.on('data', function(chunk) {
      html += chunk;
    });
    stream.on('end', function() {
      callback(null, html);
    });
  } catch (err) {
    callback(err);
  }
}

app.engine('html', engine);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.use(express.static('app'));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var PORT = process.env.PORT || '8000';
var FUSE_TRACKERS_URL = process.env.FUSE_TRACKERS_URL || 'https://agco-fuse-trackers-sandbox.herokuapp.com';
var FUSE_EM_URL = process.env.FUSE_EM_URL || 'http://fuse-em-api-dev.herokuapp.com';
var OPENAM_USERNAME = process.env.OPENAM_USERNAME;
var OPENAM_PASSWORD = process.env.OPENAM_PASSWORD;
var OPENAM_URL = process.env.OPENAM_URL || 'https://aaat.agcocorp.com/auth/oauth2/access_token';
var API_ID = process.env.API_ID;
var API_SECRET = process.env.API_SECRET;

app.get('/', function(req, res) {
  return new Promise(function(resolve, reject) { resolve(); })
  .then(function() {
    if (!OPENAM_USERNAME || !OPENAM_PASSWORD || !API_ID || !API_SECRET) {
      res.status(500).send(
        'Please configure all required environment variables'
      );
      next();
    }
  })
  .then(function() {
    var options = {
      method: 'POST',
      uri: OPENAM_URL,
      qs: {
        realm: '/dealers',
        username: OPENAM_USERNAME,
        password: OPENAM_PASSWORD,
        scope: 'cn mail agcoUUID',
        client_id: API_ID,
        client_secret: API_SECRET,
        grant_type: 'password'
      }
    };
    return request(options)
    .then(function(response) {
      var parsedBody = JSON.parse(response);
      var token = parsedBody.token_type + ' ' + parsedBody.access_token
      return token;
    });
  })
  .then(function(token) {
    res.render('index', {
      FUSE_TRACKERS_URL: FUSE_TRACKERS_URL,
      FUSE_EM_URL: FUSE_EM_URL,
      BEARER_TOKEN: token
    });
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).send('Authentication error');
  });
});

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT);
  console.log('http://localhost:' + PORT);
});
