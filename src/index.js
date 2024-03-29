const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Sentry = require('@sentry/node');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models/db');
const redis = require('./models/redis');
const getModels = require('./utility').getModels;
const compression = require('compression');

if (process.env.SENTRY_ENABLED) {
  Sentry.init({
    dsn: 'https://31ebd1ca30bd4d07ae854c1e020c41d0@sentry.maxemiliang.cloud/3',
    release: `weatherdash-api@${process.env.VERSION_NUMBER}`,
    environment: 'production',
  });
}

// Config
// TODO: move to own file.
const models = {};
const routes = {
  default: {
    prefix: '/',
    name: 'default',
  },
  sensor: {
    name: 'sensor',
    prefix: '/sensor',
    models: ['SensorData'],
  },
  sensor_meta: {
    name: 'sensorMeta',
    prefix: '/sensor_meta',
    models: ['SensorMeta'],
  },
};

// App middleware
app.use(Sentry.Handlers.requestHandler()); // Sentry must be the first.
app.use(helmet());
app.use(
    bodyParser.urlencoded({
      extended: false,
    })
);
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(compression());
app.use(require('./middlewares/RateLimiterRedis')(app, redis));
// Model initalization
['SensorData', 'SensorMeta'].map((model) => {
  models[model] = require(`./models/${model}`).init(db);
});

// Routes are added to express here.
Object.keys(routes).forEach((key) => {
  const route = routes[key];
  const Controller = require(`./routes/${route.name}`)(
      express,
    route.models ? getModels(models, route.models) : {}
  );
  app.use(route.prefix, Controller);
});

app.use(require('./middlewares/ErrorHandler'));

// Initialize the express app.
(async () => {
  db.authenticate()
      .then(() => {
        db.sync();
        app.listen(port, () => console.log('WeatherDash-API is now started'));
      })
      .catch((err) => {
        throw err;
      });
})();
