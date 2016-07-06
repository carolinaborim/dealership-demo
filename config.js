module.exports = {
  PORT: process.env.PORT || '8000',
  FUSE_TRACKERS_URL: process.env.FUSE_TRACKERS_URL || 'https://agco-fuse-trackers-sandbox.herokuapp.com',
  FUSE_EQUIPMENT_API_URL: process.env.EQUIPMENT_API_URL || 'https://fuse-equipment-api-sandbox.herokuapp.com',
  DEALER_API_URL: process.env.DEALER_API_URL || 'https://agco-dealer-api-test-2.herokuapp.com',
  OPENAM_USERNAME: process.env.OPENAM_USERNAME,
  OPENAM_PASSWORD: process.env.OPENAM_PASSWORD,
  OPENAM_URL: process.env.OPENAM_URL || 'https://aaat.agcocorp.com/auth/oauth2/access_token',
  API_ID: process.env.API_ID,
  API_SECRET: process.env.API_SECRET
};
