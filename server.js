const app = require('./index'); // Adjust the path to where your Express app is defined
const serverless = require('serverless-http');

module.exports = serverless(app);
