const config = require('./config.js');
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

app.get('/', (req, res) => {
  return new Promise((resolve) => {
    resolve();
  }).then(() => {
    if (!config.OPENAM_USERNAME ||
        !config.OPENAM_PASSWORD ||
        !config.API_ID ||
        !config.API_SECRET) {
      res.status(500).send(
        'Please configure all required environment variables'
      );
      throw new Error('Please configure all required environment variables');
    }
  }).then(() => {
    const options = {
      method: 'POST',
      uri: config.OPENAM_URL,
      qs: {
        realm: '/dealers',
        username: config.OPENAM_USERNAME,
        password: config.OPENAM_PASSWORD,
        scope: 'cn mail agcoUUID',
        client_id: config.API_ID,
        client_secret: config.API_SECRET,
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
      FUSE_TRACKERS_URL: config.FUSE_TRACKERS_URL,
      FUSE_EM_URL: config.FUSE_EM_URL,
      BEARER_TOKEN: token
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Authentication error');
  });
});

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
  console.log(`http://localhost:${config.PORT}`);
});
