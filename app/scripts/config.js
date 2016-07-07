angular.module('fuseTestApp')
  .factory('Config', () => {
    const FUSE_TRACKERS_URL = window.FUSE_TRACKERS_URL;
    const FUSE_EQUIPMENT_API_URL = window.FUSE_EQUIPMENT_API_URL;
    const BEARER_TOKEN = window.BEARER_TOKEN;
    const DEALER_API_URL = window.DEALER_API_URL;

    return {
      FUSE_TRACKERS_URL,
      FUSE_EQUIPMENT_API_URL,
      DEALER_API_URL,
      BEARER_TOKEN
    };
  });
