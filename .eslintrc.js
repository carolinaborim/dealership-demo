module.exports = {
  'extends': 'agco',
  'plugins': [
    'standard',
    'angular'
  ],
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'no-param-reassign': ["error", { "props": false }]
  },
  'globals': {
    'expect': true,
    'angular': true
  }
};
