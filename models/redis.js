const redis = require('redis');
const host = process.env.REDIS_URL || 'redis';
const client = redis.createClient({
  host: host,
  enable_offline_queue: false
});

client.on('error', err => {
  throw err;
})

module.exports = client;