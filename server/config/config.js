var env = process.env.NODE_ENV || 'development';

if ('development' === env || 'test' === env) {
  var config = require('./config.json');
  console.log(config);
  var envConfig = config[env];
  console.log(envConfig);

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  });
}

if ('production' === env) {
  process.env.MONGODB_URI = 'mongodb://todo:todo@ds129156.mlab.com:29156/todo';
}
