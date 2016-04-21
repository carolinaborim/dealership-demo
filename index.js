const express = require('express');
const handlebars = require('express-handlebars');
const request = require('request-promise');
const app = express();

app.engine('html', handlebars({
  defaultLayout: 'index.html',
  extname: 'html'
}));
app.set('view engine', 'html');
app.use(express.static('app'));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const PORT = process.env.PORT || '8000';
const FUSE_TRACKERS_URL = process.env.FUSE_TRACKERS_URL || 'https://agco-fuse-trackers-sandbox.herokuapp.com';
const FUSE_EM_URL = process.env.FUSE_EM_URL || 'http://fuse-em-api-dev.herokuapp.com';
const OPENAM_USERNAME = process.env.OPENAM_USERNAME;
const OPENAM_PASSWORD = process.env.OPENAM_PASSWORD;
const OPENAM_URL = process.env.OPENAM_URL || 'https://aaat.agcocorp.com/auth/oauth2/access_token';
const API_ID = process.env.API_ID;
const API_SECRET = process.env.API_SECRET;

app.get('/', (req, res) => {
  return new Promise((resolve) => {
    resolve();
  }).then(() => {
    if (!OPENAM_USERNAME || !OPENAM_PASSWORD || !API_ID || !API_SECRET) {
      res.status(500).send(
        'Please configure all required environment variables'
      );
      throw new Error('Please configure all required environment variables');
    }
  }).then(() => {
    const options = {
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
      .then((response) => {
        const parsedBody = JSON.parse(response);
        const token = `${parsedBody.token_type} ${parsedBody.access_token}`;
        return token;
      });
  }).then((token) => {
    res.render('index', {
      FUSE_TRACKERS_URL,
      FUSE_EM_URL,
      BEARER_TOKEN: token
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Authentication error');
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
