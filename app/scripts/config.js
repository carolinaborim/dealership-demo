'use strict';

angular.module('fuseTestApp')
.factory('Config', function () {
  var FUSE_TRACKERS_URL = window.FUSE_TRACKERS_URL;
  var FUSE_EM_URL = window.FUSE_EM_URL;
  var BEARER_TOKEN = window.BEARER_TOKEN;

  return {
    FUSE_TRACKERS_URL: FUSE_TRACKERS_URL,
    FUSE_EM_URL: FUSE_EM_URL,
    BEARER_TOKEN: BEARER_TOKEN
  };
});
