var env = process.env.NODE_ENV || 'development';

if ('development' === env || 'test' === env) {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  });
}

if ('production' === env) {
  process.env.MONGODB_URI = 'mongodb://todo:todo@ds129156.mlab.com:29156/todo';
}
