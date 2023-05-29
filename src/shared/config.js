const config = require('config');

exports.PORT = config.util.getEnv('PORT') || config.get('app.port');

const URL = config.get('app.url');
const HOSTNAME = config.get('app.hostname');

exports.URL = URL ? URL : `http://${HOSTNAME}:${PORT}`;