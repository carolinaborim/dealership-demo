const config = require('./config.js');
const express = require('express');
const handlebars = require('express-handlebars');
const requestPromise = require('request-promise');
const app = express();

const ensureConfigurationIsCorrect = (response) => {
  if (!config.OPENAM_USERNAME ||
      !config.OPENAM_PASSWORD ||
      !config.API_ID ||
      !config.API_SECRET) {
    response.status(500).send(
      'Please configure all required environment variables'
    );
    throw new Error('Please configure all required environment variables');
  }
};

const authenticateAsDealer = () => {
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
  return requestPromise(options)
    .then((response) => {
      const parsedBody = JSON.parse(response);
      return `${parsedBody.token_type} ${parsedBody.access_token}`;
    });
};

const renderPage = (token, response) => {
  response.render('index', {
    FUSE_TRACKERS_URL: config.FUSE_TRACKERS_URL,
    FUSE_EM_URL: config.FUSE_EM_URL,
    BEARER_TOKEN: token
  });
};

const handleError = (err, response) => {
  console.log(err);
  response.status(500).send('Authentication error');
};

app.engine('html', handlebars({
  defaultLayout: 'index.html',
  extname: 'html'
}));
app.set('view engine', 'html');
app.use(express.static('app'));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.get('/', (request, response) => {
  return new Promise((resolve) => {
    resolve();
  }).then(() => ensureConfigurationIsCorrect(response))
    .then(authenticateAsDealer)
    .then((token) => renderPage(token, response))
    .catch((err) => handleError(err, response));
});

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
  console.log(`http://localhost:${config.PORT}`);
});
