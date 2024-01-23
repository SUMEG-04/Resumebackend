// multerConfig.js
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  projectId: 'portfolio-412110',
  keyFilename: 'mykey.json',
});

const multerConfig = multer({
  storage: multer.memoryStorage(),
});

module.exports = multerConfig;
