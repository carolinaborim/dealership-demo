'use strict';

angular.module('fuseTestApp')
.factory('Config', function () {
  var FUSE_TRACKERS_URL = 'http://localhost:9000';
  var FUSE_EM_URL = 'http://fuse-em-api-dev.herokuapp.com';
  var BEARER_TOKEN = 'Bearer 6c1fec33-7a48-46e7-a565-3dcc39a8c9f4';

  return {
    FUSE_TRACKERS_URL: FUSE_TRACKERS_URL,
    FUSE_EM_URL: FUSE_EM_URL,
    BEARER_TOKEN: BEARER_TOKEN
  };
});
